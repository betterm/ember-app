/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var booksRouter = express.Router();

  var books = [
    {
      id:1,
      title: 'Hamlet',
      description: "Hamlet books",
      author: 'William Shakespeare'
    },
    {
      id: 2,
      title: "One Flew Over",
      description: "Boisterous",
      author: "Ken Kesey"
    }
  ];
  booksRouter.get('/', function(req, res) {
    var data = [];
    books.forEach(function(item) {
      data.push({
        type: 'books',
        id: item.id.toString(),
        attributes: {
          title: item.title,
          description: item.description,
          author: item.author
        }
      });
    });
    res.set('Content-Type', 'application/vnd.api+json');
    res.send({
      data: data
    });
  });

  booksRouter.post('/', function(req, res) {
    var newBook = req.body.data.attributes;
    var newId = books.length + 1;
    var bookTitles = [];
    books.forEach(function(item) {
      bookTitles.push(item.title);
    });

    if (bookTitles.indexOf(newBook.title) !== -1) {
      res.status(400).send({
        errors: [
          {
            source: { pointer: '/data/attributes/title' },
            detail: 'must be unique'
          }
        ]
      });
    } else {
      books.push({
        title: newBook.title,
        description: newBook.description,
        author: newBook.author,
        id: newId
      });
      res.set('Content-Type', 'application/vnd.api+json');
      res.send({
        data: {
          type: 'books',
          id: newId,
          attributes: newBook
        }
      });
    }
  });

  booksRouter.get('/:id', function(req, res) {
    res.send({
      'books': {
        id: req.params.id
      }
    });
  });

  booksRouter.patch('/:id', function(req, res) {
    var bookAttrs = req.body.data.attributes;
    var bookId = req.param('id');
    var bookTitles = [];

    books.forEach(function(item) {
      if (item.id !== parseInt(bookId)) {
        bookTitles.push(item.title);
      }
    });
    if (bookTitles.indexOf(bookAttrs.title) !== -1) {
      res.status(400).send({
        errors: [
          {
            source: { pointer: '/data/attributes/title' },
            detail: 'must be unique'
          }
        ]
      });
    } else {
      books.forEach(function(item) {
        if (item.id === parseInt(bookId)) {
          item.title = bookAttrs.title;
          item.description = bookAttrs.description;
          item.author = bookAttrs.author;
        }
      });
      res.send({
        data: {
          type: 'books',
          id: bookId,
          attributes: bookAttrs
        }
      });
    }
  });

  booksRouter.delete('/:id', function(req, res) {
    var bookId = req.param('id');
    for (var i=0; i < books.length; i++ ) {
      if (parseInt(bookId) === books[i].id) {
        books.splice(i, 1);
        break;
      }
    }
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/books', require('body-parser').json());
  app.use('/api/books', booksRouter);
};
