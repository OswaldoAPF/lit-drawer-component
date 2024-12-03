<template>
  <section>
    <h1 v-if="option">Bienvendido a <span>{{ option }}</span></h1>
  </section>
</template>

<script>
export default {
  computed: {
    option() {
      return this.$route.params.option.charAt(0).toUpperCase() + this.$route.params.option.slice(1);
    }
  }
};
</script>

<style scoped>
  section {
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
  }

  h1 {
    font-size: 3rem;
    color: var(--font-color);
  }

  h1 span {
    background: var(--hover-background-color);
    background: linear-gradient(0deg, var(--hover-background-color) 7%, var(--primary-color) 31%, var(--hover-primary-color) 63%);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
  }
</style>