<template>
  <div class="theme-select">
    <a-dropdown trigger="click">
      <template #overlay>
        <a-menu @click="handleMenuClick" :selected-keys="[currentThemePrimaryColor]">
          <a-menu-item
            v-for="theme in themeStore.themeOptionsList"
            :key="theme.primaryColor"
            class="theme-menu-item"
          >
            <div class="theme-option">
              <div class="item-color" :style="{ backgroundColor: theme.primaryColor }"></div>
            </div>
          </a-menu-item>
        </a-menu>
      </template>
      <a-button class="theme-button">
        <div class="button-content">
          <div
            class="current-color-indicator"
            :style="{ backgroundColor: currentThemePrimaryColor }"
          ></div>
          <span :style="{ color: currentThemePrimaryColor }">主题</span>
          <DownOutlined :style="{ color: currentThemePrimaryColor }" />
        </div>
      </a-button>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, useAttrs } from 'vue'
import { CheckOutlined, DownOutlined } from '@ant-design/icons-vue'
import { useThemeStore } from '@/stores/theme'

interface Iprops {}

const props = withDefaults(defineProps<Iprops>(), {})
const themeStore = useThemeStore()

const currentThemePrimaryColor = computed(() => themeStore.themeToken.colorPrimary)
onMounted(() => {
  const localThemeToken = localStorage.getItem('localThemeToken')
  if (localThemeToken) {
    themeStore.setThemeColor(localThemeToken)
  }
})
// 处理主题切换
const handleMenuClick = (info: { key: string | number }) => {
  const key = String(info.key)
  themeStore.setThemeColor(key)
  localStorage.setItem('localThemeToken', key)
}

onMounted(() => {})
</script>

<style scoped lang="scss">
.theme-select {
  .theme-button {
    border: 1px solid var(--ant-border-color-base);
    border-radius: 6px;
    padding: 0;
    height: auto;

    .button-content {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;

      .current-color-indicator {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 2px solid #fff;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
      }

      span {
        font-size: 14px;
        color: var(--ant-text-color);
      }
    }

    &:hover {
      border-color: var(--ant-primary-color);
      .button-content span {
        color: var(--ant-primary-color);
      }
    }
  }
}
.theme-option {
  display: flex;
  align-items: center;
  justify-content: center;
  .item-color {
    height: 20px;
    width: 60px;
  }
}
</style>
