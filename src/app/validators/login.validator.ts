import Joi from 'joi'

export default Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().alphanum().min(3).required()
})
