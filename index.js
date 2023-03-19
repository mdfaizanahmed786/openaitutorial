require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const ejs=require('ejs');
const PORT=process.env.PORT || 3000;

const app=express();
app.set("view engine", "ejs");
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use('public', express.static('public', ))

app.get("/", (req, res)=>{
	res.render("index", {data: ''})
})

app.post("/ask-gpt", (req, res)=>{
	const configuration = new Configuration({
		apiKey: process.env.API_KEY,
	});
	const openAI = new OpenAIApi(configuration);
	

	if(req.body.message===''){
		return res.render("index", {data: 'Please enter a message'});
	}
	


	openAI.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages:[{role: "user", content: req.body.message}],
	}).then((data)=>{
		

		res.render("index", {data: data.data.choices[0].message.content});
	}).catch((err)=>{
		console.log(err);
		res.render("index", {data: 'Error'});
	})


})

app.listen(PORT, ()=>{
console.log("Listening on this port")
})

