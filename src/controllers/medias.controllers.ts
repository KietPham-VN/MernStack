import { Request, Response } from 'express'
import { UPLOAD_IMAGE_DIR } from '~/constants/dir'
import HTTP_STATUS from '~/constants/httpStatus'
import { getNameFromFileName, handleUploadSingleImage } from '~/utils/file'
import sharp from 'sharp'

export const uploadSingleImageController = async (
  req: Request, //
  res: Response
) => {
  const file = await handleUploadSingleImage(req)
  const newFilename = getNameFromFileName(file.newFilename) + '.jpg'
  // đường dẫn đến file mới sẽ là
  const newPath = UPLOAD_IMAGE_DIR + '/' + newFilename
  // dùng sharp để nén ảnh
  await sharp(file.filepath).jpeg().toFile(newPath)
  // setup đường link
  const url = `http://localhost:3000/static/image/${newFilename}`
  res.status(HTTP_STATUS.OK).json({
    message: 'Upload image successfully',
    url
  })
}
