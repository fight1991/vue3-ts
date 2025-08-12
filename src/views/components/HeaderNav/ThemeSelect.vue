<template>
  <div class="component-name">
    <a-dropdown trigger="click">
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item key="1">
            <UserOutlined />
            1st menu item
          </a-menu-item>
          <a-menu-item key="2">
            <UserOutlined />
            2nd menu item
          </a-menu-item>
          <a-menu-item key="3">
            <UserOutlined />
            3rd item
          </a-menu-item>
        </a-menu>
      </template>
      <a-button>
        切换主题
        <DownOutlined />
      </a-button>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useTabs } from '@/hooks/tabs'

interface Iprops {}
const tabs = useTabs()

const props = withDefaults(defineProps<Iprops>(), {})

const emit = defineEmits<{}>()

const state = reactive({})
const handleMenuClick = () => {}
onMounted(() => {})
</script>

<style scoped lang="scss"></style>
