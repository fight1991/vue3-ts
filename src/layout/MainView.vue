<template>
  <a-layout style="height: 100vh">
    <!-- 侧边栏 -->
    <SiderMenu :collapsed="collapsed" />

    <a-layout>
      <!-- 头部 -->
      <HeaderNav v-model:collapsedStatus="collapsed" />
      <!-- 页签组 -->
      <TabGroup />
      <!-- 主内容区域 -->
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
            <TabView />
          </a-layout-content>
        </div>
      </div>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import TabGroup from './TabGroup.vue'
import SiderMenu from './SiderMenu.vue'
import TabView from './TabView.vue'
import HeaderNav from './HeaderNav.vue'
const collapsed = ref<boolean>(false)
onMounted(() => {})
</script>

<style scoped>
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
