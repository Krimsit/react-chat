import { notification } from "antd"

export default function openNotification({
    text,
    type = "info",
    title,
    duration = 3,
}) {
    notification[type]({
        message: title,
        description: text,
        duration: duration,
    })
}
