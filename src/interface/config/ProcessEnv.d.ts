

export interface ProcessEnv {

    LIVE: boolean
    PORT: number

    MONGO_URL: string

    JWT_SECRET_WEB: string

    CLOUDINARY_NAME: string
    CLOUDINARY_API_KEY: string
    CLOUDINARY_API_SECRET: string
}