import { Router } from 'express'
import { serveImageController } from '~/controllers/static.controllers'
const staticRouter = Router()

// staticRouter.use('/image', express.static(UPLOAD_IMAGE_DIR))
staticRouter.get('/image/:namefile', serveImageController)

export default staticRouter
