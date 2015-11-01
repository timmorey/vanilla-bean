module.exports = function(app) {
  var express = require('express');
  var articlesRouter = express.Router();

  var fixedData = [
    {
      id: 1,
      title: 'the title',
      author: 'me',
      content: 'this is some content',
      published: true,
      dateCreated: '2015-10-25',
      dateModified: null,
    }
  ];

  articlesRouter.get('/', function(req, res) {
    res.send({
      'article': fixedData
    });
  });

  articlesRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  articlesRouter.get('/:id', function(req, res) {
    for (var i = 0; i < fixedData.length; i++) {
      if (fixedData[i].id == req.params.id) {
        return res.send({
          'article': fixedData[i]
        });
      }
    }
  });

  articlesRouter.put('/:id', function(req, res) {
    res.send({
      'article': {
        id: req.params.id
      }
    });
  });

  articlesRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/articles', articlesRouter);
};
