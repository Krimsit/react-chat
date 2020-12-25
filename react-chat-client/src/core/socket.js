import io from "socket.io-client"

const socket = io(window.location.origon, {
    forceNew: true,
    reconnection: true,
    reconnectionAttempts: 5,
})

export default socket
