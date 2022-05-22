const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECT_STRING,
    {useNewUrlParser: true,
    useUnifiedTopology: true});

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      
    });


module.exports.download = (req,res)=> {
    const collection = db.collection('images.files');
    const collectionChunks = db.collection('images.chunks');
    const fileId = req.body.fileName
    console.log(fileId)
    collection.find({filename: fileId}).toArray(function(err, docs){        
        console.log(docs)
        if(err){        
          return res.json({
           title: 'File error', 
           message: 'Error finding file', 
            error: err.errMsg});      
        }
      if(!docs || docs.length === 0){        
        return res.json({
         title: 'Download Error', 
         message: 'No file found'});      
       }else{
      
       //Retrieving the chunks from the db          
       collectionChunks.find({files_id : docs[0]._id})
         .sort({n: 1}).toArray(function(err, chunks){          
           if(err){            
              return res.json({
               title: 'Download Error', 
               message: 'Error retrieving chunks', 
               error: err.errmsg});          
            }
          if(!chunks || chunks.length === 0){            
            //No data found            
            return res.json({
               title: 'Download Error', 
               message: 'No data found'});          
          }
        
        let fileData = [];          
        for(let i=0; i<chunks.length;i++){            
          //This is in Binary JSON or BSON format, which is stored               
          //in fileData array in base64 endocoded string format               
         
          fileData.push(chunks[i].data.toString('base64')); 
          
        }
        
         //Display the chunks using the data URI format          
         let finalFile = 'data:' + docs[0].contentType + ';base64,' 
              + fileData.join('');
                    
          res.json({
             title: 'Image File', 
             message: 'Image loaded from MongoDB GridFS', 
             imgurl: finalFile});
         });
          
        }          
       });
}
