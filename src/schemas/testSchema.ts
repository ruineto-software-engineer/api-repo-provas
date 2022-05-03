import joi from 'joi';

const testSchema = joi.object({
  name: joi.string().required(),
  pdf: joi.allow(null),
  categoryId: joi.number().required(),
  views: joi.number().required(),
  disciplineId: joi.number().required(),
  teacherId: joi.number().required()
});

export default testSchema;