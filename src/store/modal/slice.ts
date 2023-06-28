import { create } from 'zustand'
export interface modalState {
    // 登录弹窗的开关
    logoinModalVisiable: boolean
    // 修改登录弹窗
    setLogoinModalVisiable: (value: boolean) => void
    // 创建弹窗的开关
    createProjectChoiceModalVisiable: boolean
    // 修改登录弹窗
    setCreateProjectChoiceModalVisiable: (value: boolean) => void
    // 创建弹窗的开关
    createProjectModalVisiable: boolean
    // 修改登录弹窗
    setCreateProjectModalVisiable: (value: boolean) => void
}



const modalStore = create<modalState>(
    (set, get) => ({
        logoinModalVisiable: false,
        setLogoinModalVisiable: (value) => set({ logoinModalVisiable: value }),
        createProjectModalVisiable: false,
        setCreateProjectModalVisiable: (value) => set({ createProjectModalVisiable: value }),
        createProjectChoiceModalVisiable: false,
        setCreateProjectChoiceModalVisiable: (value) => set({ createProjectChoiceModalVisiable: value })
    })
)


export default modalStore