var express = require('express');
var mysql = require('mysql');
var bodyParser = require("body-parser");
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
    host: '172.18.18.16',
    user: 'safe',
    password: 'Safe@123',
    database: 'safe'
});

// app.get('/', (req, res) => {
//     connection.query('SELECT gap_type, gap_count, date(created_at) as date from sc_gap_data where created_at>CURRENT_DATE-365 order by created_at,gap_type', (err, result) => {
//         // console.log(result);
//         let gapData = [];

//         for (var i = 0; i < (result.length - 4); i += 5) {
//             let dailyData = {};
//             console.log(result[i]);
//             let j = i;
//             dailyData['date'] = result[i]['date'];
//             for (let j = i; j < i + 5; j++) {
//                 dailyData[result[j]['gap_type']] = result[j]['gap_count'];
//             }
//             gapData.push(dailyData);
//         }
//         console.log(gapData);
//     })

// })

app.get("/", function (req, res) {
    // Find count of users in DB
    var q = "SELECT COUNT(*) AS count FROM users";
    connection.query(q, function (err, results) {
        if (err) throw err;
        var count = results[0].count;
        res.render("home", {
            count: count
        });
    });
});

app.post("/register", function (req, res) {
    var person = {
        email: req.body.email
    };
    connection.query('INSERT INTO users SET ?', person, function (err, result) {
        if (err) throw err;
        res.redirect("/");
    });
});

app.listen(8080, function () {
    console.log("Server running on 8080!");
});