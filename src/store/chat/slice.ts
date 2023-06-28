import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { ChatGpt, ChatsInfo } from '../../types'
import { generateChatInfo } from '../../utils'
export interface ChatState {
  // 聊天对话
  chats: Array<ChatsInfo>
  // 当前选择的会话id
  selectChatId: string | number
  // 新增一个对话
  addChat: () => void
  // 删除一个对话
  delChat: (id: string | number) => void
  // 清空所有对话
  clearChats: () => void
  // 改变选择会话ID
  changeSelectChatId: (id: string | number) => void
  // 给对话添加数据
  setChatInfo: (
    id: string | number,
    data?: ChatGpt,
    info?: ChatsInfo | { [key: string]: any }
  ) => void

}

const chatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      chats: [],
      selectChatId: '',

      addChat: () =>
        set((state: ChatState) => {
          const info = generateChatInfo()
          const newChats = [...state.chats]
          newChats.unshift({ ...info })
          return {
            chats: [...newChats],
            selectChatId: info.id
          }
        }),
      // 等待验证
      delChat: (id) =>
        set((state: ChatState) => {
          const newChats = state.chats.filter((c) => c.id !== id)
          if (state.chats.length <= 1) {
            const info = generateChatInfo()
            return {
              chats: [{ ...info }],
              selectChatId: info.id
            }
          }
          return {
            selectChatId: state.chats[1].id,
            chats: [...newChats]
          }
        }),
      clearChats: () =>
        set(() => {
          const info = generateChatInfo()
          return {
            chats: [{ ...info }],
            selectChatId: info.id
          }
        }),
      changeSelectChatId: (id) =>
        set(() => ({
          selectChatId: id
        })),

      setChatInfo: (id, data, info) =>
        set((state: ChatState) => {
          const newChats = state.chats.map((item) => {
            if (item.id === id) {
              const name = item.data.length <= 0 && data?.text ? data.text : item.name
              return {
                ...item,
                name,
                ...info,
                data: data ? item.data.concat({ ...data }) : item.data
              }
            }
            return item
          })
          return {
            chats: newChats
          }
        }),

    }),

    {
      name: 'chat_storage', // name of item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage) // (optional) by default the 'localStorage' is used
    }
  )
)

export default chatStore
