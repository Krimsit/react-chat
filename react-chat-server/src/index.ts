import express from "express"
import dotemv from "dotenv"
import { createServer } from "http"

import "./core/db"
import createRoutes from "./core/routes"
import createSocket from "./core/socket"

dotemv.config()

const app = express()
const http = createServer(app)
const io = createSocket(http)

createRoutes(app, io)

http.listen(process.env.PORT || 3003, () => {
    console.log(`Server runing is http://localhost:${process.env.PORT}`)
})
