<template>
  <div>
    <!-- 一级菜单 -->
    <template v-if="onlyFirstMenu">
      <a-menu-item :key="props.menuItem?.key">
        <component :is="props.menuItem?.icon" />
        <span>{{ props.menuItem?.label }}</span>
      </a-menu-item>
    </template>

    <template v-else>
      <!-- 有子菜单 -->
      <a-sub-menu :key="props.menuItem?.key">
        <template #title>
          <component :is="props.menuItem?.icon" />
          <span>{{ props.menuItem?.label }}</span>
        </template>
        <template v-for="child in props.menuItem?.children">
          <!-- 递归 -->
          <SiderMenu
            v-if="child.children && child.children.length > 0"
            :menuItem="child"
            :key="child.key"
          />

          <template v-else>
            <a-menu-item :key="child?.key">
              <component :is="child?.icon" />
              <span>{{ child?.label }}</span>
            </a-menu-item>
          </template>
        </template>
      </a-sub-menu>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { ItemType } from 'ant-design-vue'
import { computed, type Component } from 'vue'
interface MenuItemProps {
  key: string
  icon: Component
  label: string
  children?: MenuItemProps[]
}
interface Iprops {
  menuItem?: MenuItemProps
}
const props = withDefaults(defineProps<Iprops>(), {})

const onlyFirstMenu = computed(
  () => !props.menuItem?.children || props.menuItem?.children.length === 0,
)
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
