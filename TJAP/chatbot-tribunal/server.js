const express = require("express");
const cors = require("cors");
const OpenAI = require("openai"); 

const OPENAI_API_KEY = 'tá doido?';

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

if (!OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY environment variable.");
}

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/chat/send', async (req, res) => {
    const { text } = req.body;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: text }],
        });

        res.json({
            response: completion.choices[0].message.content,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to process request" });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
