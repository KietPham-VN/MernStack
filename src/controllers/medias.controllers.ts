import { Request, Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import formidable from 'formidable'
import path from 'path'

export const uploadSingleImageController = async (
  req: Request, //
  res: Response
) => {
  // là đường dẫn mà mình mong muốn lưu vào
  // console.log(path.resolve('uploads'));
  const form = formidable({
    maxFiles: 1, // tối đa 1 file
    maxFileSize: 300 * 1024, // 300kb
    keepExtensions: true,
    uploadDir: path.resolve('uploads')
  })
  // ép request phải đi qua cái lưới
  form.parse(req, (err, fields, files) => {
    if (err) {
      throw err
    } else {
      // xữ lý file
      res.status(HTTP_STATUS.OK).json({
        message: 'Upload image successfully'
      })
    }
  })
}
