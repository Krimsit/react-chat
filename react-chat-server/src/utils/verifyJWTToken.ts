import jwt, { VerifyErrors } from "jsonwebtoken"
import { IUser } from "../models/UserSchema"

export interface DecodedData {
    data: {
        _doc: IUser
    }
}

export default (token: string): Promise<DecodedData | null> =>
    new Promise(
        (
            resolve: (decodedData: DecodedData) => void,
            reject: (err: VerifyErrors) => void
        ) => {
            jwt.verify(
                token,
                process.env.JWT_SECRET || "",
                (err: any, decodedData) => {
                    if (err || !decodedData) {
                        return reject(err)
                    }
                    console.log(decodedData)
                    resolve(decodedData as DecodedData)
                }
            )
        }
    )
