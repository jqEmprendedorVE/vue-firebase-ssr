<template>
  <div class="home">
    <h3>Sección del Home {{ data }}</h3>
    <p>Area de trabajo inicial</p>
    <pre>{{ item }}</pre>
  </div>
</template>
<script>
  export default {
    head: {
      title() {return `${this.name}  con `} ,
      meta: [
        {name: 'description', content() { return `El perfil de ${this.name}`} },
        {name: 'keywords', content() { return `${this.name} ${this.lastname} ${this.email}` } },
        { name:"twitter:card", content:"summary"},
        { name:"twitter:site", content:"@jqEmprendedorVE"},
        { name:"twitter:creator", content:"@jqEmprendedorVE"},
        { name:"twitter:url", content:"https://vue-firebase-ssr.firebaseapp.com"},
        { name:"twitter:title", content() {return `${this.name} creando Vuejs SSR + Firebase`}},
        { name:"twitter:description", content:"Modelo de Vuejs SSR con Firebase Cloud Function + Hosting"},
        { name:"twitter:image", content:"https://www.filepicker.io/api/file/nS7a8itSTcaAsyct6rVp"}
      ]
    },
    title: 'Home',
    description() {
      return `El perfil de ${this.name}`
    },
    keywords() {
      return `${this.name} ${this.lastname} ${this.email}`
    },
    asyncData ({ store, route }) {
      // return the Promise from the action
      return store.dispatch('fetchItem', 1)
    },
    computed: {
      // display the item from store state.
      item () {
        return this.$store.state.items[1]
      },
      name () {
        return this.$store.state.items[1].nombre
      },
      lastname () {
        return this.$store.state.items[1].apellido
      },
      email () {
        return this.$store.state.items[1].correo
      }
    },
    data() {
      return {
        data: ':: SSR'
      }
    },
    created() {
      this.$firebase.db().ref('data').once('value', snapshot=>{
        // console.log(snapshot.val())
      })
    }
  }
</script>