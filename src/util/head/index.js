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
    const { head } = this.$options
    if(head){
      const { title } = head 
      if(title)
        document.title = `${getString(this, title)} :: Vue SSR`
    }
  }
}

export default process.env.VUE_ENV === 'server'
  ? serverHeadMixin
  : clientHeadMixin
