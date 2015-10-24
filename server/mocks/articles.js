module.exports = function(app) {
  var express = require('express');
  var articlesRouter = express.Router();

  articlesRouter.get('/', function(req, res) {
    res.send({
      'article': []
    });
  });

  articlesRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  articlesRouter.get('/:id', function(req, res) {
    res.send({
      'article': {
        id: req.params.id,
        title: 'the title',
        abstract: 'abstract',
        content: '{{#bp-article}}this is some content{{/bp-article}}',
        author: 'me',
        published: true,
        dateCreated: '2015-10-25',
        dateModified: null,
      }
    });
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
