<template>
  <div class="menu-box">
    <div class="menu-scroll">
      <a-menu :items="menuData" v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <SiderMenuItem v-for="item in menuData" :key="'menu' + item?.key" />
      </a-menu>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'

import type { ItemType } from 'ant-design-vue'

import SiderMenuItem from './SiderMenuItem.vue'
import { useMenuDataFromRoute } from '../useMenu'
const menuData = useMenuDataFromRoute<ItemType[]>()
const selectedKeys = ref<string[]>(['1'])
const collapsed = ref<boolean>(false)

onMounted(() => {})
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
