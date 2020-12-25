const actions = {
    setAttachments: (items) => ({
        type: "ATTACHMENTS:SET_ITEM",
        payload: items,
    }),
    removeAttachments: (file) => ({
        type: "ATTACHMENTS:REMOVE_ITEM",
        payload: file,
    }),
}

export default actions
