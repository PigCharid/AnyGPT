import { RequestCreateProjectParams } from '../../types'
import projectStore from '../project/slice'
import { createProject, getProjects } from '../../request'
// 获取所有项目
export async function fetchGetProject() {
    try {
        const response = await getProjects()
        projectStore.getState().getProjects({ ...response.data })
        return response
    } catch (error) {
        console.log(error)
    }
}

export async function fetchCreateProject(params: RequestCreateProjectParams) {
    try {
        const response = await createProject(params)
        // userStore.getState().login({ ...response.data })
        await fetchGetProject()
        return response

    } catch (error) {
        console.log(error)

    }

}

// eslint-disable-next-line
export default {
    fetchGetProject,
    fetchCreateProject
}