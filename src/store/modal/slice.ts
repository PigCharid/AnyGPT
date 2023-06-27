import { create } from 'zustand'
export interface modalState {
    // 登录弹窗的开关
    logoinModalVisiable: boolean
    // 修改登录弹窗
    setLogoinModalVisiable: (value: boolean) => void
}



const modalStore = create<modalState>(
    (set, get) => ({
        logoinModalVisiable: false,
        setLogoinModalVisiable: (value) => set({ logoinModalVisiable: value })
    })
)


export default modalStore