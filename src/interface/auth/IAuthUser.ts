export interface IAuthUser {
    user: {
        email: string
        id: string
        permission: string
        name: string

    },
    extra: {
        timeZone: string
    }

}