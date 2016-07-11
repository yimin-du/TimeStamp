var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

app.get('/:timestamp', (req, res) => {
	var unixtime;
	var timestamp = req.params.timestamp;
	if(isNaN(timestamp)) {		// timestamp is a string
		unixtime = Date.parse(timestamp) / 1000;
		console.log(unixtime);
		
	} else {	// timestamp is number
		unixtime = timestamp;
		console.log(unixtime);
	}

	if(!isNaN(unixtime)) {	// unixtime is valid
		var date = new Date(unixtime * 1000).toDateString();
		var returnData = {
			unix: unixtime,
			natual: date
		}
	} else {
		var returnData = {
			unix: null,
			natual: null
		}
	}

	res.send(JSON.stringify(returnData));

});


app.use((err, req, res, next) => {
	if(err) {
		res.status(500).send("<p><b>Something wrong with your request. \nPlease check the url and try again!</b></p>");
	}
})



app.listen(port);