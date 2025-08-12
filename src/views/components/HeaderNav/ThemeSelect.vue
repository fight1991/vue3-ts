<template>
  <div class="component-name"></div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useTabs } from '@/hooks/tabs'

interface Iprops {}
const tabs = useTabs()

const props = withDefaults(defineProps<Iprops>(), {})

const emit = defineEmits<{}>()

const state = reactive({})

onMounted(() => {})
</script>

<style scoped lang="scss"></style>
