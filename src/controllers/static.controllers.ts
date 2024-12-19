import { Request, Response } from 'express'
import path from 'path'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
import HTTP_STATUS from '~/constants/httpStatus'
import fs from 'fs'
import mime from 'mime-types'

export const serveImageController = (req: Request, res: Response) => {
  const { namefile } = req.params
  return res.sendFile(path.resolve(UPLOAD_IMAGE_DIR, namefile), (error) => {
    if (error) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Image not found' })
    }
  })
}

export const serveVideoController = (req: Request, res: Response) => {
  const { namefile } = req.params
  const range = req.headers.range
  console.log(range)

  const videoPath = path.resolve(UPLOAD_VIDEO_DIR, namefile)
  if (!range) {
    res.status(HTTP_STATUS.BAD_REQUEST).send('Require range header')
  } else {
    const videoSize = fs.statSync(videoPath).size
    const CHUNK_SIZE = 10 ** 6
    const start = Number(range.replace(/\D/g, ''))
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1)
    const contentLength = end - start + 1
    const contentType = mime.lookup(videoPath) || 'video/*'
    const headers = {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': contentType
    }
    res.writeHead(HTTP_STATUS.PARTIAL_CONTENT, headers)
    const videoStreams = fs.createReadStream(videoPath, { start, end })
    videoStreams.pipe(res)
  }
}
