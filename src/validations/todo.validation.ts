import type { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

const getTodo = async (req: Request, res: Response, next: NextFunction) => {
  const correctConditions = Joi.object({
    id: Joi.number().required().message('id is required')
  })

  try {
    await correctConditions.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (err) {
    res.status(400).send(err)
  }
}

export const todoValidation = {
  getTodo
}
