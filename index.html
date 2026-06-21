export const maxDuration = 60;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { pdfBase64, categories } = req.body;

  if (!pdfBase64 || !categories) {
    return res.status(400).json({ error: 'Missing pdfBase64 or categories' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 4000,
        system: '你是专业英语词汇分析助手。只返回纯JSON数组，无任何Markdown或反引号。格式：[{"word":"英文","category":"idiom|proper|highfreq|culture","zh":"中文解释","example":"书中原句"}]',
        messages: [{
          role: 'user',
          content: [
            {
              type: 'document',
              source: { type: 'base64', media_type: 'application/pdf', data: pdfBase64 }
            },
            {
              type: 'text',
              text: `从这本My Weird School童书提取：${categories.join('、')}。每类8-12个，共30-45个。只返回JSON数组。`
            }
          ]
        }]
      })
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
