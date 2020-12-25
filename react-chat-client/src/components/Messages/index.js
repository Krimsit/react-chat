import React from "react"
import propTypes from "prop-types"
import { Empty, Spin } from "antd"
import classNames from "classnames"

import { Message } from "../"

import "./Messages.scss"

const Messages = ({
    blockRef,
    isLoading,
    items,
    user,
    onRemoveMessage,
    blockHeight,
}) => {
    return (
        <div
            className="chat__dialog-messages"
            style={{ height: `calc(100% - ${blockHeight}px)` }}
        >
            <div
                className={classNames("messages", {
                    "messages--loading": isLoading,
                })}
                ref={blockRef}
            >
                {isLoading || !user ? (
                    <Spin tip="Загрузка..." size="large" />
                ) : items && !isLoading ? (
                    items.length > 0 ? (
                        items.map((item) => (
                            <Message
                                key={item._id}
                                {...item}
                                isMe={user._id === item.user._id}
                                onRemoveMessage={onRemoveMessage.bind(
                                    this,
                                    item._id
                                )}
                            />
                        ))
                    ) : (
                        <Empty description="Нет сообщений" />
                    )
                ) : (
                    <Empty description="Откройте диалог" />
                )}
            </div>
        </div>
    )
}

Messages.propTypes = {
    items: propTypes.array,
}

export default Messages
