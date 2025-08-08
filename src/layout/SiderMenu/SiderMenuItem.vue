<template>
  <div>
    <!-- 一级菜单 -->
    <template v-if="onlyFirstMenu">
      <a-menu-item :key="props.menuItem?.key">
        <component :is="props.menuItem?.icon ?? UserOutlined" />
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
import { computed } from 'vue'
import type { MenuItemProps } from '../useMenu'
import { UserOutlined } from '@ant-design/icons-vue'
interface Iprops {
  menuItem?: MenuItemProps
}
const props = withDefaults(defineProps<Iprops>(), {})

const onlyFirstMenu = computed(
  () => !props.menuItem?.children || props.menuItem?.children.length === 0,
)
</script>
<style scoped></style>
