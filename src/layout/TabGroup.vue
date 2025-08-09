<template>
  <a-tabs
    @change="tabChange"
    v-model:activeKey="tabStore.activeTab"
    type="editable-card"
    @edit="onEdit"
  >
    <a-tab-pane v-for="(pane, index) in tabList" :key="pane.name" :closable="index > 0">
      <template #tab
        ><span class="pane-title"> {{ pane.title }}解决 </span></template
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
const tabs = useTabs()
const route = useRoute()
const tabStore = useTabStore()
const tabList = computed(() => tabStore.tabList)
const activeKey = ref<string>()
// onMounted(() => {
//   activeKey.value = tabStore.activeTab
// })
// 监听路由
watch(
  () => route.path,
  (newVal) => {
    const activeTab = tabStore.activeTab
    if (newVal !== activeTab) {
      tabStore.setActiveTab(newVal)
    }
  },
  { immediate: true },
)

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
