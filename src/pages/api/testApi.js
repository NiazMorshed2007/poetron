import {Configuration, OpenAIApi} from "openai";

export default async function handler(req, res) {
    if(req.method === 'POST') {
        const {apiKey} = req.body

        const configuration = new Configuration({
            apiKey: apiKey,
        })
        const openai = new OpenAIApi(configuration);

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: "Hello world"}],
        });
        const response = completion.data.choices[0].message
        if(response) {
        res.status(200).json({ response: response })
        }
    }
}