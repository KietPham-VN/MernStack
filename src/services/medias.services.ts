import { MEDIA_TYPE } from './../constants/enums'
import { Request } from 'express'
import sharp from 'sharp'
import { UPLOAD_IMAGE_DIR } from '~/constants/dir'
import { getNameFromFileName, handleUploadImage, handleUploadVideo } from '~/utils/file'
import fs from 'fs'
import { Media } from '~/models/Other'

class MediasServices {
  async handleUploadImage(req: Request) {
    const files = await handleUploadImage(req)
    const result = await Promise.all(
      files.map(async (file) => {
        const newFilename = getNameFromFileName(file.newFilename) + '.jpg'
        const newPath = UPLOAD_IMAGE_DIR + '/' + newFilename
        await sharp(file.filepath).jpeg().toFile(newPath)
        fs.unlinkSync(file.filepath)
        const url: Media = {
          url: `http://localhost:3000/static/image/${newFilename}`,
          type: MEDIA_TYPE.Image
        }
        return url
      })
    )
    return result
  }
  async handleUploadVideo(req: Request) {
    const files = await handleUploadVideo(req)
    const result = await Promise.all(
      files.map(async (file) => {
        const url: Media = {
          url: `http://localhost:3000/static/video/${file.newFilename}`,
          type: MEDIA_TYPE.Video
        }
        return url
      })
    )
    return result
  }
}

const mediasServices = new MediasServices()
export default mediasServices
