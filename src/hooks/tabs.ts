import router from '@/router'
import { useTabStore } from '@/stores/tab'
import type { TabItemProps } from '@/types'
import { h, markRaw, type Component } from 'vue'
import type { LocationQueryRaw, RouteParamsRawGeneric } from 'vue-router'
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
export interface MetaInfo {
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

/**
 *
 * @returns useTabs
 * 统一对外暴露的hooks, 只适用页签之间的跳转
 * 通过TabsManager.getInstance()获取单例实例
 * 提供open, push, replace, redirectTo等方法进行页签操作
 * 以及关闭当前页签、关闭所有页签、关闭指定页签等功能
 * @description
 * 该hooks封装了TabsManager的所有方法，提供了一个简洁的
 * 接口来管理页签操作。使用时只需调用useTabs()即可获取
 * tabs.replace()用在从列表页签跳转到详情/编辑/新增页面的场景，
 * tabs.redirectTo()用在从编辑/新增/详情页面返回列表页的场景。
 * @example
 */
export const useTabs = () => {
  const tabsManager = TabsManager.getInstance()
  return {
    replace: (ops: TabOperateProps) => tabsManager.replace(ops),
    redirectTo: (ops: TabOperateProps) => tabsManager.redirectTo(ops),
    open: (ops: TabOpenProps) => tabsManager.open(ops),
    push: (ops: TabOperateProps) => tabsManager.push(ops),
    closeActiveTab: () => tabsManager.closeActiveTab(),
    closeAllTab: () => tabsManager.closeAllTab(),
    closeInActiveTab: (name: string) => tabsManager.closeInActiveTab(name),
    closeOtherTab: () => tabsManager.closeOtherTab(),
  }
}
