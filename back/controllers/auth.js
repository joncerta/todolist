const User = require('../models/user');
const jwt = require('jsonwebtoken'); // Generacion del token
const expressJwt = require('express-jwt'); // Se utiliza para la autorizacion
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'Usuario no encontrado por este email. Por favor resgistrate.',
      });
    }
    // Si el usuario es encontrado y el pass concuerda
    // creamos la autenticacion
    if (!user.authenticate(password)) {
      res.status(401).json({
        error: 'Email y contraseña no coinciden',
      });
    }
    // Se crea el token a base del id del usuario y el hash secreto
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    const date = new Date(Date.now() + 90000000)
    // Se crea una cookie con ese token que debe expirar en cierto tiempo
    res.cookie('t', token, { expire: date });
    const { _id, name, lastname, email, role } = user;
    return res.json({
      token,
      user: { _id, name, lastname, email, role },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie('t');
  res.json({ message: 'Se cerro sesión exitosamente' });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'auth',
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: 'Acceso denegado',
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: 'Acceso denegado no eres administrador',
    });
  }
  next();
};
