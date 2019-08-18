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

app.get('/sitemap',function(request, response){
	response.sendFile(path.join(__dirname+'/sitemap.xml'));
});

app.post('/_send_email', function(request, response) {
	var name = request.body.name;
	var email = request.body.email;
  	var subject = request.body.subject; 
  	var message = request.body.message;

  	const text = "View this message in html"
	const html = "NAME:" + name + "<br>" + message + "<br>" + "EMAIL: " + email;
	const msg = {
	  	to: 'contact@saafenergy.in',
	  	from: 'contact@saafenergy.in',
	  	subject: subject,
	  	text: text,
	  	html: html
	};
	sgMail.send(msg, function(err, json){
    	if(err) { 
    		console.log(err);
    	}
    	response.redirect('/');
	});
});

app.listen(PORT);



