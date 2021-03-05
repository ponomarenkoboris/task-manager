<template>
  <div id="emptylayout">
    <div id="nav">
      <router-link to="/welcomToAppTS/signin">SignIn</router-link> |
      <router-link to="/welcomToAppTS/signup">SignUp</router-link> 
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'EmptyLayout'
}
</script>

<style lang="scss" scoped>
#app {
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  display: flex;
  justify-content: center;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
#emptylayout {
  height: 100%;
}
</style>