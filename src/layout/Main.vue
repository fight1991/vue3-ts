<template>
  <a-layout style="height: 100vh">
    <a-layout-sider class="custom-sider" v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <SiderMenu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <TabGroup />
      <div class="content-outer">
        <div class="content-inner">
          <a-layout-content
            :style="{
              margin: '12px 10px',
              padding: '10px',
              background: '#fff',
              minHeight: 'calc(100vh - 64px - 24px - 20px)',
            }"
          >
            Content
            <div style="height: 900px"></div>
          </a-layout-content>
        </div>
      </div>
    </a-layout>
  </a-layout>
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
import TabGroup from './TabGroup.vue'
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
</style>
