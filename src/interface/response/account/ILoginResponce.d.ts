export interface ILoginResponse {

    token: string
    user: {
        user_id: string
        email: string
        access_permission: string
    }

}