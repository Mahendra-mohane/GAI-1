const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/generate', async (req, res) => {
    try {
        const contentType = req.query.contentType;
        const keyword = req.query.keyword;
        let prompt;

        switch (contentType) {
            case 'shayari':
                prompt = `Shayari about ${keyword}`;
                break;
            case 'joke':
                prompt = `Joke about ${keyword}`;
                break;
            case 'story':
                prompt = `Story about ${keyword}`;
                break;
            default:
                prompt = keyword;
        }

        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt,
            max_tokens: 100,
            temperature: 0.7,
            n: 1
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const content = response.data.choices[0].text.trim();
        res.json({ content });
    } catch (error) {
        console.error('Error:', error.response.data);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
