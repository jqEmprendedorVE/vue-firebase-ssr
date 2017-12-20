<template>
  <div class="home">
    <h3>Sección del Home {{ data }}</h3>
    <p>Area de trabajo inicial</p>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        data: ':: SSR'
      }
    }
  }
</script>