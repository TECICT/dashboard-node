var router = require('express').Router();
var mongoose = require('mongoose');
var Acute = mongoose.model('Acute');
var Bench = mongoose.model('Bench');
var JobOffer = mongoose.model('JobOffer');
var Starter = mongoose.model('Starter');
var Stopper = mongoose.model('Stopper');
var auth = require('./auth');

// preload the params
router.param('acuteId', function(req, res, next, id) {
  Acute.findOne({ _id: id})
    .then(function (acute) {
      if (!acute) { return res.sendStatus(404); }

      req.acute = acute;

      return next();
    }).catch(next);
});

router.param('benchId', function(req, res, next, id) {
  Bench.findOne({ _id: id})
    .then(function (bench) {
      if (!bench) { return res.sendStatus(404); }

      req.bench = bench;

      return next();
    }).catch(next);
});

router.param('jobOfferId', function(req, res, next, id) {
  JobOffer.findOne({ _id: id})
    .then(function (jobOffer) {
      if (!jobOffer) { return res.sendStatus(404); }

      req.jobOffer = jobOffer;

      return next();
    }).catch(next);
});

router.param('starter', function(req, res, next, id) {
  Starter.findOne({ _id: id})
    .then(function (starter) {
      if (!starter) { return res.sendStatus(404); }

      req.starter = starter;

      return next();
    }).catch(next);
});

router.param('stopper', function(req, res, next, id) {
  Stopper.findOne({ _id: id})
    .then(function (stopper) {
      if (!stopper) { return res.sendStatus(404); }

      req.stopper = stopper;

      return next();
    }).catch(next);
});

// get all the lists
router.get('/', function(req, res) {
  Promise.all([
    Acute.find(),
    Bench.find(),
    JobOffer.find(),
    Starter.find(),
    Stopper.find(),
  ]).then(function(results){
    return res.json({"acutes": results[0],"bench": results[1],"joboffers": results[2],"starters": results[3],"stoppers": results[4]});
  })
});

// Acute
router.get('/acute', function(req, res) {
  Acute.find(function(err, acute) {
    return res.json(acute);
  });
});

router.post('/acute', function(req, res) {
  var newAcute = new Acute(req.body.acute);
  console.log(newAcute);
  console.log(req.body);
  return newAcute.save(function(err, acute) {
    return res.json({acute: acute.toJSON()});
  })
});

router.put('/acute/:acuteId', function(req, res) {
  Acute.findByIdAndUpdate(req.params.acuteId, req.body.acute, {new: true}, function (err, acute) {
      if (err) return res.status(500).send("There was a problem updating the acute.");
      res.status(200).send(acute);
  });
});

router.delete('/acute/:acuteId', function(req, res) {
  return req.acute.remove().then(function() {
    return res.sendStatus(204);
  })
});

// Bench
router.get('/bench', function(req, res) {
  Bench.find(function(err, bench) {
    return res.json(bench);
  });
});

router.post('/bench', function(req, res) {
  var newBench = new Bench(req.body.bench);
  return newBench.save(function(err, bench) {
    return res.json({bench: bench.toJSON()});
  })
});

router.put('/bench/:benchId', function(req, res) {
  Acute.findByIdAndUpdate(req.params.benchId, req.body.bench, {new: true}, function (err, bench) {
      if (err) return res.status(500).send("There was a problem updating the bench.");
      res.status(200).send(bench);
  });
});

router.delete('/bench/:benchId', function(req, res) {
  return req.bench.remove().then(function() {
    return res.sendStatus(204);
  })
});

// JobOffer
router.get('/jobOffer', function(req, res) {
  JobOffer.find(function(err, jobOffer) {
    return res.json(jobOffer);
  });
});

router.post('/jobOffer', function(req, res) {
  var newJobOffer = new JobOffer(req.body.jobOffer);
  return newJobOffer.save(function(err, jobOffer) {
    return res.json({jobOffer: jobOffer.toJSON()});
  })
});

router.put('/jobOffer/:jobOfferId', function(req, res) {
  Acute.findByIdAndUpdate(req.params.jobOfferId, req.body.jobOffer, {new: true}, function (err, jobOffer) {
      if (err) return res.status(500).send("There was a problem updating the jobOffer.");
      res.status(200).send(jobOffer);
  });
});

router.delete('/jobOffer/:jobOfferId', function(req, res) {
  return req.jobOffer.remove().then(function() {
    return res.sendStatus(204);
  })
});

// Starter
router.get('/starter', function(req, res) {
  Starter.find(function(err, starter) {
    return res.json(starter);
  });
});

router.post('/starter', function(req, res) {
  var newStarter = new Starter(req.body.starter);
  return newStarter.save(function(err, starter) {
    return res.json({starter: starter.toJSON()});
  })
});

router.put('/starter/:starterId', function(req, res) {
  Acute.findByIdAndUpdate(req.params.starterId, req.body.starter, {new: true}, function (err, starter) {
      if (err) return res.status(500).send("There was a problem updating the starter.");
      res.status(200).send(starter);
  });
});

router.delete('/starter/:starterId', function(req, res) {
  return req.starter.remove().then(function() {
    return res.sendStatus(204);
  })
});

// Stopper
router.get('/stopper', function(req, res) {
  Stopper.find(function(err, stopper) {
    return res.json(stopper);
  });
});

router.post('/stopper', function(req, res) {
  var newStopper = new Stopper(req.body.stopper);
  return newStopper.save(function(err, stopper) {
    return res.json({stopper: stopper.toJSON()});
  })
});

router.put('/stopper/:stopperId', function(req, res) {
  Acute.findByIdAndUpdate(req.params.stopperId, req.body.stopper, {new: true}, function (err, stopper) {
      if (err) return res.status(500).send("There was a problem updating the stopper.");
      res.status(200).send(stopper);
  });
});

router.delete('/stopper/:stopperId', function(req, res) {
  return req.stopper.remove().then(function() {
    return res.sendStatus(204);
  })
});

module.exports = router;