const express = require('express')
const app = express()
const fs = require('fs') 
var cors = require('cors')
app.use(cors())
const port = 3000
var bodyParser = require('body-parser')
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/recordPose', (req,res) => {
	var name = req.body
	console.log("aaaayaaaa mai aayayayyy", name)
	let data = JSON.stringify(name);
	fs.writeFile('Output.txt', data, (err) => { 
	    if (err) throw err; 
	}) 
});

app.listen(port, '0.0.0.0', () => console.log(`Example app listening on port ${port}!`))