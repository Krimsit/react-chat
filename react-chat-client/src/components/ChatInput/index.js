import React, { Fragment } from "react"
import propTypes from "prop-types"
import { Input, Button } from "antd"
import {
    SmileOutlined,
    CameraOutlined,
    AudioOutlined,
    SendOutlined,
    CloseSquareOutlined,
    StopOutlined,
    LoadingOutlined,
} from "@ant-design/icons"
import { UploadField } from "@navjobs/upload"
import { Picker } from "emoji-mart"

import { UploadFiles } from "components"

import "./ChatInput.scss"

const { TextArea } = Input

const ChatInput = (props) => {
    const {
        value,
        emojiPickerVisible,
        setValue,
        toggleEmojiPicker,
        addEmoji,
        handleSendMessage,
        sendMessage,
        attachments,
        onSelectFiles,
        onRecord,
        isRecording,
        onHideRecord,
        isLoading,
        removeAttachments,
    } = props

    return (
        <Fragment>
            <div className="chat-input">
                <div>
                    <div className="chat-input__smile-btn">
                        <div className="chat-input__emoji-picker">
                            {emojiPickerVisible && (
                                <Picker
                                    onSelect={(emojiTag) => addEmoji(emojiTag)}
                                    set="apple"
                                />
                            )}
                        </div>
                        <Button
                            type="link"
                            shape="circle"
                            icon={<SmileOutlined />}
                            onClick={toggleEmojiPicker}
                        />
                    </div>
                    {!isRecording ? (
                        <TextArea
                            onChange={(e) => setValue(e.target.value)}
                            onKeyUp={handleSendMessage}
                            size="large"
                            placeholder="Введите текст сообщения"
                            value={value}
                            autoSize={{ minRows: 1, maxRows: 6 }}
                        />
                    ) : (
                        <div className="chat-input__record-status">
                            <i></i>
                            Recording...
                        </div>
                    )}
                    <div className="chat-input__actions">
                        {!isRecording ? (
                            <UploadField
                                onFiles={onSelectFiles}
                                containerProps={{
                                    className: "chat-input__actions-upload",
                                }}
                                uploadProps={{
                                    accept: ".jpg,.jpeg,.png,.gif,.bmp",
                                    multiple: "multiple",
                                }}
                            >
                                <Button
                                    type="link"
                                    shape="circle"
                                    icon={<CameraOutlined />}
                                />
                            </UploadField>
                        ) : (
                            <Button
                                type="link"
                                shape="circle"
                                icon={<StopOutlined className="stop" />}
                                onClick={onHideRecord}
                            />
                        )}

                        {isLoading ? (
                            <Button
                                type="link"
                                shape="circle"
                                icon={<LoadingOutlined />}
                            />
                        ) : isRecording || value || attachments.length ? (
                            <Button
                                onClick={sendMessage}
                                type="link"
                                shape="circle"
                                icon={
                                    !isRecording ? (
                                        <SendOutlined />
                                    ) : (
                                        <CloseSquareOutlined className="recording" />
                                    )
                                }
                            />
                        ) : (
                            <div className="chat-input__record-btn">
                                <Button
                                    onClick={onRecord}
                                    type="link"
                                    shape="circle"
                                    icon={<AudioOutlined />}
                                />
                            </div>
                        )}
                    </div>
                </div>
                {attachments.length > 0 && (
                    <div className="chat-input__attachments">
                        <UploadFiles
                            attachments={attachments}
                            removeAttachments={removeAttachments}
                        />
                    </div>
                )}
            </div>
        </Fragment>
    )
}

ChatInput.propTypes = {
    className: propTypes.string,
}

export default ChatInput
