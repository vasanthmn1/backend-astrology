

export interface IConfig {

    flag: {
        live: boolean
    }
    db: {
        mongo_url: string
    }

    port: number

    cloudinary: {
        name: string
        api_key: string
        api_secret: string
    }

    secret_key: {
        jwt_web: string  //jwt
        private: string
    },
    static_key: {
        public: string
    }
}