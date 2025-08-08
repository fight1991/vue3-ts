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
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue'

import type { ItemType } from 'ant-design-vue'
import mainRoutesPaths from '@/router/entry'
const selectedKeys = ref<string[]>(['1'])
const collapsed = ref<boolean>(false)
const menuData = reactive<ItemType[]>([])
onMounted(() => {})
</script>

<script lang="ts">
export default {
  name: 'MainLayout',
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
</style>
