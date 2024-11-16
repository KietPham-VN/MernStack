import { Request } from 'express'
import formidable, { File } from 'formidable'
import fs from 'fs'
import { UPLOAD_IMAGE_TEMP_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'

export const initFolder = () => {
  ;[UPLOAD_IMAGE_TEMP_DIR, UPLOAD_VIDEO_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  })
}

// tạo hàm handleUploadImage: hàm nhận vào req ép req phải đi qua tấm
// lưới lọc tên là formidable thì đó lấy được các file là image
// sau đó return các file là image ra

export const handleUploadImage = async (req: Request) => {
  // tạo lưới lọc từ formidable
  const form = formidable({
    uploadDir: UPLOAD_IMAGE_TEMP_DIR,
    maxFiles: 4, // tối đa 4 hình thôi
    maxFileSize: 300 * 1024, // tối đa 300kb
    maxTotalFileSize: 4 * 300 * 1024,
    keepExtensions: true, // giữ lại đuôi file
    filter: ({ name, originalFilename, mimetype }) => {
      // name là file được gởi thông qua form <input name="fileNe">
      // originalFilename là tên gốc của file
      // mimetype là kiểu định dạng của file
      const valid = name === 'image' && Boolean(mimetype?.includes('image/'))
      if (!valid) {
        form.emit('error' as any, new Error('File type is invalid') as any)
      }
      return valid // true
    }
  })
  // có lưới rồi thì ép nó vô
  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (error, fields, files) => {
      if (error) {
        return reject(new Error(error))
      }
      if (!files.image) {
        return reject(new Error('Image is empty'))
      }
      return resolve(files.image)
    })
  })
}

export const handleUploadVideo = async (req: Request) => {
  // tạo lưới lọc từ formidable
  const form = formidable({
    uploadDir: UPLOAD_VIDEO_DIR,
    maxFiles: 1, // tối đa 4 hình thôi
    maxFileSize: 50 * 1024 * 1024, // tối đa 50mb
    keepExtensions: true, // giữ lại đuôi file
    filter: ({ name, originalFilename, mimetype }) => {
      // name là file được gởi thông qua form <input name="fileNe">
      // originalFilename là tên gốc của file
      // mimetype là kiểu định dạng của file
      const valid = name === 'video' && Boolean(mimetype?.includes('video/'))
      if (!valid) {
        form.emit('error' as any, new Error('File type is invalid') as any)
      }
      return valid // true
    }
  })
  // có lưới rồi thì ép nó vô
  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (error, fields, files) => {
      if (error) {
        return reject(new Error(error))
      }
      if (!files.video) {
        return reject(new Error('Video is empty'))
      }
      return resolve(files.video)
    })
  })
}

// viết hàm nhận vào fullFileName và chỉ lấy tên bỏ đuôi
export const getNameFromFileName = (fileName: string) => {
  const nameArr = fileName.split('.')
  nameArr.pop()
  return nameArr.join('-')
}