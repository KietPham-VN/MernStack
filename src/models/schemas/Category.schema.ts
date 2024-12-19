import { ObjectId } from 'mongodb'

interface CategoryType {
  _id?: ObjectId
  name: string
  desc: string
}

export default class Category {
  _id: ObjectId
  name: string
  desc: string
  constructor(category: CategoryType) {
    this._id = category._id || new ObjectId()
    this.name = category.name
    this.desc = category.desc
  }
}
