<template>
  <a-layout-header style="background: #fff; padding: 0">
    <MenuUnfoldOutlined v-if="collapsed" class="trigger" @click="toggleCollapsed" />
    <MenuFoldOutlined v-else class="trigger" @click="toggleCollapsed" />
  </a-layout-header>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'

const collapsed = ref<boolean>(false)

const emit = defineEmits<{
  (e: 'update:collapsedStatus', value: boolean): void
}>()
const toggleCollapsed = () => {
  collapsed.value = !collapsed.value
  emit('update:collapsedStatus', collapsed.value)
}
</script>
<style scoped lang="scss">
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}
</style>
