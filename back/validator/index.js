exports.userSingupValidator = (req, res, next) => {
  req
    .check('name', 'El nombre es requerido')
    .notEmpty()
    .isLength({
      max: 32,
    })
    .matches(/[a-zA-Z\sñáéíóú]/);
  req
    .check('lastname', 'El apellido es requerido')
    .notEmpty()
    .isLength({
      max: 32,
    })
    .matches(/[a-zA-Z\sñáéíóú]/);
  req
    .check('email', 'El email debe tener entre 3 y 32 caracteres')
    .matches(/.+\@.+\..+/)
    .withMessage('El email debe tener @')
    .isLength({
      min: 4,
      max: 32,
    });
  req
    .check('phone', 'El numero de telefono es requerido')
    .notEmpty()
    .isLength({
      max: 10,
    })
    .matches(/^[0-9]+$/);
  req
    .check('document_number', 'El numero de documento es requerido')
    .notEmpty();
  req.check('password', 'La contraseña es requerida');
  req
    .check('password')
    .isLength({
      min: 6,
    })
    .withMessage('La contraseña debe tener al menos 6 caracteres')
    .matches(/\d/)
    .withMessage('La contraseña debe tener al menos un numero');

  const errors = req.validationErrors();

  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];

    console.log('firstError', firstError);
    return res.status(400).json({ error: firstError });
  }
  next();
};
