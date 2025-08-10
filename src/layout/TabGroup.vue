<template>
  <div class="tab-box">
    <div class="tab-main">
      <div class="tab-left">
        <a-tabs
          @change="tabChange"
          v-model:activeKey="activeKey"
          type="editable-card"
          hide-add
          @edit="onEdit"
        >
          <a-tab-pane v-for="(pane, index) in tabList" :key="pane.name" :closable="index > 0">
            <template #tab
              ><span class="pane-title"> {{ pane.title }}</span></template
            >
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <div class="tab-right">
      <a-dropdown :trigger="['click']" placement="bottomRight">
        <a-button type="text" class="tab-dropdown-btn">
          <template #icon>
            <SettingOutlined />
          </template>
        </a-button>
        <template #overlay>
          <a-menu @click="handleMenuClick">
            <a-menu-item key="closeAll" :disabled="tabList.length <= 1">
              <template #icon>
                <CloseOutlined />
              </template>
              关闭所有
            </a-menu-item>
            <a-menu-item key="closeOthers" :disabled="tabList.length <= 1">
              <template #icon>
                <CloseCircleOutlined />
              </template>
              关闭其它
            </a-menu-item>
            <a-menu-divider />
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Key } from 'ant-design-vue/es/_util/type'
import { computed, onMounted, ref, watch } from 'vue'
import { useTabStore } from '@/stores/tab'
import { useRoute } from 'vue-router'
import { useTabs } from '@/hooks/tabs'
import { watchEffect } from 'vue'
import router from '@/router'
import type { TabItemProps } from '@/types'
const tabs = useTabs()
const route = useRoute()
const tabStore = useTabStore()
const tabList = computed(() => tabStore.tabList)
const activeTab = computed(() => tabStore.activeTab)
const activeKey = ref<string>()
onMounted(() => {
  activeKey.value = activeTab.value
})
watchEffect(() => {
  if (activeTab.value !== activeKey.value) {
    activeKey.value = activeTab.value
  }
})
// 监听路由
// watch(
//   () => route.name,
//   (newVal) => {
//     if (newVal !== activeTab.value) {
//       activeKey.value = newVal as string
//       tabStore.setActiveTab(newVal as string)
//     }
//   },
// )

const tabChange = (key: Key) => {
  console.log('tabChange', key)
  const { name, query, params } = tabList.value.find((v) => v.name === String(key)) as TabItemProps
  if (name === route.name) return
  tabStore.setActiveTab(key as string)
  router.push({
    name,
    query,
    params,
  })
}

const onEdit = (e: Key | MouseEvent | KeyboardEvent, action: 'add' | 'remove') => {
  if (action === 'remove') {
    const name = e as string
    if (e === activeKey.value) {
      tabs.closeActiveTab()
    } else {
      tabs.closeInActiveTab(name)
    }
  }
}

const handleMenuClick = (info: { key: Key }) => {
  const key = String(info.key)
  switch (key) {
    case 'closeAll':
      tabs.closeAllTab()
      break
    case 'closeOthers':
      tabs.closeOtherTab()
      break

    default:
      break
  }
}
</script>

<style scoped lang="scss">
.tab-box {
  display: flex;
  .tab-main {
    flex: 1;
    overflow: hidden;
    .tab-left {
      width: 100%;
      :deep(.ant-tabs-nav) {
        margin-bottom: 0;
      }
    }
    .tab-right {
    }
  }
}
.pane-title {
  // 禁止框选
  user-select: none;
  -webkit-user-select: none;
  pointer-events: none;
}
</style>
