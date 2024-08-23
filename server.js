const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const multer = require('multer');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});

app.use(express.static('public'));

app.use('/uploads',express.static('uploads'));

app.post('/upload', upload.single('file'), (req, res) =>{
    const fileUrl = `/uploads/${req.file.filename}`;
    io.emit('fileUploaded', {filename: req.file.originalname, url: fileUrl});
    res.send('File uploaded successfully');
});

server.listen(3000, () =>{
    console.log('Server started on http://localhost:3000');
});