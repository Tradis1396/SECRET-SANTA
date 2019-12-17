const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const mongoclient = mongodb.MongoClient;
const url = "mongodb://localhost:27017";
const bcrypt = require('bcryptjs');

const saltRounds = 10;
var jsonDataArray = [];

app.use(cors());
app.use(bodyParser.json());

app.post("/registration", function (req, res) {
    mongoclient.connect(url, function (err, client) {
        if (err) throw err;

        var db = client.db("santaDB");
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(req.body.password, salt, function (err, hash) {
                console.log(hash);
                console.log(req.body.email, "email")
                var datas = {
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                    phone: req.body.phone,
                    role: "admin",
                    child: null,
                    parent: null
                }

                db.collection("users").insertOne(datas, function (err, data) {

                    if (err) throw err;
                    console.log(data);
                    res.json({
                        "message": "registered"
                    });
                    client.close();
                });

            });

        });
    });
});

app.post('/login', function (req, res) {
    mongoclient.connect(url, function (err, client) {
        if (err) throw err;
        var db = client.db('santaDB');
        var dbResult = db.collection('users').findOne({ email: req.body.email });

        dbResult.then(function (userData) {
            console.log(userData.password);

            bcrypt.compare(req.body.password, userData.password, function (err, hasResult) {
                if (hasResult == true) {
                    console.log(hasResult);
                    res.json({
                        message: "pass success"
                    });
                }
                else {
                    res.status(403).json({
                        message: "pass wrong"
                    });
                }
            });
            client.close();
        });
        dbResult.catch(function () {
            console.log("catch")
        })
    });
});

app.get('/userData', function (req, res) {
    mongoclient.connect(url, function (err, client) {
        if (err) throw err;

        var db = client.db('santaDB');

        var userCursor = db.collection('users').find().toArray();
        userCursor.then(function (data) {
            console.log(data, "data");
            jsonDataArray = data;
            var randomArray = function (array) {
                var copyArray = array;
                shuffledArray = copyArray.sort(() => .5 - Math.random());
                console.log(shuffledArray);
                return true;
            }
            randomArray(jsonDataArray);

            var parent = function (shuffle) {
                return shuffle.map((_ele, index, arr) => {

                    _ele.child = arr[(index + 1) % arr.length]._id;

                    arr[(index + 1) % arr.length].parent = _ele._id;


                    console.log(shuffledArray, "shuffled");

                });
            };
            parent(shuffledArray);


            res.json(shuffledArray);

        });
        client.close();

    })

});

app.get('/playerData', function (req, res) {
    mongoclient.connect(url, function (err, client) {
        if (err) throw err;
        var db = client.db('santaDB');
        var dbResult = db.collection('users').findOne({ email: req.body.email });

        dbResult.then(function (userData) {
            console.log(userData);
            res.json({
                message: "player success"
            });
        });
        client.close();
    });
});


app.listen(3000);

