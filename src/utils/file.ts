import path from 'path'
import fs from 'fs'

export const initFolder = () => {
  // lưu đường đẫn đến thư mục sẽ lưu file
  const uploadsFolderPath = path.resolve('uploads')
  // truy vết đường link này xem có đến được thư mục nào không
  // nếu tìm không được thì tạo mới
  if (!fs.existsSync(uploadsFolderPath)) {
    fs.mkdirSync(uploadsFolderPath, { recursive: true })
  }
}
