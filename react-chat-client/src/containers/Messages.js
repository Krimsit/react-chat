import React, { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"

import socket from "core/socket"

import { messagesActions } from "redux/actions"
import { Messages as BaseMessages } from "components"

const Dialogs = ({
    items,
    fetchMessages,
    currentDialogId,
    addMessage,
    isLoading,
    user,
    removeMessageById,
    attachments,
}) => {
    const [blockHeight, setBlockHeight] = useState(135)

    const messagesRef = useRef(null)

    const onNewMessage = (data) => {
        addMessage(data)
    }

    useEffect(() => {
        if (attachments.length) {
            setBlockHeight(245)
        } else {
            setBlockHeight(135)
        }
    }, [attachments])

    useEffect(() => {
        if (!currentDialogId) {
            return null
        }

        if (currentDialogId) {
            fetchMessages(currentDialogId)
        }
        socket.on("SERVER:MESSAGE_CREATED", onNewMessage)

        return () => {
            socket.removeListener("SERVER:MESSAGE_CREATED", onNewMessage)
        }
    }, [currentDialogId])

    useEffect(() => {
        if (!currentDialogId) {
            return null
        }
        messagesRef.current.scrollTo(0, 99999999)
    }, [items])

    return currentDialogId ? (
        <BaseMessages
            user={user}
            blockRef={messagesRef}
            items={items}
            isLoading={isLoading && !user}
            onRemoveMessage={removeMessageById}
            blockHeight={blockHeight}
        />
    ) : null
}

export default connect(
    ({ dialogs, messages, user, attachments }) => ({
        currentDialogId: dialogs.currentDialogId,
        items: messages.items,
        isLoading: messages.isLoading,
        user: user.data,
        attachments: attachments.items,
    }),
    messagesActions
)(Dialogs)
