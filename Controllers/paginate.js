const bookModel = require("../models/book");

const getPagination = (page, size) => {

  //1.offset: quantity of items to skip
  //2.limit: quantity of items to fetch
  const limit = size ? +size : 8; // limit = size
  const offset = page ? page * limit : 0; // offset = page * size

  return { limit, offset };
};

//Model.paginate([query], [options], [callback])
//Returns promise

// Retrieve all Book from the database.
findAllBook = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  bookModel
    .paginate({}, { offset, limit })
    .then((data) => {
      res.send({
        totalItems: data.totalDocs,
        books: data.docs,
        totalPages: data.totalPages,
        prevPage: data.prevPage,
        nextPage: data.nextPage,
        currentPage: data.page,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while getting books",
      });
    });
};
module.exports = { findAllBook };
