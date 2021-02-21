const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Task = require('../models/task');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.taskById = (req, res, next, id) => {
  Task.findById(id).populate('category').exec((err, task) => {
    if (err || !task) {
      return res.status(400).json({
        error: 'La tarea no se encontro',
      });
    }
    req.task = task;
    next();
  });
};

exports.read = (req, res) => {
  req.task.photo = undefined;
  return res.json(req.task);
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    console.log('fields', fields);

    if (err) {
      return res.status(400).json({
        error: 'La imagen no se subio',
      });
    }

    // se validan la variables
    const {
      title,
      description,
      state,
      userRef
    } = fields;
    if (
      !title ||
      !description ||
      !state,
      !userRef
    ) {
      return res.status(400).json({
        error: 'Todos los campos son requeridos',
      });
    }
    let task = new Task(fields);

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: 'La imagen es muy pesada',
        });
      }
      task.photo.data = fs.readFileSync(files.photo.path);
      task.photo.contentType = files.photo.type;
    }

    task.save((err, result) => {
      console.log('err',err);
      console.log('result',result);
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

exports.remove = (req, res) => {
  let task = req.task;
  task.remove((err, deletedTask) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'Tarea eliminada',
    });
  });
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'La imagen no se subio',
      });
    }

    // se validan la variables
    const {
      title,
      description,
      state,
    } = fields;
    if (
      !title ||
      !description ||
      !state
    ) {
      return res.status(400).json({
        error: 'Todos los campos son requeridos',
      });
    }
    let task = req.task;
    task = _.extend(task, fields);

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: 'La imagen es muy pesada',
        });
      }
      task.photo.data = fs.readFileSync(files.photo.path);
      task.photo.contentType = files.photo.type;
    }

    task.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

exports.listCategories = (req, res) => {
  Product.distinct('category', {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: 'Categoria no encontrada',
      });
    }
    res.json(categories);
  });
};

/**
 * sell / arrival
 * by sell = /tasks?sortBy=sold&order=desc&limit=4
 * by arrival = /tasks?sortBy=createdAt&order=desc&limit=4
 * if not params are sent, then all task returned
 */

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Task.find()
    .select('-photo')
    // .populate('user')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, tasks) => {
      if (err) {
        return res.status(400).json({
          error: 'Producto no encontrado',
        });
      }
      res.json(tasks);
    });
};

exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : 'desc';
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Task.find(findArgs)
    .select('-photo')
    .populate('userRef')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: 'Productos no encontrados',
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

exports.photo = (req, res, next) => {
  if (req.task.photo.data) {
    res.set('Content-Type', req.task.photo.contentType);
    return res.send(req.task.photo.data);
  }
  next();
};

exports.listSearch = (req, res) => {
  const query = {};
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: 'i' };
    if(req.query.category && req.query.category != 'Todas') {
      query.category = req.query.category;
    }
    Task.find(query, (err, tasks) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(tasks)
    }).select('-photo')
  }
};
