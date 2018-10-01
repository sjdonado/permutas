const nodemailer = require('nodemailer');
const config = require('./../config/');

const {
  pagination,
  sort,
  populate,
} = config;

const parsePaginationParams = ({
  limit = pagination.limit,
  page = pagination.page,
  skip = pagination.skip,
}) => ({
  limit: parseInt(limit, 10),
  page: parseInt(page, 10),
  skip: skip ? parseInt(skip, 10) : ((page - 1) * limit),
});

const parseSortParams = ({
  sortBy = sort.sortBy.default,
  direction = sort.direction.default,
}, fields) => {
  const whitelist = {
    sortBy: [
      ...Object.getOwnPropertyNames(fields),
      ...sort.sortBy.fields,
    ],
    direction: sort.direction.options,
  };
  return {
    sortBy: whitelist.sortBy.includes(sortBy) ? sortBy : sort.sortBy.default,
    direction: whitelist.direction.includes(direction) ? direction : sort.direction.default,
  };
};

const compactSortToStr = (sortBy, direction) => {
  const dir = direction === sort.direction.default ? '-' : '';
  return `${dir}${sortBy}`;
};

const filterByNested = (params, referecesNames) => {
  const paramsNames = Object.getOwnPropertyNames(params);
  const populateNames = referecesNames.filter(item => !paramsNames.includes(item));

  return {
    filters: params,
    populate: populateNames.join(' '),
  };
};

const populateToObject = (populateNames, virtuals = {}) => {
  const virtualsNames = Object.getOwnPropertyNames(virtuals);
  return populateNames.map((item) => {
    let options = {};
    if (virtualsNames.includes(item)) {
      options = {
        limit: populate.virtuals.limit,
        sort: compactSortToStr(populate.virtuals.sort, populate.virtuals.direction),
      };
    }
    return {
      path: item,
      options,
    };
  });

};

const sendForgotPassEmail = (address, callback) => {
  const randomPassword = Math.random().toString(36).slice(-8);

  nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      logger: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
      }
    });

    let mailOptions = {
      from: '"Permutas" <permutasdocentes@gmail.com>',
      to: `${address}`,
      subject: 'Permutas recuperar contraseña',
      text: `Contraseña temporal: ${randomPassword}`,
      html: `Contraseña temporal: ${randomPassword}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      callback(randomPassword);
    });
  });
}

module.exports = {
  parsePaginationParams,
  parseSortParams,
  compactSortToStr,
  filterByNested,
  populateToObject,
  sendForgotPassEmail,
};
