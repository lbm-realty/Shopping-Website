const multer = require('multer');
const path = require('path')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// const upload = multer({ 
//     storage: storage,
//     fileFilter: function(req, file, cb){
//         checkFileType(file, cb);
//     } 
// }).single('image');

// function checkFileType(file, cb){
//     const filetypes = /jpeg|jpg|png/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
//     const mimetype = filetypes.test(file.mimetype);

//     if(mimetype && extname){
//         return cb(null, true)
//     }
//     else{
//         cb('Error: Images only!')
//     }
// }

module.exports = upload;