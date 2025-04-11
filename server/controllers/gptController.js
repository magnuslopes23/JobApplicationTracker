const fs = require('fs');
const mammoth = require('mammoth');
const axios = require('axios');
require('dotenv').config();

const optimizeResume = async (req, res) => {
  const file = req.file;
  const jobDescription = req.body.jd;

  if (!file || !jobDescription) {
    return res.status(400).json({ message: 'Resume and job description are required.' });
  }

  try {
    // 1️⃣ Extract resume text from .docx
    const result = await mammoth.extractRawText({ path: file.path });
    const resumeText = result.value;

    // 2️⃣ Build chat-style prompt for DeepSeek
    const prompt = `
You are an expert resume optimizer.

Given the following resume and job description:

Resume:
${resumeText}

Job Description:
${jobDescription}

Please return:
1. A tailored resume optimized for this job
2. A list of the keywords from the job description
3. Find the Gap in my experience and highlight it with project ideas
    `;

    // 3️⃣ Send request to Together.ai with DeepSeek
    const response = await axios.post(
      'https://api.together.xyz/v1/chat/completions',
      {
        model: 'deepseek-ai/DeepSeek-V3',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const output = response.data.choices[0].message.content;

    // 4️⃣ Respond with the tailored resume and keywords
    res.status(200).json({ output });

    // 5️⃣ Clean up uploaded file
    fs.unlinkSync(file.path);

  } catch (err) {
    console.error('❌ DeepSeek Error:', err.response?.data || err.message);
    res.status(500).json({
      message: 'Failed to optimize resume. Please try again later.',
    });
  }
};

module.exports = { optimizeResume };
