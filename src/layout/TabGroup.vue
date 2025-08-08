<template>
  <a-tabs v-model:activeKey="activeKey" type="editable-card" @edit="onEdit">
    <a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title" :closable="pane.closable">
      {{ pane.content }}
    </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup>
import type { Key } from 'ant-design-vue/es/_util/type'
import { ref } from 'vue'
interface TabPaneProps {
  title?: string
  content?: string
  key?: string
  closable?: boolean
}
const panes = ref<TabPaneProps[]>([
  { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
  { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
  { title: 'Tab 3', content: 'Content of Tab 3', key: '3', closable: false },
])

const activeKey = ref(panes.value[0].key)

const newTabIndex = ref(0)

const add = () => {
  activeKey.value = `newTab${++newTabIndex.value}`
  panes.value.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey.value })
}

const remove = (targetKey: Key) => {
  let lastIndex = 0
  panes.value.forEach((pane, i) => {
    if (pane.key === targetKey) {
      lastIndex = i - 1
    }
  })
  panes.value = panes.value.filter((pane) => pane.key !== targetKey)
  if (panes.value.length && activeKey.value === targetKey) {
    if (lastIndex >= 0) {
      activeKey.value = panes.value[lastIndex].key
    } else {
      activeKey.value = panes.value[0].key
    }
  }
}

const onEdit = (e: Key | MouseEvent | KeyboardEvent, action: 'add' | 'remove') => {
  if (action === 'add') {
    add()
  } else {
    // Only call remove if e is a string or number (Key)
    if (typeof e === 'string' || typeof e === 'number') {
      remove(e)
    }
  }
}
</script>
