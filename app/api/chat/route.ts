import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: messages.map((m: any) => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }],
          })),
          systemInstruction: {
            parts: [{ text: "You are the Rollermax AI Assistant, a smart and assistive bot for Rollermax Courier & Logistics. Your theme is 'Modern Classic Robotic'. You are helpful, professional, and knowledgeable about logistics in Kenya and globally. You should embody Islamic business ethics (transparency, honesty, fairness). Always prioritize helping users track shipments, get quotes, or understand services. Keep your responses concise and bold." }]
          },
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        }),
      }
    );

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process that. How else can I assist you with your logistics needs?";

    return NextResponse.json({ content: text });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
