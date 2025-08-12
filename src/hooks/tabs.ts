import router from '@/router'
import { useTabStore } from '@/stores/tab'
import type { Meta, TabItemProps } from '@/types'
import { install } from 'ant-design-vue'
import { h, markRaw, type Component } from 'vue'
import type { LocationQueryRaw, RouteMeta, RouteParamsRawGeneric } from 'vue-router'
interface TabOperateProps {
  name: string
  tabTitle?: string
  refresh?: boolean
  query?: LocationQueryRaw
  params?: RouteParamsRawGeneric
}

interface TabOpenProps extends TabOperateProps {
  tabId: string
}
interface MetaInfo {
  title: string
  component?: Component
}

/**
 * 页签操作类
 * 统一用路由name做跳转, path时params传参会失效
 * TabsManager.open    打开新页签, 需要定义一个tabId
 * TabsManager.push  在已有的页签中查找,有则激活,无则添加
 * TabsManager.replace 替换已有页签,无则打开新页签
 * TabsManager.back    关闭当前tab,打开指定tab(通过refresh指定页签是否需要刷新)
 */
export class TabsManager {
  private static instance: TabsManager | null = null
  private _tabStore?: ReturnType<typeof useTabStore>
  // 私有构造函数，防止外部直接实例化
  private constructor() {}
  // 获取单例实例
  public static getInstance(): TabsManager {
    if (!TabsManager.instance) {
      TabsManager.instance = new TabsManager()
    }
    return TabsManager.instance
  }
  private get tabStore() {
    if (!this._tabStore) {
      this._tabStore = useTabStore()
    }
    return this._tabStore
  }
  /**
   * 处理标签页操作
   * @param opInfo 操作的信息
   * @param handler 返回处理后的页签信息
   * @private
   *
   */
  private handleTabOperation = (
    opInfo: TabOperateProps,
    handler: (tabInfo: TabItemProps) => void,
  ) => {
    const metaInfo = router.resolve({ name: opInfo.name }).meta as unknown as MetaInfo
    handler({
      name: opInfo.name,
      title: opInfo.tabTitle || metaInfo.title,
      isShow: true,
      components: [markRaw(metaInfo.component ?? h('div', 'no component'))],
      query: opInfo.query,
      params: opInfo.params,
    })

    router.push({
      name: opInfo.name,
      query: opInfo.query,
      params: opInfo.params,
    })
  }
  open(ops: TabOpenProps) {
    this.handleTabOperation(ops, (tabInfo) => {
      this.tabStore.addTab(tabInfo)
    })
  }
  push(ops: TabOperateProps) {
    this.handleTabOperation(ops, (tabInfo) => {
      this.tabStore.reOpenTab(tabInfo)
    })
  }
  replace(ops: TabOperateProps) {
    this.handleTabOperation(ops, (tabInfo) => {
      this.tabStore.replaceTab(tabInfo)
    })
  }
  redirectTo(ops: TabOperateProps) {
    this.handleTabOperation(ops, (tabInfo) => {
      if (ops.refresh) {
        this.tabStore.redirectTo(tabInfo)
        return
      }
      this.tabStore.closeActiveTab()
      this.tabStore.reOpenTab(tabInfo)
    })
  }
  closeActiveTab() {
    this.tabStore.closeActiveTab()
    router.push({ ...this.tabStore.currentTabInfo })
  }
  closeAllTab() {
    this.tabStore.closeAllTab()
    router.push({ ...this.tabStore.currentTabInfo })
  }
  closeInActiveTab(name: string) {
    this.tabStore.closeInActiveTab(name)
  }
  closeOtherTab() {
    this.tabStore.closeOtherTab()
  }
}
// 导出单例实例
export const tabsManager = TabsManager.getInstance()

export const useTabs = () => {
  const tabsManager = TabsManager.getInstance()
  return {
    manager: tabsManager,
    open: (ops: TabOpenProps) => tabsManager.open(ops),
    push: (ops: TabOperateProps) => tabsManager.push(ops),
    replace: (ops: TabOperateProps) => tabsManager.replace(ops),
    redirectTo: (ops: TabOperateProps) => tabsManager.redirectTo(ops),
    closeActiveTab: () => tabsManager.closeActiveTab(),
    closeAllTab: () => tabsManager.closeAllTab(),
    closeInActiveTab: (name: string) => tabsManager.closeInActiveTab(name),
    closeOtherTab: () => tabsManager.closeOtherTab(),
  }
}
