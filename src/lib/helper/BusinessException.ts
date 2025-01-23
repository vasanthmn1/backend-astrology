

export class BusinessException extends Error {
    errorCode: number = 0
    constructor(message: string, errorCode?: number) {
        super(message)
        this.errorCode = errorCode || 100
    }
}