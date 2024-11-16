import { Router } from 'express'
import { serveImageController, serveVideoController } from '~/controllers/static.controllers'
const staticRouter = Router()

// staticRouter.use('/image', express.static(UPLOAD_IMAGE_DIR))
staticRouter.get('/image/:namefile', serveImageController)
staticRouter.get('/video/:namefile', serveVideoController)
// staticRouter.use('/video', express.static(UPLOAD_VIDEO_DIR))
export default staticRouter
