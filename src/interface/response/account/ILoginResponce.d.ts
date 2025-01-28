export interface ILoginResponse {

    token: string
    user: {
        id: string
        email: string
        access_permission: string
    }

}