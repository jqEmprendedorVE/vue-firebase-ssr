const cleanMetas = () => {
  return new Promise ((resolve, reject)=>{
    const items = document.head.querySelectorAll('meta')
    for(const i in items) {
      if(typeof items[i]==='object' && ['viewport'].findIndex(val=>val===items[i].name)!=0 && items[i].name!=='')
        document.head.removeChild(items[i])
    }
    resolve()
  })
}

const createMeta = (vm, name, ...attr) => {
  const meta = document.createElement('meta')
  meta.setAttribute(name[0], name[1])
  for(const i in attr){
    const at = attr[i]
    for(const k in at) {
      meta.setAttribute(at[k][0], getString(vm, at[k][1]))
    }
  }
  document.head.appendChild(meta);
}

const getString = (vm, content) => {
  return typeof content === 'function'
    ? content.call(vm)
    : content
}

export const getMeta = (vm, meta, env) => {
  if(typeof meta !== 'object')
    return

  if(env){
    return Object.keys(meta)
    .map(value => {
      return Object.keys(meta[value])
        .map(key => `${key}="${getString(vm, meta[value][key])}"`)
        .join(" ");
    })
    .map(value => `  <meta ${value} >`)
    .join("\n");

  } else {
    return meta
  }
}

const serverHeadMixin = {
  created () {
    const { head } = this.$options
    if(head){
      const { title } = head 
      if(title){
        this.$ssrContext.title = `${getString(this, title)} :: Vue SSR`
      }

      const { meta } = head 
      if(meta)
        this.$ssrContext.meta = `\n${getMeta(this, meta, true)}`
    }
  }
}

const clientHeadMixin = {
  mounted () {
    const vm = this

    const { head } = this.$options
    if(head){
      const { title } = head 
      if(title){
        document.title = `${getString(this, title)} :: Vue SSR`
      }

      cleanMetas().then(()=>{
        const { meta } = head 
        if(meta){
          for(const nm in meta) {
            const name = Object.entries(meta[nm])[0]
            const attr = Object.entries(meta[nm]).splice(1,Object.entries(meta[nm]).length)
            createMeta(vm, name, attr)
          }
        }
      })
    }
  }
}

export default process.env.VUE_ENV === 'server'
  ? serverHeadMixin
  : clientHeadMixin
