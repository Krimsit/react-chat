import { useEffect } from "react"

const Click = (el, callback) => {
    const handleClick = (e) => {
        if (el && !el.contains(e.target)) {
            callback()
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClick)

        return () => {
            document.removeEventListener("click", handleClick)
        }
    })
}
export default Click
