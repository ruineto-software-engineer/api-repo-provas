import joi from 'joi';

const testSchema = joi.object({
  name: joi.string().required(),
  pdfUrl: joi.string().uri().required(),
  categoryId: joi.number().required(),
  views: joi.number().required(),
  disciplineId: joi.number().required(),
  teacherId: joi.number().required()
});

export default testSchema;