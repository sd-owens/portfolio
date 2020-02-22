const   express    = require('express'),
        router     = express.Router(),
        // async      = require('async'),
        multer     = require('multer'),
        upload     = multer();


// Root Route
router.get('/', (req, res) => {
    res.render('/index');
});

router.get('/index', (req, res) => {

    
    res.render('index.ejs', {});

    
});

router.post('/', upload.none(), (req, res) => {


    res.render('index.ejs', {});
    
});

// 404 Error Route
router.get('/404', function(req, res, next){
  next();
});

// 403 Error Route
router.get('/403', function(req, res, next){
  var err = new Error('not allowed!');
  err.status = 403;
  next(err);
});

// 500 (Generic) Error Route
router.get('/500', function(req, res, next){
  next(new Error('keyboard cat!'));
});

router.use(function(req,res){
  
    res.status(404);
    res.format({
  
      html: function () {
        res.render('404', { url: req.url })
      },
      json: function () {
        res.json({ error: 'Not found' })
      },
      default: function () {
        res.type('txt').send('Not found')
      }
    })
  });
  
// 500 (Generic) Error Route
 router.use(function(err, req, res, next){
    console.error(err.stack);
  
    res.status(err.status || 500);
    res.render('500', { error: err });
  });

module.exports = router;