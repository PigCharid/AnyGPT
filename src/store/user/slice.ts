import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { UserInfo, ResponseLoginData } from '../../types'

export interface userState {
    // 用户信息
    user_info: UserInfo | undefined
    // 登陆Token
    token: string | undefined
    // 登陆
    login: (data: ResponseLoginData) => void
    logout: () => void
}

const userStore = create<userState>()(
    persist(
        (set, get) => ({
            user_info: undefined,
            token: undefined,
            login: (data) => set(() => ({ ...data })),
            logout: () => set(() => ({ user_info: undefined, token: undefined })),
        }),
        {
            name: 'user_storage', // name of item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage) // (optional) by default the 'localStorage' is used
        }
    )
)
export default userStore