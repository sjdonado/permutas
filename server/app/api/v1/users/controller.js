const {
  Model,
  fields,
} = require('./model');

const {
  signToken,
} = require('./../../../middlewares/auth');

const {
  parsePaginationParams,
  parseSortParams,
  compactSortToStr,
} = require('./../../../utils/');

exports.id = (req, res, next) => {
  if (req.decoded) {
    Model.findById(req.decoded.id)
      .then((doc) => {
        if (doc) {
          req.doc = doc;
          next();
        } else {
          res.json({
            sucess: false,
            message: `${Model.modelName} not found`,
          });
        }
      })
      .catch((err) => {
        next(new Error(err));
      });
  } else {
    next();
  }
};

exports.externalId = (req, res, next, id) => {
  Model.findById(id)
    .then((doc) => {
      if (doc) {
        req.doc = doc;
        next();
      } else {
        res.json({
          sucess: false,
          message: `${Model.modelName} not found`,
        });
      }
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.all = (req, res, next) => {
  const {
    query,
    doc,
  } = req;

  const {
    limit,
    skip,
    page,
  } = parsePaginationParams(query);
  const {
    sortBy,
    direction,
  } = parseSortParams(query, fields);
  const sort = compactSortToStr(sortBy, direction);

  const filters = [{ _id: { $ne: doc.id }, ...query }];

  const count = Model.countDocuments();
  const all = Model
    .find({ $or: filters })
    .sort(sort)
    .skip(skip)
    .limit(limit);

  Promise.all([count.exec(), all.exec()])
    .then((data) => {
      const [total = 0, docs = []] = data;
      const pages = Math.ceil(total / limit);

      res.json({
        success: true,
        items: docs,
        meta: {
          limit,
          skip,
          total,
          page,
          pages,
          sortBy,
          direction,
        },
      });
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.create = (req, res, next) => {
  const {
    body,
  } = req;

  const document = new Model(body);
  document.save()
    .then((doc) => {
      res.status(201);

      const token = signToken({
        id: doc.id,
      });

      res.json({
        success: true,
        item: doc,
        meta: {
          token,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      next(new Error(err));
    });
};

exports.read = (req, res, next) => {
  const {
    doc,
  } = req;

  res.json({
    success: true,
    item: doc,
  });
};

exports.update = (req, res, next) => {
  const {
    doc,
    body,
  } = req;

  Object.assign(doc, body);

  doc.save()
    .then((updated) => {
      res.json({
        success: true,
        item: updated,
      });
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.delete = (req, res, next) => {
  const {
    doc,
  } = req;

  doc.remove()
    .then((removed) => {
      res.json({
        success: true,
        item: removed,
      });
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.signin = (req, res, next) => {
  const {
    body,
  } = req;

  const {
    email,
    password,
  } = body;

  Model
    .findOne({
      email,
    })
    .exec()
    .then((user) => {
      console.log(user);
      if (user && user.verifyPassword(password)) {
        const token = signToken({
          id: user.id,
        });
        res.json({
          success: true,
          item: user,
          meta: {
            token,
          },
        });
      } else {
        next();
      }
    })
    .catch((error) => {
      next(new Error(error));
    });
};
