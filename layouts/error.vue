<template>
  <div class="page-not-found">
    <div class="inner">
      <h1>404</h1>
      <h2>Page not found</h2>
      <button type="button" @click.prevent="onClickGoHome">Go Home</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorLayout',
  methods: {
    onClickGoHome () {
      this.$router.replace({ path: '/' })
    },
  },
}
</script>

<style scoped lang="scss">
  .page-not-found {
    position: relative;
    height: 100vh;
    background-color: #fff;
    text-align: center;
    color: #333;

    .inner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      > h1 {
        font-size: 10vw;
        line-height: 10vw;
        margin-bottom: 10px;
      }
      > h2 {
        font-size: 2vw;
      }
      > button {
        margin-top: 40px;
        padding: 10px 20px;
        border: 0;
        font-size: 1vw;
      }
    }
  }
</style>
