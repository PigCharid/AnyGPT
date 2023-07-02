// User
export interface UserInfo {
    id: string,
    email: string,
    username: string,
    logo: string,
    integral: number
}
export interface RequestLoginParams {
    email: string,
    code?: string | number
    password?: string
}

export interface ResponseLoginData {
    user_info: UserInfo
    token?: string
}


// project
export interface ProjectInfo {
    _id: string
    name: string,
    title: string,
    message: string,
    website: string,
    creator: string,
    tags: [string],
    smallBanner: string,
    lagerBanner: string,
    likes: [string],
    createdAt: Date
}
export interface RequestCreateProjectParams {
    name: string,
    title: string,
    message: string,
    website?: string,
    creator: string,
    tags: [string],
    smallBanner: string,
    lagerBanner: string,
    createdAt: Date
}

export interface ResponseProjectData {
    project_info: Array<ProjectInfo>
}


// Chats
export interface ChatsInfo {
    path: string
    id: string
    name: string
    data: Array<ChatGpt>
}
export interface ChatGpt {
    id: string
    text: string
    dateTime: string
    status: 'pass' | 'loading' | 'error'
    role: 'assistant' | 'user' | string
}

