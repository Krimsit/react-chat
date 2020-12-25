import cors from "cors"
import socket from "socket.io"
import express from "express"
import bodyParser from "body-parser"

import multer from "./multer"

import { UserCtrl, DialogCtrl, MessageCtrl, UploadCtrl } from "../controllers"

import { updateLastSeen, checkAuth } from "../middleware"
import { loginValidation, registerValidation } from "../utils/validations"

export default (app: express.Application, io: socket.Server) => {
    const UserController = new UserCtrl(io)
    const DialogController = new DialogCtrl(io)
    const MessageController = new MessageCtrl(io)
    const UploadFileController = new UploadCtrl()

    app.use(express.static(__dirname + "/build"))

    app.use(cors())
    app.use(bodyParser.json())
    app.use(checkAuth)
    app.use(updateLastSeen)

    app.get("/user/me", UserController.getMe)
    app.get("/user/verify", UserController.verify)
    app.post("/user/signup", registerValidation, UserController.create)
    app.post("/user/signin", loginValidation, UserController.login)
    app.get("/user/find", UserController.findUsers)
    app.get("/user/:id", UserController.show)
    app.delete("/user/:id", UserController.delete)

    app.get("/dialogs", DialogController.index)
    app.delete("/dialogs/:id", DialogController.delete)
    app.post("/dialogs", DialogController.create)

    app.get("/messages", MessageController.index)
    app.post("/messages", MessageController.create)
    app.delete("/messages", MessageController.delete)

    app.post("/files", multer.single("file"), UploadFileController.create)
    app.delete("/files", UploadFileController.delete)
}
