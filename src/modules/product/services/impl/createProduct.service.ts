import { NextFunction, Request, Response } from 'express'
import { injectable } from 'tsyringe'
import { AppDataSource } from '../../../../config/data-source'
import { Products } from '../../../../entities/products.entity'
import { Categories } from '../../../../entities/categories.entity'
import { Images } from '../../../../entities/images.entity'
import { ICreateProductService } from '../createProduct.service.interface'
import { StatusCodes } from 'http-status-codes'
import { NotFoundException } from '../../../../shared/NotFound.exeception'
import { BadRequestException } from '../../../../shared/BadRequest.exeception'

interface ImageData {
  src: string
  alt?: string
}

@injectable()
export class CreateProductService implements ICreateProductService {
  public execute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { title, description, images, categoryId } = req.body

      if (!title || !description || !images || !categoryId) {
        next(new BadRequestException('Missing required fields'))
        return
      }

      const productSource = AppDataSource.getRepository(Products)
      const categorySource = AppDataSource.getRepository(Categories)
      const imageSource = AppDataSource.getRepository(Images)

      const category = await categorySource.findOne({
        where: {
          id: categoryId
        }
      })

      if (!category) {
        next(new NotFoundException('Category not found'))
        return
      }

      const product = new Products(
        0, // id will be generated
        description,
        category,
        [], // images will be added after
        0, // initial rating
        title,
        [] // initial reviews
      )

      const savedProduct = await productSource.save(product)

      const imageEntities = images.map(
        (imageData: ImageData, index: number) => {
          const image = new Images()
          image.src = imageData.src
          image.alt = imageData.alt || title
          image.position = index
          image.product = savedProduct
          return image
        }
      )

      await imageSource.save(imageEntities)

      res.status(StatusCodes.CREATED).json({
        message: 'Product created successfully',
        data: {
          ...savedProduct,
          images: imageEntities
        }
      })
    } catch (error) {
      console.error('Error creating product:', error)
      next(error)
    }
  }
}
