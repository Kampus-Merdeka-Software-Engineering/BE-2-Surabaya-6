const express = require('express');
const authrouters = require('./routes/auth');
const detailroutes = require('./routes/detail')
const cors = require('cors');
// const { PrismaClient } = require('@prisma/client')
const bodyParser = require('body-parser');


const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
// app.get('/', (req,res) => {
//     res.send ('hello ha');
// })
app.use('/api/logres', authrouters);
app.use('/product', detailroutes)
// const auth = require('./routes/auth');


app.listen(3000, () => {
  console.log(` app listening on port 3000}`)
});

// app.get('/', (req, res) => {
//     res.render("index.html")

// });

// app.get('/register:id', (req, res) => {

// });
// app.get('/logres', (req, res) => {
//     res.render("logres.html")

// });

// app.get('/register', async (req, res) => {
//     const { keyword, search} = req.query ;

//     const result = await prisma.users.findMany();
//     res.json({
//         message:'data telah didapatkan',
//         data: result
//     })
// });


// app.post('/register',async (req,res) => {
//     const{ name, email, password} =req.body

//     const result = await prisma.users.create({
//         data: {
//             name,
//             email, 
//             password
//         }
//     })

//     res.json({
//         message: 'create user is success',
//         data: result
//     })
// })



// app.use(express.json());
// app.use('/', require('./routes/pages'));
// app.use('/auth', require('./routes/auth'));
