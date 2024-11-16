import { Request } from 'express'
import formidable, { File } from 'formidable'
import fs from 'fs'
import { UPLOAD_IMAGE_TEMP_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'

export const initFolder = () => {
  ;[UPLOAD_IMAGE_TEMP_DIR, UPLOAD_VIDEO_DIR].forEach((dir) => {
    if (!fs.existsSync(UPLOAD_IMAGE_TEMP_DIR)) {
      fs.mkdirSync(UPLOAD_IMAGE_TEMP_DIR, { recursive: true })
    }
  })
}

// tạo hàm handleUploadSingleImage: hàm nhận vào req ép req phải đi qua tấm
// lưới lọc tên là formidable thì đó lấy được các file là image
// sau đó return các file là image ra

export const handleUploadSingleImage = async (req: Request) => {
  // tạo lưới lọc từ formidable
  const form = formidable({
    uploadDir: UPLOAD_IMAGE_TEMP_DIR,
    maxFiles: 1, // tối đa 1 hình thôi
    maxFileSize: 300 * 1024, // tối đa 300kb
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
  return new Promise<File>((resolve, reject) => {
    form.parse(req, (error, fields, files) => {
      if (error) {
        return reject(new Error(error))
      }
      if (!files.image) {
        return reject(new Error('Image is empty'))
      }
      return resolve(files.image[0])
    })
  })
}

// viết hàm nhận vào fullFileName và chỉ lấy tên bỏ đuôi
export const getNameFromFileName = (fileName: string) => {
  const nameArr = fileName.split('.')
  nameArr.pop()
  return nameArr.join('-')
}