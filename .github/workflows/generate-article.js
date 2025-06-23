const fs = require("fs");
const { Configuration, OpenAIApi } = require("openai");

const today = new Date().toISOString().split("T")[0];
const filename = `artikel-${today}.html`;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const tema = [
  "motivasi islami untuk anak muda",
  "kisah cinta yang menginspirasi",
  "tips bisnis sederhana untuk pemula",
  "motivasi keseharian agar tetap semangat",
  "nasihat islami tentang bersyukur"
];

const randomTema = tema[Math.floor(Math.random() * tema.length)];

(async () => {
  const res = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: `Tulis artikel blog ${randomTema}, sekitar 500 kata, gaya mengalir seperti manusia, bahasa Indonesia, langsung dalam format HTML lengkap dengan <title>, <meta description>, dan <article>. Sisipkan pembuka ringan dan penutup hangat.`,
      },
    ],
  });

  const htmlContent = res.data.choices[0].message.content;
  fs.writeFileSync(filename, htmlContent, "utf-8");
})();
