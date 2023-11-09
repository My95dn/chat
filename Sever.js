let express = require('express')
let app = express()
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
let cors = require('cors')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
let sever = require('http').Server(app)
let io = require('socket.io')(sever)
const multer = require('multer')
app.use(cors({
    origin: 'http://chat-my95dn.vercel.app'|| 'http://chat-git-master-my95dn.vercel.app' || 'http://chat-eight-wine.vercel.app',
    methods: 'GET,POST',
    credentials: true,
}));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ storage: storage });
let array = []
let subArray = []
let pathnameImage = ''
let id = ''
let images = []
const port = process.env.PORT || 8080;
sever.listen(port, () => {
    console.log('hello')
})

io.on('connection', (socket) => {
    console.log('connection')
    socket.on('client-send-data', (data) => {

        socket.Username = data

        if (subArray.includes(data)) {
            socket.emit('already exist')
        } else {
            subArray.push(data)
            array.push({ user: data, avatar: pathnameImage })
            io.sockets.emit('sever-send-data-allUser', array)

            socket.emit('sever-send-name', { name: socket.Username, imgAvatar: pathnameImage })
            console.log('top array', array)
        }
    })

    socket.on('client-send-data-chat', (data) => {


        io.sockets.emit('sever-send-data-client', data)
        console.log(data)
    })
    socket.on('client-send-id', (data) => {
        console.log('datassss', data)
        if (data && pathnameImage !== '') {
            socket.emit('sever-send-images', { pathValue: images, id: data })
            console.log('array', array)
        }
    })

    socket.on('disconnect', () => {

        let ss = array.filter(item => item.user !== socket.Username)
        array = ss
        io.sockets.emit('sever-send-data-allUser', array)
    })




})

app.post('/profile', upload.single('avatar'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }




    console.log(req.file)
    let pathImage = req.file.filename
    pathnameImage = `/uploads/${pathImage}`
    let imagesUser = { id: id, avatar: pathnameImage }
    images.push(imagesUser)
    res.render('view', { image: pathnameImage })
})
app.get('/', (req, res) => {
    res.render('view')
})





