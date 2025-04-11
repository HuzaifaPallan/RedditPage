import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Read the file content
    const fileContent = await file.text();

    // Analyze the document content using AI
    const tags = await analyzeDocument(fileContent);

    // Return the analysis results
    return NextResponse.json({
      tags,
      relevantPosts: [] // You can add relevant posts logic here
    });

  } catch (error) {
    console.error('Document analysis error:', error);
    return NextResponse.json(
      { error: 'Error analyzing document' },
      { status: 500 }
    );
  }
}

async function analyzeDocument(content) {
  try {
    // Call your AI service to analyze the document
    // This is where you would integrate with your AI service (e.g., OpenAI, Azure, etc.)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that analyzes game design documents and extracts relevant tags. Return only the tags as a JSON array."
          },
          {
            role: "user",
            content: `Analyze this game design document and extract relevant tags:\n\n${content}`
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      throw new Error('Failed to analyze document with AI');
    }

    const result = await response.json();
    const tags = JSON.parse(result.choices[0].message.content);

    return tags;
  } catch (error) {
    console.error('AI analysis error:', error);
    throw new Error('Failed to analyze document content');
  }
} 