import express from "express"
import { QueryOptions } from "mongoose"
import socket from "socket.io"

import { MessageModel, DialogModel, UserModel } from "../models"

class MessageController {
    io: socket.Server

    constructor(io: socket.Server) {
        this.io = io
    }

    index = (req: any, res: express.Response) => {
        const dialogId: any = req.query.dialog
        const userId = req.user._id

        MessageModel.updateMany(
            { dialog: dialogId, user: { $ne: userId } },
            { $set: { readed: true } }
        )
            .then(() => {})
            .catch((err: any) => {
                res.status(500).json({
                    status: "error",
                    message: err,
                })
            })

        MessageModel.find({ dialog: dialogId })
            .populate(["dialog", "user", "attachments"])
            .exec((err, messages) => {
                if (err) {
                    return res.status(404).json({
                        status: "error",
                        message: "Messages not found",
                    })
                }
                res.json(messages)
            })
    }

    create = (req: any, res: express.Response) => {
        const userId = req.user._id

        const postData = {
            text: req.body.text,
            dialog: req.body.dialog_id,
            user: userId,
            attachments: req.body.attachments,
        }
        const message = new MessageModel(postData)
        message
            .save()
            .then((obj: any) => {
                obj.populate(
                    ["dialog", "user", "attachments"],
                    (err: any, message: any) => {
                        if (err) {
                            return res.status(500).json({
                                status: "error",
                                message: err,
                            })
                        }

                        DialogModel.findOneAndUpdate(
                            { _id: postData.dialog },
                            { lastMessage: message._id },
                            { upsert: true },
                            (err) => {
                                if (err) {
                                    return res.status(500).json({
                                        status: "error",
                                        message: err,
                                    })
                                }
                            }
                        )

                        message.save((err: any) => {
                            if (err) {
                                return res.status(500).json({
                                    status: "error",
                                    message: err,
                                })
                            }
                        })

                        res.json(message)

                        this.io.emit("SERVER:MESSAGE_CREATED", message)
                    }
                )
            })
            .catch((err) => {
                return res.json(err)
            })
    }

    delete = (req: any, res: express.Response) => {
        const id = req.query.id
        const userId: any = req.user._id

        MessageModel.findById(id, (err: any, message: any) => {
            if (err || !message) {
                return res.status(404).json({
                    status: "error",
                    message: "Message not found",
                })
            }

            if (message.user.toString() === userId) {
                message.remove()

                const dialogId = message.dialog
                MessageModel.findOne(
                    { dialog: dialogId },
                    {},
                    { sort: { created_at: -1 } },
                    (err, lastMessage) => {
                        if (err) {
                            return res.status(500).json({
                                status: "error",
                                message: err,
                            })
                        }

                        DialogModel.findById(
                            dialogId,
                            (err: any, dialog: any) => {
                                if (err) {
                                    return res.status(500).json({
                                        status: "error",
                                        message: err,
                                    })
                                }

                                dialog.lastMessage = lastMessage

                                dialog.save()
                            }
                        )
                    }
                )

                return res.json({
                    status: "success",
                    message: "Message deleted",
                })
            } else {
                return res.status(403).json({
                    status: "error",
                    message: "Not have permission",
                })
            }
        })
    }
}

export default MessageController
