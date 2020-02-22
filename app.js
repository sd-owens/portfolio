const bodyParser = require('body-parser'),
      express    = require('express'),
      path       = require('path'),
      app        = express();


// REQUIRE ROUTES
const indexRoutes = require('./routes/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(`${__dirname}/public`));

app.enable('verbose errors');

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

app.use('/', indexRoutes);

app.listen(process.env.PORT || app.get('port'), process.env.IP, async () => {
  
  console.log('Express started on http://localhost:' + app.get('port') +
              '; press Ctrl-C to terminate.');

});