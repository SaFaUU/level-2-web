// import Joi from 'joi'

// const userNameValidation = Joi.object({
//   firstName: Joi.string()
//     .required()
//     .trim()
//     .max(20)
//     .regex(/^[A-Z][a-z]*$/)
//     .message(
//       'First Name must start with a capital letter and contain only alphabets',
//     ),
//   middleName: Joi.string(),
//   lastName: Joi.string()
//     .required()
//     .trim()
//     .regex(/^[A-Za-z]+$/)
//     .message('Last Name must contain only alphabets'),
// })

// const guardianValidation = Joi.object({
//   fatherName: Joi.string().required(),
//   fatherOccupation: Joi.string().required(),
//   fatherContactNo: Joi.string().required(),
//   motherName: Joi.string().required(),
//   motherOccupation: Joi.string().required(),
// })

// const localGuardianValidation = Joi.object({
//   name: Joi.string().required(),
//   occupation: Joi.string().required(),
//   contactNo: Joi.string().required(),
//   address: Joi.string().required(),
// })

// const studentValidation = Joi.object({
//   id: Joi.string().required(),
//   name: userNameValidation.required(),
//   gender: Joi.string().valid('male', 'female').required(),
//   dateOfBirth: Joi.string(),
//   email: Joi.string().email().required(),
//   contactNo: Joi.string().required(),
//   emergencyContactNo: Joi.string().required(),
//   bloodGroup: Joi.string().valid(
//     'A+',
//     'A-',
//     'B+',
//     'B-',
//     'AB+',
//     'AB-',
//     'O+',
//     'O-',
//   ),
//   presentAdress: Joi.string().required(),
//   permanentAdress: Joi.string().required(),
//   guardian: guardianValidation.required(),
//   localGuardian: localGuardianValidation.required(),
//   profileImg: Joi.string(),
//   isActive: Joi.string().valid('active', 'blocked').default('active'),
// })

// export default studentValidation
