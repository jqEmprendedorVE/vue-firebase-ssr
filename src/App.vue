<template>
  <div id="app">
    <h2>Area de la APP en Firebase <small style="font-size:0.55em">ver más en <a href="https://github.com/jqEmprendedorVE/vue-firebase-ssr" target="_blank" >GitHub</a> 06.12.2018</small></h2>
    <hr>
    <router-link to='/'>Home</router-link>
    &nbsp;
    <router-link to='/about'>About</router-link>
    <router-view></router-view>
  </div>
</template>
<style type="text/css" media="screen">
  @import url('https://fonts.googleapis.com/css?family=Open+Sans');
  body {
    font-family: "Open Sans", sans-serif;
    font-size: small;
  }
</style>