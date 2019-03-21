var PORT 		= process.env.PORT || 5000
var express 	= require("express");
var pg 			= require('pg');
var path		= require('path');
var bodyParser  = require('body-parser');
var app     	= express();

const sgMail 	= require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(__dirname + '/public' ));


app.get('/',function(request, response){
	response.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/contact',function(request, response){
	response.sendFile(path.join(__dirname+'/contact.html'));
});

app.post('/_send_email', function(request, response) {
	var name = request.body.name;
  	var email = request.body.email;
  	var subject = request.body.subject; 
  	var message = request.body.message;

  	const text = "View this message in html"
	const html = "Name:" + name + "<br>" + message + "<br>";
	const msg = {
		  to: 'vig9295@gmail.com',
		  from: email,
		  subject: subject,
		  text: text,
		  html: html
		};
		sgMail.send(msg);
	response.redirect('/');
});

app.listen(PORT);



