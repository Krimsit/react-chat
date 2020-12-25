import React from "react"
import { Button, Modal, Select, Input, Form } from "antd"
import { TeamOutlined, FormOutlined } from "@ant-design/icons"

import { Dialogs } from "containers"

const { Option } = Select
const { TextArea } = Input

const Sidebar = ({
    user,
    onShow,
    onClose,
    visible,
    users,
    onChangeInput,
    inputValue,
    onSearch,
    onSelectUser,
    onModalOk,
    isSearching,
    onChangeTextArea,
    messageText,
    selectedUserId,
}) => {
    const options = users.map((user) => (
        <Option key={user._id}>{user.fullname}</Option>
    ))
    return (
        <div className="chat__sidebar">
            <div className="chat__sidebar-header">
                <div className="">
                    <TeamOutlined />
                    <span>Список диалогов</span>
                </div>
                <Button
                    onClick={onShow}
                    type="link"
                    shape="circle"
                    icon={<FormOutlined />}
                />
            </div>

            <div className="chat__sidebar-dialogs">
                <Dialogs userId={user && user._id} />
            </div>
            <Modal
                title="Создать диалог"
                visible={visible}
                footer={[
                    <Button key="back" onClick={onClose}>
                        Закрыть
                    </Button>,
                    <Button
                        disabled={!messageText}
                        key="submit"
                        type="primary"
                        loading={isSearching}
                        onClick={onModalOk}
                    >
                        Создать
                    </Button>,
                ]}
            >
                <Form>
                    <Form.Item label="Введите имя или почту пользователя">
                        <Select
                            showSearch
                            value={inputValue}
                            placeholder="Введите имя или почту пользователя"
                            style={{ width: "100%" }}
                            onSearch={onSearch}
                            onChange={onChangeInput}
                            notFoundContent={"Пользователь не найден"}
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            filterOption={false}
                            onSelect={onSelectUser}
                        >
                            {options}
                        </Select>
                    </Form.Item>
                    {selectedUserId && (
                        <Form.Item label="Введите сообщение">
                            <TextArea
                                placeholder=""
                                autoSize={{ mixRows: 3, maxRows: 10 }}
                                onChange={onChangeTextArea}
                                value={messageText}
                            />
                        </Form.Item>
                    )}
                </Form>
            </Modal>
        </div>
    )
}

Sidebar.defaultProps = {
    users: [],
}

export default Sidebar
