import React from "react"
import { Input, Empty } from "antd"
import orderBy from "lodash/orderBy"

import { DialogItem } from "../"

import "./Dialogs.scss"

const Dialogs = ({ items, userId, onSearch, currentDialogId, inputValue }) => (
    <div className="dialogs">
        <div className="dialogs__search">
            <Input.Search
                value={inputValue}
                placeholder="Поиск среди контактов"
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
        {items.length ? (
            orderBy(items, ["created_at"], ["desc"]).map((item) => (
                <DialogItem
                    key={item._id}
                    isMe={item.lastMessage.user._id === userId}
                    currentDialogId={currentDialogId}
                    {...item}
                    userId={userId}
                />
            ))
        ) : (
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Ничего не найдено"
            />
        )}
    </div>
)

export default Dialogs
