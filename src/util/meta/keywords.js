function getMetaKeywords (vm) {
  const { keywords } = vm.$options
  if (keywords) {
    return typeof keywords === 'function'
      ? keywords.call(vm)
      : keywords
  }
}

const serverMetaKeywordsMixin = {
  created () {
    const keywords = getMetaKeywords(this)
    if (keywords) 
      this.$ssrContext.meta.keywords = keywords
  }
}

const clientMetaKeyboardsMixin = {
  mounted () {
    const keywords = getMetaKeywords(this)
    if (keywords) 
      document.head.querySelector('meta[name=keywords]').content = keywords
  }
}

export default process.env.VUE_ENV === 'server'
  ? serverMetaKeywordsMixin
  : clientMetaKeyboardsMixin
