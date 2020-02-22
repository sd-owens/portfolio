// function requireHTTPS(req, res, next) {
//     // The 'x-forwarded-proto' check is for Heroku
//     if (
//       !req.secure &&
//       req.get('x-forwarded-proto') !== 'https' &&
//       process.env.NODE_ENV !== 'development'
//     ) {
//       res.redirect(`https://${req.get('host')}${req.url}`);
//     }
//     next();
//   }

const bodyParser = require('body-parser'),
      express    = require('express'),
      path       = require('path'),
      multer     = require('multer'),
      upload     = multer(),
      app        = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(`${__dirname}/public`));

app.enable('verbose errors');

app.get('/', (req, res) => {
    res.render('/index');
});

app.get('/index', (req, res) => {

    
    res.render('index.ejs', {});

    
});

app.post('/', upload.none(), (req, res) => {


    res.render('index.ejs', {});
    
});

app.get('/404', function(req, res, next){
  // trigger a 404 since no other middleware
  // will match /404 after this one, and we're not
  // responding here
  next();
});

app.get('/403', function(req, res, next){
  // trigger a 403 error
  var err = new Error('not allowed!');
  err.status = 403;
  next(err);
});

app.get('/500', function(req, res, next){
  // trigger a generic (500) error
  next(new Error('keyboard cat!'));
});

app.use(function(req,res){
  
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

// Generic error handling route
app.use(function(err, req, res, next){
  console.error(err.stack);

  res.status(err.status || 500);
  res.render('500', { error: err });
});

app.listen(process.env.PORT || app.get('port'), process.env.IP, async () => {
  
  console.log('Express started on http://localhost:' + app.get('port') +
              '; press Ctrl-C to terminate.');

});