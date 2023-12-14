const express = require('express');
const { url } = require('inspector');
const multer = require('multer');
const path = require('path');
let filename =""
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './images');
  },
  filename(req, file, cb) {
    filename=Date.now() + path.extname(file.originalname)
    cb(null, filename);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post('/', upload.array('files',10), (req, res) => {
  let urls = [];

  req.files.map((item,key)=>{
    urls.push('http://localhost:5000/uploads/'+item.filename)
  })
  res.send(urls)


});

module.exports = router;