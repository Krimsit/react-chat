import express from "express"
import socket from "socket.io"
import { validationResult } from "express-validator"
import bcrypt from "bcrypt"

import { UserModel } from "../models"
import { createJWTToken } from "../utils"

class UserController {
    io: socket.Server

    constructor(io: socket.Server) {
        this.io = io
    }

    show = (req: express.Request, res: express.Response): void => {
        const id: string = req.params.id
        UserModel.findById(id, (err: any, user: any) => {
            if (err) {
                return res.status(404).json({
                    message: "User not found",
                })
            }
            res.json(user)
        })
    }

    getMe = (req: any, res: express.Response) => {
        const id: any = req.user._id
        UserModel.findById(id, (err: any, user: any) => {
            if (err || !user) {
                return res.status(404).json({
                    message: "User not found",
                })
            }
            res.json(user)
        })
    }

    findUsers = (req: express.Request, res: express.Response) => {
        const query: any = req.query.query
        UserModel.find()
            .or([
                { fullname: new RegExp(query, "i") },
                { email: new RegExp(query, "i") },
            ])
            .then((users) => {
                res.json(users)
            })
            .catch((err) => {
                return res.status(404).json({
                    status: "error",
                    message: err,
                })
            })
    }

    verify = (req: express.Request, res: express.Response) => {
        const hash: any = req.query.hash

        if (!hash) {
            return res.status(402).json({
                errors: "Invalid hash",
            })
        }

        UserModel.findOne({ confirmed_hash: hash }, (err: any, user: any) => {
            if (err || !user) {
                return res.status(404).json({
                    status: "error",
                    message: "Hash not found",
                })
            }
            user.confirmed = true
            user.save()
                .then(() => {
                    res.json({
                        status: "success",
                        message: "User confirmed",
                    })
                })
                .catch((err: any) => {
                    return res.status(404).json({
                        status: "error",
                        message: err,
                    })
                })
        })
    }

    login = (req: express.Request, res: express.Response) => {
        const postData = {
            email: req.body.email,
            password: req.body.password,
        }

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array(),
            })
        } else {
            UserModel.findOne(
                { email: postData.email },
                (err: any, user: any) => {
                    if (err || !user) {
                        return res.status(404).json({
                            message: "User not found",
                        })
                    }

                    if (bcrypt.compareSync(postData.password, user.password)) {
                        const token = createJWTToken(user)
                        res.json({
                            status: "success",
                            token,
                        })
                    } else {
                        res.status(403).json({
                            status: "error",
                            message: "Incorrect password or email",
                        })
                    }
                }
            )
        }
    }

    create = (req: express.Request, res: express.Response) => {
        const postData = {
            email: req.body.email,
            fullname: req.body.fullname,
            password: req.body.password,
        }

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array(),
            })
        } else {
            const user = new UserModel(postData)

            user.save()
                .then((user) => {
                    res.json({
                        status: "success",
                        user,
                    })
                })
                .catch((err) => {
                    res.status(422).json({
                        status: "error",
                        message: err,
                    })
                })
        }
    }

    delete = (req: express.Request, res: express.Response) => {
        const id: string = req.params.id
        UserModel.findOneAndRemove({ _id: id })
            .then((user) => {
                res.json({
                    message: `User ${user?.fullname} delete`,
                })
            })
            .catch(() => {
                res.json({
                    message: `User not found`,
                })
            })
    }
}

export default UserController
