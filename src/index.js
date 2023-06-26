const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis')


/// app init
const app = express();
const port = process.env.PORT || 4000;

// connect redis
const REDIS_PORT = 6379
const REDIS_HOST = 'redis'
const redisUrl = `redis://${REDIS_HOST}:${REDIS_PORT}`
const redisClient = redis.createClient({url:redisUrl});
redisClient.on('error',(err)=> console.log('Redis Client Error' , err));
redisClient.on('connect',()=> console.log('Connected To Redis ...'));
redisClient.connect()


const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 27017;
const DB_HOST = 'mongo';
const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`

mongoose.connect(URI)
    .then(()=>console.log('connsected to database'))
    .catch(e=>console.log('failed connect to DB',e));

app.get('/' , (req,res)=> {
    redisClient.set('products' , 'Products...')
    res.send('<h1>Hello Tresmerrge App from AWS EC2, using Docker Hub!</h1>')})

app.get('/data' , async(req,res)=> {
    const product = await redisClient.get('products' )
    res.send(`<h1>Hello From Docker Course HI DEvoo  hi every one!</h1> <h2>${product} </h2>` )})

app.listen(port , ()=> console.log(`App is listenning on port ${port}`));