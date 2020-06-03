var PORT 		= process.env.PORT || 5000
var express 	= require("express");
var pg 			= require('pg');
var path		= require('path');
var bodyParser  = require('body-parser');
var fs 			= require('fs');
var app     	= express();

const sgMail 	= require('@sendgrid/mail');
sgMail.setApiKey("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");


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(__dirname + '/public' ));


app.get('/',function(request, response){
	response.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/3d',function(request, response){
	response.sendFile(path.join(__dirname+'/3d.html'));
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

pathToAttachment = `${__dirname}/SAAF_GASBAG_PRODUCT_CATALOG_DOMESTIC_MKT_VER_1.0.pdf`;
attachment = fs.readFileSync(pathToAttachment).toString("base64");

app.post('/_send_quote', function(request, response) {
	var name = request.body.name;
	var email = request.body.email;
  	var subject = "SAAF Catalogue"; 
  	var message = request.body.message;

  	const text = "View this message in html"
	const html = "Catalogue is in attachments in pdf format";
	const msg = {
	  	to: email,
	  	from: 'contact@saafenergy.in',
	  	subject: subject,
	  	text: text,
	  	html: html,
	  	attachments: [
		    {
		      content: attachment,
		      filename: "attachment.pdf",
		      type: "application/pdf",
		      disposition: "attachment"
		    }
  		]
	};s
	sgMail.send(msg, function(err, json){
    	if(err) { 
    		console.log(err);
    	}
    	response.redirect('/');
	});
});

app.listen(PORT);



