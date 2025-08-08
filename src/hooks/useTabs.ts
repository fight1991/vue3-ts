import { useTabStore } from '@/stores/tab'
import type { TabItemProps } from '@/types'
interface TabIProps {
  name: string
  tabId?: string
  tabTitle?: string
  refresh?: boolean
  query?: Record<string, unknown>
  params?: Record<string, unknown>
}
class UseTabs {}
