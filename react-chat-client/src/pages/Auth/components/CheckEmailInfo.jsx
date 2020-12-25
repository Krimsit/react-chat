import React, { useEffect, useState } from "react"
import { Result, Button } from "antd"
import { InfoCircleTwoTone } from "@ant-design/icons"

import { userApi } from "utils/api"

import { Block } from "components"

const renderTextInfo = (hash, verified, history) => {
    if (hash) {
        if (verified) {
            return {
                status: "success",
                title: "Готово!",
                message: "Аккаунт успешно подтверждён",
            }
        } else {
            return {
                status: "error",
                title: "Ошибка!",
                message: "Ошибка при подтверждении аккаунта",
            }
        }
    } else {
        return {
            icon: <InfoCircleTwoTone style={{ fontSize: "70px" }} />,
            title: "Подтвердите аккаунт!",
            message:
                "Ссылка с подтверждением аккаунта отправлена на указанную почту",
        }
    }
}

const CheckEmailInfo = ({ location, history }) => {
    const [verified, setVerified] = useState(false)
    const hash = location.search.split("hash=")[1]
    const info = renderTextInfo(hash, verified)

    useEffect(() => {
        if (hash) {
            userApi.verifyHash(hash).then(({ data }) => {
                if ((data.status = "success")) {
                    setVerified(true)
                }
            })
        }
    })
    return (
        <Block>
            <Result
                status={info.status}
                icon={info.icon}
                title={info.title}
                subTitle={info.message}
                extra={
                    info.status === "success" &&
                    verified && (
                        <Button
                            type="primary"
                            onClick={() => history.push("/signin")}
                        >
                            Войти
                        </Button>
                    )
                }
            />
        </Block>
    )
}

export default CheckEmailInfo
