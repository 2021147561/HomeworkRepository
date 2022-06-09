const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const ejs = require('ejs');
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const db = new sqlite3.Database('./product.db');
const fs = require("fs");

app.set('views', __dirname);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/'));

app.get("/", (req, res) => {
    db.all('select * from product', (err, rows) => {
		res.render('index', {renderdata: rows});
	});
});

app.get("/login", (req, res) => {
    res.render('login', {});
});

app.get("/signup", (req, res) => {
    res.render('signup', {});
});

app.get("/product/:product_id", (req, res) => {
    db.all('select * from product where product_id=' + String(req.params.product_id).slice(1), (err, row) => {
        res.render('detail', {data: row});
    });
});

app.post("/product/:product_id", (req, res) => {
    // comments
	const dJSON = fs.readFileSync("comment.json").toString();
	const comments = JSON.parse(dJSON);
	const num = parseInt(String(req.params.product_id).slice(1));
	
	comments[num]["c" + String(Object.keys(comments[num]).length + 1)] = req.body.newComment;

	fs.writeFileSync("comment.json", JSON.stringify(comments));
});

const port = 3000;
app.listen(port, function () {
    console.log('server on! https://localhost:' + port);
});
