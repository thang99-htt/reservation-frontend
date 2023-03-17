<script>
  import Header from "@/components/Header.vue";
  export default {
    components: {
      Header,
    }
  };
</script>

<template>
  <div id="app">
    <Header></Header>

    <div class="container-fluid mt-3">
      <router-view />
    </div>
  </div>
</template>

<style>
  .page {
    max-width: 400px;
    margin: auto;
  }
</style>