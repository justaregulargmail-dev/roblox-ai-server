const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

app.post("/chat", async (req, res) => {
    try {
        const message = req.body.message;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + process.env.API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "deepseek/deepseek-chat",
                messages: [
                    { role: "user", content: message }
                ]
            })
        });

        const data = await response.json();

        res.json({
            reply: data.choices[0].message.content
        });

    } catch (err) {
        res.json({ reply: "Hata oluştu" });
    }
});

app.get("/", (req, res) => {
    res.send("Server çalışıyor");
});

app.listen(3000, () => console.log("Server başladı"));
