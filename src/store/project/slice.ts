import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { ProjectInfo, ResponseProjectData } from '../../types'

export interface userState {
    // 用户信息
    project_info: Array<ProjectInfo> | undefined
    getProjects: (data: ResponseProjectData) => void

}

const projectStore = create<userState>()(
    persist(
        (set, get) => ({
            project_info: undefined,
            // token: undefined,
            getProjects: (data) => set(() => ({ ...data })),
            // logout: () => set(() => ({ user_info: undefined, token: undefined })),
        }),
        {
            name: 'project_storage', // name of item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage) // (optional) by default the 'localStorage' is used
        }
    )
)
export default projectStore