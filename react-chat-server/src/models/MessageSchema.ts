import mongoose, { Schema, Document } from "mongoose"

export interface IMessage extends Document {
    text: string
    dialog: Schema.Types.ObjectId
    readed: boolean
}
const MessageSchema = new Schema(
    {
        text: {
            type: String,
        },
        dialog: {
            type: Schema.Types.ObjectId,
            ref: "Dialog",
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        readed: {
            type: Boolean,
            default: false,
        },
        attachments: [
            {
                type: Schema.Types.ObjectId,
                ref: "UploadFile",
            },
        ],
    },
    {
        timestamps: true,
        usePushEach: true,
    }
)

const MessageModel = mongoose.model<IMessage>("Message", MessageSchema)

export default MessageModel
