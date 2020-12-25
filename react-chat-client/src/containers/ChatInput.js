import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { Empty } from "antd"

import { uploadApi } from "utils/api"
import { messagesActions, attachmentsActions } from "redux/actions"

import { ChatInput as BaseChactInput } from "components"

const ChatInput = (props) => {
    const {
        dialogs: { currentDialogId },
        attachments,
        fetchSendMessage,
        setAttachments,
        removeAttachments,
    } = props

    window.navigator.getUserMedia =
        window.navigator.getUserMedia ||
        window.navigator.mozGetUserMedia ||
        window.navigator.webkitGetUserMedia ||
        window.navigator.msGetUserMedia

    const [value, setValue] = useState("")
    const [isRecording, setIsRecording] = useState(false)
    const [mediaRecorder, setMediaRecorder] = useState(null)
    const [emojiPickerVisible, setEmojiPicker] = useState(false)
    const [isLoading, setLoading] = useState(false)

    const addEmoji = ({ colons }) => {
        setValue((value + " " + colons).trim())
    }

    const toggleEmojiPicker = () => {
        setEmojiPicker(!emojiPickerVisible)
    }

    const onRecord = () => {
        if (window.navigator.getUserMedia) {
            window.navigator.getUserMedia({ audio: true }, onRecording, onError)
        }
    }

    const onRecording = (stream) => {
        const recorder = new MediaRecorder(stream)
        setMediaRecorder(recorder)
        recorder.start()

        recorder.onstart = () => {
            setIsRecording(true)
        }

        recorder.onstop = () => {
            setIsRecording(false)
        }

        recorder.ondataavailable = (e) => {
            const file = new File([e.data], "audio.webm")
            setLoading(true)
            uploadApi.upload(file).then(({ data }) => {
                sendAudio(data.file._id).then(() => {
                    setLoading(false)
                })
            })
        }
    }

    const onError = (err) => {
        console.log(err)
    }

    const handleOutsideClick = (el, e) => {
        if (el && !el.contains(e.target)) {
            setEmojiPicker(false)
        }
    }

    const sendAudio = (audioId) => {
        return fetchSendMessage({
            text: null,
            dialogId: currentDialogId,
            attachments: [audioId],
        })
    }

    const sendMessage = () => {
        if (isRecording) {
            mediaRecorder.stop()
        } else {
            fetchSendMessage({
                text: value,
                dialogId: currentDialogId,
                attachments: attachments.map((file) => file.uid),
            })
            setValue("")
            setAttachments([])
        }
    }

    const handleSendMessage = (e) => {
        if (e.keyCode === 13) {
            sendMessage()
        }
    }

    const onHideRecord = () => {
        setIsRecording(false)
    }

    const onSelectFiles = async (files) => {
        let uploaded = []
        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            const uid = Math.round(Math.random() * 1000)
            uploaded = [
                ...uploaded,
                {
                    uid: uid,
                    name: file.name,
                    status: "uploading",
                },
            ]
            setAttachments(uploaded)
            //eslint-disable-next-line no-loop-func
            await uploadApi.upload(file).then(({ data }) => {
                uploaded = uploaded.map((item) => {
                    if (item.uid === uid) {
                        return {
                            uid: data.file._id,
                            name: data.file.filename,
                            status: "done",
                            url: data.file.url,
                        }
                    }
                    return item
                })
            })
        }
        setAttachments(uploaded)
    }

    useEffect(() => {
        const el = document.querySelector(".chat-input__smile-btn")

        document.addEventListener("click", handleOutsideClick.bind(this, el))

        return () => {
            document.removeEventListener(
                "click",
                handleOutsideClick.bind(this, el)
            )
        }
    }, [])

    if (!currentDialogId) {
        return <Empty description="Откройте диалог" />
    }

    return (
        <BaseChactInput
            value={value}
            setValue={setValue}
            emojiPickerVisible={emojiPickerVisible}
            toggleEmojiPicker={toggleEmojiPicker}
            addEmoji={addEmoji}
            handleSendMessage={handleSendMessage}
            sendMessage={sendMessage}
            attachments={attachments}
            onSelectFiles={onSelectFiles}
            isRecording={isRecording}
            onRecord={onRecord}
            onHideRecord={onHideRecord}
            isLoading={isLoading}
            removeAttachments={removeAttachments}
        />
    )
}

export default connect(
    ({ dialogs, attachments }) => ({
        dialogs,
        attachments: attachments.items,
    }),
    { ...messagesActions, ...attachmentsActions }
)(ChatInput)
