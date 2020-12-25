declare namespace Express {
    import { IUser } from "./models/UserSchema"

    export interface Request {
        user?: IUser
    }
}
