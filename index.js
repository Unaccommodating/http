import express from 'express'

const PORT = 5000;

const app = express()

app.use(express.json())

let users = [
    {
        name: 'Alex',
        age: 23
    },
    {
        name: 'Vika',
        age: 25
    },
    {
        name: 'Katya',
        age: 22
    }
]

let posts = ['Здоровье', 'Спорт', 'Хобби'];

let login = false;

app.get('/', (req, res) => {
    if(req.query.hasOwnProperty('user')) {
        res.status(200).json(users[req.query.user]);
    } else {
        res.status(400).json(req.query);
    }
})

app.get('/posts', (req, res) => {
    res.status(200).json(posts);
})


app.post('/publish', (req, res) => {
    if (login) {
        posts.push(req.body.name);
        res.status(200).json(`Пост о ${req.body.name} опубликован`);
    } else {
        res.status(300).redirect('/login');
    }
})

app.get('/login', (req, res) => {
    res.status(500).json('Войдите или авторизируйтесь!');
})


app.post('/login', (req, res) => {
    let {name, password} = req.fields;
    login = true;
    res.status(500).send(`Добро пожаловать!`);
})

app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
