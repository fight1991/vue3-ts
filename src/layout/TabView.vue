<template>
  <div>
    <template v-for="item in tabList" :key="item.name + item.tabId">
      <div class="content-item" v-show="item.name === activeTab">
        <div class="tab-content" v-if="item.isShow">
          <component :is="item.components[item.components.length - 1]"></component>
          <!-- <div v-show="index>0" class="copy-right">版权所有</div> -->
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTabs } from '@/hooks/tabs'
import { useTabStore } from '@/stores/tab'
const tabStore = useTabStore()
const tabs = useTabs()

const tabList = computed(() => tabStore.tabList)
const activeTab = computed(() => tabStore.activeTab)
</script>
