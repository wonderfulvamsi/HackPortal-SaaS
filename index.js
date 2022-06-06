const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const util = require('util');
const { uploadFile, getFile } = require('./controller/awss3');

const delimgatserver = util.promisify(fs.unlink);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './assets/')
    },
    filename: (req, file, cb) => {
        cb(null, (file.originalname))
    }
})

const upload = multer({ storage });

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         methods: "GET,POST,PUT,DELETE",
//         credentials: true,
//     })
// );


app.post('/filetos3', upload.single('filetos3'), async (req, res) => {
    try {
        //console.log(req.files);
        //console.log(req.body.text);
        //console.log(req.body);

        //uploading it to s3...
        //LOL!! do not fuck with the naming conventions of aws credentials else it wont work for some werid reason 
        //it says AWS SDK by default searches for those names in the env 

        //console.log(req.file);
        try {

            let link = await uploadFile(req.file);
            //console.log(req.file.path)
            await delimgatserver(req.file.path)
            res.status(200).json(link.Location);
        }

        catch (err) {
            res.status(200).send(err);
        }


    }
    catch (err) {
        console.log(err)
    }
})

app.get('/getfile/:filename', async (req, res) => {
    //console.log(req.params.filename);
    const readStream = await getFile(req.params.filename);
    readStream.pipe(res)
})

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const userRouter = require('./routes/user');
const eventRouter = require('./routes/event');

app.use('/user', userRouter);
app.use('/event', eventRouter);

app.get('/', (req, res) => {
    res.status(200).send("Updated HackPortal Server is Up & Running!")
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});