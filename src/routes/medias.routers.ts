import { Router } from 'express'
import { uploadSingleImageController } from '~/controllers/medias.controllers'
import { wrapAsync } from '~/utils/handlers'
const mediaRouter = Router()

mediaRouter.post('/upload-image', wrapAsync(uploadSingleImageController))
export default mediaRouter
