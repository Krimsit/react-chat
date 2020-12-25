import React, { useState, useEffect } from "react"
import { connect } from "react-redux"

import socket from "core/socket"

import { dialogsActions } from "redux/actions"
import { Dialogs as BaseDialogs } from "components"

const Dialogs = ({ fetchDialogs, currentDialogId, items, userId, dialogs }) => {
    const [inputValue, setValue] = useState("")
    const [filtred, setFiltredItems] = useState(Array.from(items))

    console.log(items)

    const onChangeInput = (value = "") => {
        setFiltredItems(
            items.filter(
                (dialog) =>
                    dialog.author.fullname
                        .toLowerCase()
                        .indexOf(value.toLowerCase()) >= 0 ||
                    dialog.partner.fullname
                        .toLowerCase()
                        .indexOf(value.toLowerCase()) >= 0
            )
        )
        setValue(value)
    }

    window.fetchDialogs = fetchDialogs

    useEffect(() => {
        if (items.length) {
            onChangeInput()
        }
    }, [items])

    useEffect(() => {
        fetchDialogs()

        socket.on("SERVER:DIALOG_CREATED", fetchDialogs)
        socket.on("SERVER:MESSAGE_CREATED", fetchDialogs)

        return () => {
            socket.removeListener("SERVER:DIALOG_CREATED", fetchDialogs)
            socket.removeListener("SERVER:MESSAGE_CREATED", fetchDialogs)
        }
    }, [])

    return (
        <BaseDialogs
            userId={userId}
            items={filtred}
            onSearch={onChangeInput}
            inputValue={inputValue}
            currentDialogId={currentDialogId}
        />
    )
}

export default connect(({ dialogs }) => dialogs, dialogsActions)(Dialogs)
