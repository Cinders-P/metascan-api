var express = require('express');
var stylus = require('stylus');
var path = require('path');
var app = express();
var multer = require('multer');

// var storage = multer.diskStorage({
//   destination:function (req, file, cb) {
//     cb(null, __dirname + '/uploads')
// },
//   filename: function (req, file, cb) {
//       cb(null, file.originalname);
//   }
// });
// var upload = multer({ storage: storage });

//We don't actually want to keep the file so we don't define any proper storage parameters.
var upload = multer({ dest: null });

app.enable('trust proxy');

app.use(stylus.middleware({
	src: __dirname + '/public',
}));

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.post('/metadata', upload.single('file'), (req, res) => {
	console.log("POST received.");
	res.json({
		"size":req.file.size
	});
	res.end();
});

app.use(express.static(__dirname + '/public'));
app.use('/',  (req, res) => {
	//homepage
	res.render('index');
});

app.listen(process.env.PORT || 3000, () => {
	console.log("Server started on port 3000.");
});
