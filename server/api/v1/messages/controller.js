const {
  Model,
  fields,
  references,
} = require('./model');

const referencesNames = [
  ...Object.getOwnPropertyNames(references),
];

const {
  parsePaginationParams,
  parseSortParams,
  compactSortToStr,
  filterByNested,
} = require('./../../../utils/');

exports.id = (req, res, next, id) => {
  Model
    .findById(id)
    .populate(referencesNames.join(' '))
    .exec()
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
    params = {},
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
  const {
    filters,
    populate,
  } = filterByNested(params, referencesNames);

  const globalFilters = Object.assign(filters, { kind: 'global' });

  const count = Model.count();
  const all = Model
    .find(globalFilters)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate(populate.split(' '));

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

exports.createGlobal = (req, res, next) => {
  const {
    body,
    doc,
  } = req;

  if (doc.isAdmin()) {
    Object.assign(body, { ownerId: doc.id, kind: 'global' });

    const document = new Model(body);
    document.save()
      .then((response) => {
        res.status(201);
        res.json({
          success: true,
          item: response,
        });
      })
      .catch((err) => {
        next(new Error(err));
      });
  } else {
    const message = 'Forbidden';
    res.status(403);
    res.json({
      success: false,
      message,
    });
  }
};

exports.create = (req, res, next) => {
  const {
    body,
    doc,
  } = req;
  const userDoc = doc.toObject();

  const info = `Nombre: ${userDoc.fullname}
  CC: ${userDoc.dni}
  Correo electrónico: ${userDoc.email}
  Teléfono fijo: ${userDoc.phone}
  Celular: ${userDoc.mobilePhone}
  Departamento: ${userDoc.department}
  Municipio: ${userDoc.municipality}
  Vereda o Corregimiento: ${userDoc.village}
  Institución Educativa: ${userDoc.school}
  Escalafón: ${userDoc.educationalLadder}
  Área de nombramiento: ${userDoc.appointment}`;

  Object.assign(body, { ownerId: doc.id, text: `Te ha contactado el usuario ${userDoc.username}. ${info}` });

  const document = new Model(body);
  document.save()
    .then((response) => {
      res.status(201);
      res.json({
        success: true,
        item: response,
      });
    })
    .catch((err) => {
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
