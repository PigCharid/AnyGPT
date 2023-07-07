import { RequestLoginParams } from '../../types'
import userStore from '../user/slice'
import { signIn, signup } from '../../request'
// 登录
export async function fetchLogin(params: RequestLoginParams) {
    try {
        const response = await signIn(params)
        userStore.getState().login({ ...response.data })
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}
export async function fetchRegister(params: RequestLoginParams) {
    try {
        const response = await signup(params)
        userStore.getState().login({ ...response.data })
        return response

    } catch (error) {
        console.log(error)
        return error
    }
}
// eslint-disable-next-line
export default {
    fetchLogin,
    fetchRegister
}