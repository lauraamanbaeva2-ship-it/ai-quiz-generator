import express from 'express';
import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';

const app = express();
app.use(express.json());
app.use(express.static('public'));

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/generate-questions', async (req, res) => {
    const { topic, grade } = req.body;
    
    const prompt = `Сабақ тақырыбы: "${topic}", Сынып: ${grade}. 
Оқушылардың сын тұрғысынан ойлауын дамытуға арналған 3 терең талқылау сұрағын және 3 ситуациялық тапсырманы Қазақ тілінде құрастырып бер.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        res.json({ result: response.text });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Сервер запущен: http://localhost:3000'));