import {config} from "dotenv"
config();
import { Configuration, OpenAIApi} from "openai"

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
// configuring our api key in OpenAIApi configuration...
const openai = new OpenAIApi(configuration);

openai.createChatCompletion({
	model:"gpt-3.5-turbo",
	messages:[{role:"user", content:"Hello, how are you doing?"}]
}).then(res=>{
	console.log(res.data.choices[0])
})

