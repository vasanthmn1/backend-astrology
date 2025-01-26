

export interface ProcessEnv {

    LIVE: boolean
    PORT: number

    MONGO_URL: string

    JWT_SECRET_WEB: string
    PRIVATE_SECRET_WEB: string

    PUBLIC_STATIC: string

    CLOUDINARY_NAME: string
    CLOUDINARY_API_KEY: string
    CLOUDINARY_API_SECRET: string

}