<template>
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
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref, watchEffect } from 'vue'

import type { ItemType } from 'ant-design-vue'

import SiderMenuItem from './SiderMenuItem.vue'
import { useMenuDataFromRoute, type MenuItemProps } from '../useMenu'
import { useRoute } from 'vue-router'
import router from '@/router'
import type { SelectInfo } from 'ant-design-vue/es/menu/src/interface'

// 解构 useMenuDataFromRoute 的返回值
const { menuData, getOpenKeysFromPath } = useMenuDataFromRoute<ItemType>()
const selectedKeys = ref<string[]>([])
const openKeys = ref<string[]>([])
const collapsed = ref<boolean>(false)

// 获取当前路由对象
const route = useRoute()

// 刷新浏览器场景时, 侧边栏要展开
onMounted(() => {
  openKeys.value = getOpenKeysFromPath(route.path)
  selectedKeys.value = [route.path]
})

const handleSelect = ({ key }: SelectInfo) => {
  // 路由跳转
  router.push(key as string)
}
</script>

<style scoped>
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
