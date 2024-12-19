import databaseService from './database.services'
import Product from '~/models/schemas/Product.schema'
import { ObjectId } from 'mongodb'
import ProductMedia from '~/models/schemas/ProductMedia.schema'
import { CreateProductReqBody } from '~/models/requests/product.request'
import { PRODUCT_MESSAGES } from '~/constants/messages'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'

class ProductService {
  async createProduct(product: CreateProductReqBody) {
    const { medias, ...productInfo } = product

    const result = await databaseService.Products.insertOne(
      new Product({
        ...productInfo,
        brand_id: new ObjectId(product.brand_id),
        category_id: new ObjectId(product.category_id),
        ship_category_id: new ObjectId(product.ship_category_id)
      })
    )
    result.insertedId

    const mediasToSave = medias.map((media) => ({
      product_id: result.insertedId,
      media
    })) as ProductMedia[]
    await databaseService.ProductMedia.insertMany(mediasToSave)
    return result
  }

  async getProductById(id: string) {
    await databaseService.Products.aggregate(
      [
        {
          $match: {
            _id: new ObjectId(id)
          }
        },
        {
          $lookup: {
            from: 'product_media',
            localField: '_id',
            foreignField: 'product_id',
            as: 'medias_infor'
          }
        },
        {
          $project: {
            medias: {
              $map: {
                input: '$medias_infor',
                as: 'media',
                in: '$$media.media'
              }
            },
            _id: 1,
            name: 1,
            quantity: 1,
            price: 1,
            description: 1,
            rating_number: 1,
            brand_id: 1,
            origin: 1,
            volume: 1,
            weight: 1,
            height: 1,
            width: 1,
            sold: 1,
            status: 1,
            category_id: 1,
            ship_category_id: 1
          }
        }
      ],
      { maxTimeMS: 60000, allowDiskUse: true }
    ).toArray()
    const result = await databaseService.Products.find({ _id: new ObjectId(id) }).toArray()
    if (result.length === 0)
      throw new ErrorWithStatus({
        message: PRODUCT_MESSAGES.PRODUCT_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    return result[0]
  }

  async getAllProduct(query: { page: number; limit: number }) {
    const { page, limit } = query
    const result = await databaseService.Products.aggregate([
      {
        $skip: (page - 1) * limit
      },
      {
        $limit: limit
      },
      {
        $lookup: {
          from: 'product_media',
          localField: '_id',
          foreignField: 'product_id',
          as: 'medias_infor'
        }
      },
      {
        $project: {
          medias: {
            $map: {
              input: '$medias_infor',
              as: 'media',
              in: '$$media.media'
            }
          },
          _id: 1,
          name: 1,
          quantity: 1,
          price: 1,
          description: 1,
          rating_number: 1,
          brand_id: 1,
          origin: 1,
          volume: 1,
          weight: 1,
          height: 1,
          width: 1,
          sold: 1,
          status: 1,
          category_id: 1,
          ship_category_id: 1
        }
      }
    ]).toArray()
    return result
  }
}

const productService = new ProductService()
export default productService
