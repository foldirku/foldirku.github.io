import fs from "fs";
import OpenAI from "openai";

const today = new Date().toISOString().split("T")[0];
const filename = `artikel-${today}.html`;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const tema = [
  "motivasi islami untuk anak muda",
  "kisah cinta yang menginspirasi",
  "tips bisnis sederhana untuk pemula",
  "motivasi keseharian agar tetap semangat",
  "nasihat islami tentang bersyukur"
];

const randomTema = tema[Math.floor(Math.random() * tema.length)];

const run = async () => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: `Tulis artikel blog ${randomTema}, sekitar 500 kata, gaya mengalir seperti manusia, bahasa Indonesia, langsung dalam format HTML lengkap dengan <title>, <meta description>, dan <article>. Sisipkan pembuka ringan dan penutup hangat.`,
      },
    ],
  });

  const htmlContent = completion.choices[0].message.content;
  fs.writeFileSync(filename, htmlContent, "utf-8");
};

run();
