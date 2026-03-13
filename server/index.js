let express = require("express");
let cors = require("cors");
require("dotenv").config();
let { GoogleGenerativeAI } = require("@google/generative-ai");
let App = express();

App.use(cors()); // Middleware
App.use(express.json()); // Middleware

let genAi = new GoogleGenerativeAI(process.env.KEY);
let model = genAi.getGenerativeModel({ model: "gemini-2.5-flash" });

App.post("/ask", async (req, res) => {
  let { question } = req.body;
  let data = await model.generateContent(question);
  let finalData = data.response.text();

  res.send({
    _status: true,
    _message: "content found in node js ...",
    finalData,
  });
});

App.listen(process.env.PORT, () => {
  console.log("server start");
});
