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
    // tạo product
    //trước tiên thì nhớ rằng product của ta sẽ không lưu media nên ta sẽ loại bỏ prop media
    const { medias, ...productInfo } = product // tách media ra khỏi product
    //và vì khi người dùng gữi lên thì thông tin chỉ là string nên ta phải chuyển
    //brand_id và category_id, ship_category_id về dạng ObjectId
    const result = await databaseService.Products.insertOne(
      new Product({
        ...productInfo,
        brand_id: new ObjectId(product.brand_id),
        category_id: new ObjectId(product.category_id),
        ship_category_id: new ObjectId(product.ship_category_id)
      })
    )
    result.insertedId
    // lưu media vào collection ProductMedia
    // maping các media thành dạng productMedia(có hình 13 mô tả)
    const mediasToSave = medias.map((media) => ({
      product_id: result.insertedId,
      media
    })) as ProductMedia[]
    await databaseService.ProductMedia.insertMany(mediasToSave)
    return result
  }

  async getProductById(id: string) {
    //aggregate là đoạn ta đã copy từ việc export
    await databaseService.Products.aggregate(
      [
        {
          $match: {
            _id: new ObjectId(id) //đưa vào id  product cần tìm
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
        $skip: (page - 1) * limit //cập nhật
      },
      {
        $limit: limit // cập nhật
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
