import React, { useState, useRef, useEffect } from "react"
import propTypes from "prop-types"
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons"
import { Popover, Button, Image } from "antd"
import { EllipsisOutlined } from "@ant-design/icons"
import ReactStringReplace from "react-string-replace"
import { Emoji } from "emoji-mart"

import { convertCurrentTime, isAudio } from "utils/helpers"

import { Time, ReadedIcon, Avatar } from "../"

import "./Message.scss"

const MessageAudio = ({ audio }) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const audioElem = useRef(null)

    useEffect(() => {
        audioElem.current.addEventListener(
            "playing",
            () => {
                setIsPlaying(true)
            },
            false
        )
        audioElem.current.addEventListener(
            "ended",
            () => {
                setIsPlaying(false)
                setProgress(0)
            },
            false
        )
        audioElem.current.addEventListener(
            "pause",
            () => {
                setIsPlaying(false)
            },
            false
        )
        audioElem.current.addEventListener(
            "timeupdate",
            () => {
                const duration =
                    (audioElem.current && audioElem.current.duration) || 0
                setCurrentTime(audioElem.current.currentTime)
                setProgress((audioElem.current.currentTime / duration) * 100)
            },
            false
        )
    }, [])

    const toggleplay = () => {
        if (!isPlaying) {
            audioElem.current.play()
        } else {
            audioElem.current.pause()
        }
    }
    return (
        <div className="message__audio">
            <audio src={audio} preload="auto" ref={audioElem} />
            <div
                className="message__audio-progress"
                style={{
                    width: progress + "%",
                }}
            ></div>
            <div className="message__audio-info">
                <div className="message__audio-btn">
                    <button onClick={toggleplay}>
                        {isPlaying ? (
                            <FontAwesomeIcon
                                icon={faPause}
                                color="#ffffff"
                                alt="Play"
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon={faPlay}
                                color="#ffffff"
                                alt="Play"
                            />
                        )}
                    </button>
                </div>
                <div className="message__audio-wave">
                    <img
                        src="https://raw.githubusercontent.com/Archakov06/react-chat-tutorial/cd5cd6442cb796b41f7354ba9587b38e87829592/src/assets/img/wave.svg"
                        alt="Wave"
                    />
                </div>
                <span className="message__audio-duration">
                    {convertCurrentTime(currentTime)}
                </span>
            </div>
        </div>
    )
}

const Message = ({
    user,
    text,
    date,
    isMe,
    readed,
    attachments,
    isTyping,
    onRemoveMessage,
}) => {
    const renderAttachment = (item) => {
        if (item.ext !== "webm") {
            return (
                <div className="message__attachments-item" key={item._id}>
                    <Image src={item.url} alt={item.filename} />
                </div>
            )
        } else {
            return <MessageAudio audio={item.url} />
        }
    }

    return (
        <div
            className={classNames("message", {
                "message--isme": isMe,
                "message--is-typing": isTyping,
                "message--image":
                    !isAudio(attachments) &&
                    attachments &&
                    attachments.length === 1 &&
                    !text,
                "message--is-audio": isAudio(attachments),
            })}
        >
            <div className="message__content">
                <ReadedIcon isMe={isMe} isReaded={readed} />
                <Popover
                    content={
                        <div>
                            <Button onClick={onRemoveMessage}>
                                Удалить сообщение
                            </Button>
                        </div>
                    }
                    trigger="click"
                >
                    <div className="message__icon-actions">
                        <Button
                            type="link"
                            shape="circle"
                            icon={<EllipsisOutlined />}
                        />
                    </div>
                </Popover>
                <div className="message__avatar">
                    <Avatar user={user} />
                </div>
                <div className="message__info">
                    {(text || isTyping) && (
                        <div className="message__bubble">
                            {text && (
                                <p className="message__text">
                                    {ReactStringReplace(
                                        text,
                                        /:(.+?):/g,
                                        (match, i) => (
                                            <Emoji
                                                key={i}
                                                emoji={match}
                                                set="apple"
                                                size={16}
                                            />
                                        )
                                    )}
                                </p>
                            )}
                        </div>
                    )}
                    {attachments && (
                        <div className="message__attachments">
                            {attachments.map((item) => renderAttachment(item))}
                        </div>
                    )}

                    {date && (
                        <span className="message__date">
                            <Time date={new Date(date)} />
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

Message.defaultProps = {
    user: {},
}

Message.propTypes = {
    avatar: propTypes.string,
    text: propTypes.string,
    data: propTypes.instanceOf(Date),
    user: propTypes.object,
    attachments: propTypes.array,
    isMe: propTypes.bool,
    isReaded: propTypes.bool,
    audio: propTypes.string,
}

export default Message
