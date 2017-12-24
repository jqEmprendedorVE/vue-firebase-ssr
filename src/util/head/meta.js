const getString = (vm, content) => {
  return typeof content === 'function'
          ? content.call(vm)
          : content
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

export const getMeta = (vm, head, env) => {
  const { meta } = head
  if (meta) {
    if(typeof meta !== 'object')
      return
    if(env){
      return Object.values(meta)
      .map(value=>Object.entries(value).map(value=>`${value[0]}="${getString(vm, value[1])}"`).join(' '))
      .map(value=>`<meta ${value} >`)
      .join(" ")
    } else {
      return meta
    }
  }
}

export const setMeta = (server, meta, vm) => {
  if(server){
    vm.$ssrContext.meta = meta
  }else{
    for(const nm in meta) {
      const name = Object.entries(meta[nm])[0]
      const attr = Object.entries(meta[nm]).splice(1,Object.entries(meta[nm]).length)
      createMeta(vm, name, attr)
    }
  }
}