import { Request, Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import mediasServices from '~/services/medias.services'

export const uploadImageController = async (
  req: Request, //
  res: Response
) => {
  const url = await mediasServices.handleUploadImage(req)
  res.status(HTTP_STATUS.OK).json({
    message: 'Upload image successfully',
    url
  })
}
export const uploadVideoController = async (
  req: Request, //
  res: Response
) => {
  const url = await mediasServices.handleUploadVideo(req)
  res.status(HTTP_STATUS.OK).json({
    message: 'Upload video successfully',
    url
  })
}
