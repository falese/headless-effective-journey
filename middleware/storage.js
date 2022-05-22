const util = require('util');
const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECT_STRING,
    {useNewUrlParser: true,
    useUnifiedTopology: true});

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
  
    });


const storage = new GridFsStorage({
    db: mongoose.connection,
    file: (req, file) =>{
        const imageMatch = ["image/png", "image/jpeg"];

        if (imageMatch.indexOf(file.mimetype)=== -1){
            const filename = `${Date.now()}--ms-weel-doc-${file.originalname}`;
            return filename;
        }
        return {
            bucketName: "images",
        filename:`${Date.now()}--ms-weel-doc-${file.originalname}`
        
        };
    }
});


var uploadFile = multer({storage: storage}).single("file");
var uploadFilesMiddleware = util.promisify(uploadFile);
module.exports=uploadFilesMiddleware;