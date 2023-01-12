const express = require("express");
const multer = require("multer");
const app = express();

const Posts = require('./api/models/posts');
const postData = new Posts();




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`)
    }
})





const getExt = (mimetype) =>{
    switch(mimetype){
        case "image/png":
            return '.png';
        case "image/jpeg":
            return '.jpg'
    }
}

var upload = multer({ storage: storage })

app.use(express.json());

app.use((rq,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log("Strato intermedio")
    next();
})

app.use('/uploads', express.static('uploads'));


app.get("/api/posts", (req,res) => {
    res.status(200).send(postData.get());
})

app.get("/api/posts/:postId", (req,res) => {
    const postId = req.params.postId;
    const listPost = postData.get();
    const foundPost = listPost.find((post) => post.id == postId);
    if(foundPost){
        res.status(200).send(foundPost);
    }else{
        res.status(404).send("Not Found");
    }
    
})

app.post("/api/posts",upload.single("postImage"), (req,res)=>{
    
    if(req.file){
        console.log(req.file.path);
        const newPost = {
            "id": `${Date.now()}`,
            "title": req.body.title,
            "content": req.body.content,
            "postImage": req.file.path.replace("\\", "/"),
            "createdDate": `${Date.now()}`
        }
        postData.add(newPost);
        res.status(201).send(newPost);
    }else{
        res.status(406).send("Image Required");
    }


})




app.listen(3000, () => {
    console.log("Server on http://localhost:3000")
})