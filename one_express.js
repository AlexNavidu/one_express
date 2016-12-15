var express = require('express');

var app = express();

// установка механизма представления handlebars
var handlebars = require('express-handlebars')
  .create({ defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// добавляем модуль fortune.js
var fortune = require('./lib/fortune.js');

app.set('port', process.env.PORT || 3000);

// ПО static
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('home');
});

// в данном маршруте мы использвали getFortune из модуля.
app.get('/about', function(req, res) {
  res.render('about', { fortune: fortune.getFortune() });
});

// Обобщенный обработчик 404 (промежуточное ПО)
app.use(function(req, res, next) {
  res.status(404);
  res.render('404');
});

// Обработчик ошибки 500 (промежуточное ПО)
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.send('500');
});

app.listen(app.get('port'), function() {
  console.log('Express запущен на http://localhost:' +
  app.get('port') + '; нажмите Ctrl+C для заверщения. ');
});
