import React from "react"
import classNames from "classnames"
import format from "date-fns/format"
import isToday from "date-fns/isToday"
import { Link } from "react-router-dom"

import { isAudio } from "utils/helpers"

import { ReadedIcon, Avatar } from "../"

const getMessageTime = (created_at) => {
    if (isToday(created_at)) {
        return format(created_at, "HH:mm")
    } else {
        return format(created_at, "dd.MM.yyyy")
    }
}

const renderLastMessage = (message, userId) => {
    if (
        !message.text &&
        isAudio(message.attachments) &&
        message.attachments.length
    ) {
        return "Голосовое сообщение"
    } else if (!message.text && message.attachments.length) {
        return "Фото"
    } else if (message.text) {
        return message.text
    }
}

const DialogItem = ({
    unreaded,
    isMe,
    _id,
    currentDialogId,
    partner,
    lastMessage,
    userId,
    author,
}) => (
    <Link to={`/dialog/${_id}`}>
        <div
            className={classNames("dialogs__item", {
                "dialogs__item--online":
                    author._id === userId ? partner.isOnline : author.isOnline,
                "dialogs__item--selected": currentDialogId === _id,
            })}
        >
            <div className="dialogs__item-avatar">
                <Avatar user={author._id === userId ? partner : author} />
            </div>
            <div className="dialogs__item-info">
                <div className="dialogs__item-info-top">
                    <b>
                        {author._id === userId
                            ? partner.fullname
                            : author.fullname}
                    </b>
                    <span>
                        {getMessageTime(new Date(lastMessage.createdAt))}
                    </span>
                </div>
                <div className="dialogs__item-info-bottom">
                    <p>
                        {lastMessage.user._id === userId
                            ? `Вы: ${renderLastMessage(lastMessage, userId)}`
                            : renderLastMessage(lastMessage, userId)}
                    </p>
                    {isMe && (
                        <ReadedIcon isMe={isMe} isReaded={lastMessage.readed} />
                    )}
                    {unreaded > 0 && (
                        <div className="dialogs__item-info-bottom-count">
                            {lastMessage.unreaded > 9
                                ? "+9"
                                : lastMessage.unreaded}
                        </div>
                    )}
                </div>
            </div>
        </div>
    </Link>
)

export default DialogItem
