import express from "express"

import cloudinary from "../core/cloudinary"

import { UploadFileModel } from "../models"

class UploadController {
    create = (req: any, res: express.Response) => {
        const file = req.file
        const userId = req.user._id

        cloudinary.v2.uploader
            .upload_stream(
                { resource_type: "auto" },
                (err: any, result: any) => {
                    if (err) {
                        throw new Error(err)
                    }

                    const fileData = {
                        filename: result.original_name,
                        size: result.bytes,
                        ext: result.format,
                        url: result.url,
                        user: userId,
                    }

                    const uploadedFile = new UploadFileModel(fileData)

                    uploadedFile
                        .save()
                        .then((fileObj: any) => {
                            res.json({
                                status: "success",
                                file: fileObj,
                            })
                        })
                        .catch((err: any) => {
                            res.json({
                                status: "error",
                                message: err,
                            })
                        })
                }
            )
            .end(file.buffer)
    }

    delete = (req: any, res: any) => {}
}

export default UploadController
