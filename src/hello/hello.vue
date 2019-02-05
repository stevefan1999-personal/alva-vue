<template lang="pug">
  h1 hello {{ name }}
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'nuxt-property-decorator'

  @Component({  })
  export default class Hello extends Vue {
    @Prop({ default: 'hello' }) name?: string
  }
</script>

<style scoped>

</style>
