// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {Configuration, OpenAIApi} from "openai";

export default async function handler(req, res) {
  if(req.method === 'POST') {
    const { tone, apiKey, description } = req.body


    const configuration = new Configuration({
      apiKey: apiKey || "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",
    })
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: `Write a poem about ${description} in the ${tone} tone, no extra words only poem`}],
    });
    const response = completion.data.choices[0].message
    res.status(200).json({ response: response })
  }
}
