import React, { useState } from "react"
import { connect } from "react-redux"
import { userApi, dialogsApi } from "utils/api"

import { Sidebar } from "components"

const SidebarContainer = ({ user }) => {
    const [visible, setVisible] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [messageText, setMessageText] = useState("")
    const [users, setUsers] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState(null)

    const onClose = () => {
        setVisible(false)
    }

    const onShow = () => {
        setVisible(true)
    }

    const handleChangeInput = (value) => {
        setInputValue(value)
    }

    const onSelectUser = (userId) => {
        setSelectedUserId(userId)
    }

    const onAddDialog = () => {
        dialogsApi
            .create({
                partner: selectedUserId,
                text: messageText,
            })
            .then(({ data }) => {
                console.log(data)
                onClose()
            })
            .catch(() => {
                setIsSearching(false)
            })
    }

    const onSearch = (value) => {
        setIsSearching(true)
        userApi
            .findUsers(value)
            .then(({ data }) => {
                setUsers(data)
                setIsSearching(false)
            })
            .catch(() => {
                setIsSearching(false)
            })
    }

    const onChangeTextArea = (e) => {
        setMessageText(e.target.value)
    }

    return (
        <Sidebar
            user={user}
            visible={visible}
            onClose={onClose}
            onShow={onShow}
            inputValue={inputValue}
            onSearch={onSearch}
            onChangeInput={handleChangeInput}
            onSelectUser={onSelectUser}
            users={users}
            onModalOk={onAddDialog}
            onChangeTextArea={onChangeTextArea}
            messageText={messageText}
            isSearching={isSearching}
            selectedUserId={selectedUserId}
        />
    )
}

export default connect(({ user }) => ({ user: user.data }))(SidebarContainer)
