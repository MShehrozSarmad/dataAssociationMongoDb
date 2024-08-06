const express = require('express');
const userModel = require('./models/user');
const postModel = require('./models/post');

const app = express();

app.get('/', (req, res) => {
    res.send('hy!');
})

app.get('/create/user', async (req, res) => {
    const user = await userModel.create({
        username: 'sheri',
        email: 'sheri@me.com',
        age: 22
    })
    res.send(user);
})

app.get('/create/post', async (req, res) => {
    const post = await postModel.create({
        postData : "hy! iits testing post",
        user: '66b2442465979a8a511e59ac'
    });
    const user = await userModel.findOne({_id: '66b2442465979a8a511e59ac'});
    user.posts.push(post._id);
    await user.save();
    res.send({post, user});
})

app.listen(3000)