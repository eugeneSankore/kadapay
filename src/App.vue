<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {

  },
  data() {
    return {}
  },
  computed: {

  },
  created() {

    this.$store.commit('SET_DEVICE_ID',  JSON.stringify(this.$device.client.name + this.$device.client.version))
    this.$store.commit('SET_DEVICE_NAME', JSON.stringify(this.$device.client.name))
    this.$store.commit('SET_DEVICE_OS',  JSON.stringify(this.$device.client.name + this.$device.client.version))
    this.$store.commit('SET_DEVICE_OS_VERSION', JSON.stringify(this.$device.machine.os_name))

  },
}
</script>
<style>
#app {
  font-family: "SF Pro Text";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


body{
  margin: 0;
  /*font-family: "SF Pro Text";*/
  /*font-size: 14px;*/
  /*font-weight: 400;*/
}


</style>
