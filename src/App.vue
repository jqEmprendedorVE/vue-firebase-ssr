<template>
  <div id="app">
    <h1>Area de la APP con Firebase</h1>
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