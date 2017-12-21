function getMetaDescription (vm) {
  const { description } = vm.$options
  if (description) {
    return typeof description === 'function'
      ? description.call(vm)
      : description
  }
}

const serverMetaMixin = {
  created () {
    const description = getMetaDescription(this)
    if (description) 
      this.$ssrContext.meta.description = description
  }
}

const clientMetaMixin = {
  mounted () {
    const description = getMetaDescription(this)
    if (description) 
      document.head.querySelector('meta[name=description]').content = description
  }
}

export default process.env.VUE_ENV === 'server'
  ? serverMetaMixin
  : clientMetaMixin
