<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { KeepAlive } from 'vue'
</script>

<template>
  <KeepAlive :exclude="['sign-in', 'sign-up']">
    <RouterView />
  </KeepAlive>
</template>

<style scoped lang="scss"></style>
