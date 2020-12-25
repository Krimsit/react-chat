import mongoose, { Schema, Document } from "mongoose"
import validator from "validator"
import { differenceInMinutes, parseISO } from "date-fns"

import { generatePasswordHash } from "../utils"

export interface IUser extends Document {
    email: string
    fullname: string
    avatar: string
    password: string
    confirmed: boolean
    confirmed_hash: string
    last_seen: Date
}

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: "Email address is required",
            validate: [validator.isEmail, "Invalid Email"],
            index: { unique: true },
        },
        avatar: String,
        fullname: {
            type: String,
            required: "Fullname address is required",
        },
        password: {
            type: String,
            required: "Password address is required",
        },
        confirmed: {
            type: Boolean,
            default: false,
        },
        confirmed_hash: String,
        last_seen: {
            type: Date,
            default: new Date(),
        },
    },
    {
        timestamps: true,
    }
)

UserSchema.virtual("isOnline").get(function (this: any) {
    return (
        differenceInMinutes(
            parseISO(new Date().toISOString()),
            this.last_seen
        ) < 5
    )
})

UserSchema.set("toJSON", {
    virtuals: true,
})

UserSchema.pre<IUser>("save", async function (next) {
    const user = this

    if (!user.isModified("password")) {
        return next()
    }

    user.password = await generatePasswordHash(user.password)
    user.confirmed_hash = await generatePasswordHash(+new Date() + "")
})

const UserModel = mongoose.model<IUser>("User", UserSchema)

export default UserModel
