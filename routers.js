const express = require('express');
const router = express.Router();
const Heroes = require('./models/heroes');

router.get('/heroes', function(req, res){
  Heroes.find({}).then(function(heroes){
    res.send(heroes);
  });
});

router.get('/heroes/:id', function(req, res){
  Heroes.findOne({_id: '59a3dec6ad4b5109d0c75f4d'}).then(function(hero){
    res.send(hero);
  })
});

router.post('/heroes', function(req, res, next){
  const {name, role} = req.body;

  //save to mongodb
  Heroes.create(req.body)
    .then(function(result){
      res.send(result);
    })
    .catch(next)
});

router.put('/heroes/:id', function(req, res){
  Heroes.findOneAndUpdate({_id: req.params.id}, req.body).then(function(result){
    Heroes.findOne({_id: req.params.id}).then(function(hero){
      res.send(hero);
    });
  });
});

router.delete('/heroes/:id', function(req, res){
  Heroes.findOneAndRemove({_id: req.params.id}).then(function(result){
    res.send(result);
  });
});

module.exports = router;
