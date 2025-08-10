<template>
  <a-layout-sider class="custom-sider" :collapsed="props.collapsed" :trigger="null" collapsible>
    <div class="logo" />
    <div class="menu-box">
      <div class="menu-scroll">
        <a-menu
          v-model:selectedKeys="selectedKeys"
          v-model:openKeys="openKeys"
          :items="menuData"
          theme="dark"
          mode="inline"
          @select="handleSelect"
        >
          <!-- <SiderMenuItem v-for="item in menuData" :key="item?.key" :menuItem="item" /> -->
        </a-menu>
      </div>
    </div>
  </a-layout-sider>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref, shallowRef, watchEffect } from 'vue'

import type { ItemType } from 'ant-design-vue'

import { useMenuDataFromRoute, type MenuItemProps } from '../useMenu'
import { useRoute } from 'vue-router'
import type { SelectInfo } from 'ant-design-vue/es/menu/src/interface'
import { useTabs } from '@/hooks/tabs'
const props = defineProps<{
  collapsed?: boolean
}>()
// 解构 useMenuDataFromRoute 的返回值
const { menuData, getOpenKeysFromPath } = useMenuDataFromRoute<ItemType>()
const selectedKeys = ref<string[]>([])
const openKeys = ref<string[]>([])

// 获取当前路由对象
const route = useRoute()
const tab = useTabs()

// 刷新浏览器场景时, 侧边栏要展开
onMounted(() => {
  openKeys.value = getOpenKeysFromPath(route.name as string)
})

watchEffect(() => {
  selectedKeys.value = [route.name as string]
})

const handleSelect = ({ key }: SelectInfo) => {
  console.log('handleSelect', key)
  tab.push({ name: key as string })
}
</script>

<style scoped lang="scss">
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
:deep(.ant-layout-sider-children) {
  display: flex;
  flex-direction: column;
}

.custom-sider {
  display: flex;
  flex-direction: column;
  .ant-menu {
    overflow: auto;
  }
}
.menu-box {
  flex: 1;
  overflow: hidden;
  .menu-scroll {
    height: 100%;
    overflow: auto;
  }
}

.ant-menu {
  overflow: auto;
}
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
}
</style>
