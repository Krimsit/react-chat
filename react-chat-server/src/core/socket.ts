import socket from "socket.io"
import http from "http"

export default (http: http.Server) => {
    const io = new socket.Server(http)

    io.on("connection", (socket: any) => {
        socket.on("DIALOGS:JOIN", (dialogId: any) => {
            socket.dialogId = dialogId
            socket.join(dialogId)
        })
    })

    return io
}
