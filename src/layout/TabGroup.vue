<template>
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
</template>
<script lang="ts" setup>
import type { Key } from 'ant-design-vue/es/_util/type'
import { computed, onMounted, ref, watch } from 'vue'
import { useTabStore } from '@/stores/tab'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useTabs } from '@/hooks/tabs'
import { watchEffect } from 'vue'
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
</script>

<style scoped lang="scss">
.pane-title {
  // 禁止框选
  user-select: none;
  -webkit-user-select: none;
  pointer-events: none;
}
</style>
