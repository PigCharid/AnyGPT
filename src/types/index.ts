export interface RequestLoginParams {
    email: string,
    code?: string | number
    password?: string
}


export interface UserInfo {
    id: string,
    email: string,
    username: string,
    logo: string,
    integral: number
}
export interface ResponseLoginData {
    user_info: UserInfo
    token?: string
}