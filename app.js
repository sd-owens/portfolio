require('dotenv').config();

function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (
    !req.secure &&
    req.get('x-forwarded-proto') !== 'https' &&
    process.env.NODE_ENV !== 'development'
  ) {
    res.redirect(`http://${req.get('host')}${req.url}`);
  }
  next();
}

const bodyParser = require('body-parser'),
      express    = require('express'),
      path       = require('path'),
      app        = express();


// REQUIRE ROUTES
const indexRoutes = require('./routes/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.set('port', 3000);

app.use(requireHTTPS);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(`${__dirname}/public`));


app.enable('verbose errors');

app.use('/', indexRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, async () => {
  
  console.log('Express started on http://localhost:' + process.env.PORT +
              '; press Ctrl-C to terminate.');

});