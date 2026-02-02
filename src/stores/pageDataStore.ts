import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface PageDataStore {
  pageData: Record<string, any>
  setData: (key: string, data: any) => void
  getData: (key: string) => any
  clearData: (key: string) => void
  clearAllData: () => void
}

export const usePageDataStore = create<PageDataStore>()(
  persist(
    (set, get) => ({
      pageData: {},

      // 设置数据
      setData: (key: string, data: any) =>
        set((state) => ({
          pageData: { ...state.pageData, [key]: data },
        })),

      // 获取数据
      getData: (key: string) => get().pageData[key],

      // 清除指定数据
      clearData: (key: string) =>
        set((state) => {
          const newPageData = { ...state.pageData }
          delete newPageData[key]
          return { pageData: newPageData }
        }),

      // 清除所有数据
      clearAllData: () => set({ pageData: {} }),
    }),
    {
      name: 'page-data-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
