exports.taskValidator = (req, res, next) => {
    req
      .check('title', 'El titulo es requerido')
      .notEmpty()
      .isLength({
        max: 32,
      })
      .matches(/[a-zA-Z\sñáéíóú]/);
    req
      .check('description', 'La descripcion es requerida')
      .notEmpty()
      .isLength({
        max: 2000,
      })
      .matches(/[a-zA-Z\sñáéíóú]/);
    req
      .check('state', 'El estado de la tarea es requerido')
      .notEmpty()
      .isLength({
        max: 2,
      })
      .matches(/^[0-9]+$/);
  
    const errors = req.validationErrors();
  
    if (errors) {
      const firstError = errors.map((error) => error.msg)[0];
  
      console.log('firstError', firstError);
      return res.status(400).json({ error: firstError });
    }
    next();
  };