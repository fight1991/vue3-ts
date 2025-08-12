<template>
  <div>
    <template v-for="item in tabList" :key="item.name + item.tabId">
      <div class="content-item" v-show="item.name === activeTab">
        <div class="tab-content" v-if="item.isShow">
          <component :is="loadComponents(item)"></component>
          <!-- <div v-show="index>0" class="copy-right">版权所有</div> -->
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, h, markRaw, ref, watchEffect } from 'vue'
import { useTabs, type MetaInfo } from '@/hooks/tabs'
import { useTabStore } from '@/stores/tab'
import type { TabItemProps } from '@/types'
import router from '@/router'
const tabStore = useTabStore()

const tabList = computed(() => tabStore.tabList)

const activeTab = computed(() => tabStore.activeTab)

const loadComponents = computed(() => {
  return (item: TabItemProps) => {
    // 刷新浏览器时, 如果不是首页, 则首页没必要渲染, 只有点击到首页才会加载
    if (item.components.length === 0 && item.name === activeTab.value) {
      const metaInfo = router.resolve({ name: item.name }).meta as unknown as MetaInfo
      item.components = [markRaw(metaInfo.component ?? h('div', 'no component'))]
    }
    return item.components[item.components.length - 1]
  }
})
</script>
