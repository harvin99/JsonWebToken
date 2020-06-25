require('dotenv').config()

const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()

app.use(express.json())

const posts = [
    {   
        username : 'Jim',
        title : 'Post 1'
    },
    {   
        username : 'Sam',
        title : 'Post 2'
    },
    {   
        username : 'Bob',
        title : 'Post 3'
    }
]

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})
function authenticateToken (req, res, next){
    const authHeader = req.headers['authorization']
    //console.log(authHeader)
    //Get token that is created by jwt and make sure have authHeader
    const token = authHeader && authHeader.split(' ')[1]
    //console.log(authHeader.split(' ')[1])
    if(token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=> {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}
app.listen(3000)