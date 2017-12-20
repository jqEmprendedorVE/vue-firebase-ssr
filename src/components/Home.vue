<template>
  <div class="home">
    <h3>Sección del Home {{ data }}</h3>
    <p>Area de trabajo inicial</p>
    <pre>{{ item }}</pre>
  </div>
</template>
<script>
  export default {
    asyncData ({ store, route }) {
      // return the Promise from the action
      return store.dispatch('fetchItem', 15696759)
    },
    computed: {
      // display the item from store state.
      item () {
        return this.$store.state.items[15696759]
      }
    },
    data() {
      return {
        data: ':: SSR'
      }
    }
  }
</script>