<template>
  <div class="home">
    <h3>Sección del Home {{ data }}</h3>
    <p>Area de trabajo inicial</p>
    <pre>{{ item }}</pre>
  </div>
</template>
<script>
  export default {
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
        console.log(snapshot.val())
      })
    }
  }
</script>