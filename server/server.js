const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const login = require('./router/login');
const editemployeedetails = require('./router/editemployeedetails');
const editassetdetails = require('./router/editassetdetails');
const assetPurchase = require('./router/assetPurchase');
const buy = require('./router/buy'); // Ensure this line is present
const returned = require('./router/return'); // Ensure this line is present

const app = express();

app.use(bodyParser.json());
app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use('/editemployeedetails', editemployeedetails);
app.use('/editassetdetails', editassetdetails);
app.use('/login', login);
app.use('/assetPurchase', assetPurchase);
app.use('/buy', buy); // Ensure this line is present
app.use('/return', returned); // Ensure this line is present

app.get('/', (req, res) => {
  res.render('home');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
