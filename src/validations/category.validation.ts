import type { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import logger from '../config/logger'
import { BadRequestException } from '../shared/badRequest.exeception'

const addCategory = async (req: Request, res: Response, next: NextFunction) => {
  const correctConditions = Joi.object({
    name: Joi.string().required().messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name is required',
      'any.required': 'Name is required'
    }),
    description: Joi.string().optional()
  })

  try {
    await correctConditions.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (err) {
    logger.error(err)
    throw new BadRequestException('Bad request')
  }
}

export const categoryValidation = {
  addCategory
}
