const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { create } = require('express-handlebars')
const mongoose = require('mongoose');
const AnimalModel = require('./model');
const app = express();
const port = 3000;

const hbs = create()

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './client/views');

app.use((req, res, next) => {
    console.log(' handeling a request to ' + req.path)
    next();
})

app.use(express.static(path.join(__dirname, '/client/public')))

app.use(bodyParser.json())

// define a index route that rendrrs the index template
app.get('/', async (req, res) => {
    const animals = await AnimalModel.find({}).lean()
    res.render('index', {
        animals
    })
})

// definign a get route
app.get('/animals', async (req, res) => {
    const animals = await AnimalModel.find({}).lean()
    res.send(animals)
})

// defining a post route
app.post('/animals', async (req, res) => {
    // req body is where user data will be stored
    await AnimalModel.create(req.body)
    res.json({
        msg: "data added successfully"
    })
})

// define a put route
app.put('/animals', async (req, res) => {
    const id = req.body.id

    if( !id ) {
        res.status(401).json({
            msg: "missing name in the request"
        })
    }

    await AnimalModel.updateOne({
        _id: id
    }, {
        ...req.body
    })

    res.json({
        msg: "data updated successfully"
    })
})

// define a delete route
app.delete('/animals/:id', async (req, res) => {
    const id = req.params.id

    await AnimalModel.deleteOne({
        _id: id
    })

    res.json({
        msg: "data deleted successfully"
    })

})

app.get('/edit/:id', async (req, res) => {
    const id = req.params.id
    const animal = await AnimalModel.findOne({_id: id }).lean();
    console.log(animal)
    res.render('edit', {
        animal
    })

})

app.get('/animal/name/:name', async (req, res) => {
    const name = req.params.name

    if( !name ) {
        res.status(401).json({
            msg: "missing name in the request"
        })
    }

    const animal = await AnimalModel.find({name: name })

    res.json({
        msg: "found the animal",
        animal: animal
    })
})



app.listen(port, async () => {
    await mongoose.connect("mongodb+srv://admin:brownFox@commit.optonw0.mongodb.net/zoo?retryWrites=true&w=majority")
    console.log('listening on port ' + port);
})