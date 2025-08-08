<template>
  <a-layout style="height: 100vh">
    <a-layout-sider class="custom-sider" v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <div class="menu-box">
        <div class="menu-scroll">
          <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
            <a-menu-item v-for="item in menuList" :key="item.key">
              <component :is="item.icon" />
              <span>{{ item.label }}</span>
            </a-menu-item>
          </a-menu>
        </div>
      </div>
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
import { ref } from 'vue'
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue'
import TabGroup from './TabGroup.vue'
const selectedKeys = ref<string[]>(['1'])
const collapsed = ref<boolean>(false)
const menuList = ref([
  {
    key: '1',
    icon: UserOutlined,
    label: 'nav 1',
  },
  {
    key: '2',
    icon: VideoCameraOutlined,
    label: 'nav 2',
  },
  {
    key: '3',
    icon: UploadOutlined,
    label: 'nav 3',
  },
  {
    key: '4',
    icon: UserOutlined,
    label: 'nav 4',
  },
  {
    key: '5',
    icon: VideoCameraOutlined,
    label: 'nav 5',
  },
  {
    key: '6',
    icon: UploadOutlined,
    label: 'nav 6',
  },
  {
    key: '7',
    icon: UserOutlined,
    label: 'nav 7',
  },
  {
    key: '8',
    icon: VideoCameraOutlined,
    label: 'nav 8',
  },
  {
    key: '9',
    icon: UploadOutlined,
    label: 'nav 9',
  },
])
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
}
.content-outer {
  flex: 1;
  overflow: hidden;
  background-color: #f5f5f5;
  .content-inner {
    height: 100%;
    overflow: auto;
  }
}

::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
}
</style>
