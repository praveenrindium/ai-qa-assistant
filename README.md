# AI Q&A Assistant

A beautiful, modern web application that allows users to ask questions and receive intelligent responses powered by OpenRouter's AI models.

## Features

✨ **Premium UI Design**
- Dark theme with glassmorphism effects
- Smooth gradients and micro-animations
- Responsive design for all devices
- Modern typography using Inter font

🤖 **AI-Powered Responses**
- Multiple AI model support (Gemini, GPT, Claude)
- Real-time question answering
- Conversation history tracking
- Fast and reliable API integration

🎨 **User Experience**
- Intuitive chat interface
- Auto-resizing text input
- Keyboard shortcuts (Enter to send, Shift+Enter for new line)
- Loading states and error handling
- Example questions to get started

## Installation

1. **Clone or navigate to the project directory**
```bash
cd c:\Users\PraveenR\Documents\game
```

2. **Install Python dependencies**
```bash
pip install -r requirements.txt
```

3. **Set up your OpenRouter API key**

Create a `.env` file or set the environment variable:
```bash
# On Windows PowerShell
$env:OPENROUTER_API_KEY="your_api_key_here"

# Or create a .env file
OPENROUTER_API_KEY=your_api_key_here
```

Get your API key from: https://openrouter.ai/keys

## Usage

1. **Start the FastAPI server**
```bash
python main.py
```

Or using uvicorn directly:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

2. **Open your browser**

Navigate to: http://localhost:8000

3. **Start asking questions!**

- Type your question in the input field
- Select your preferred AI model from the dropdown
- Press Enter or click the send button
- Get intelligent responses instantly

## Project Structure

```
game/
├── main.py                 # FastAPI backend application
├── requirements.txt        # Python dependencies
├── .env.example           # Environment variable template
├── static/
│   ├── index.html         # Main HTML page
│   ├── style.css          # Premium CSS styling
│   └── script.js          # Frontend JavaScript logic
└── README.md              # This file
```

## API Endpoints

### `POST /api/ask`
Submit a question and receive an AI-generated response.

**Request Body:**
```json
{
  "question": "What is quantum computing?",
  "model": "google/gemini-2.0-flash-exp:free",
  "max_tokens": 1000,
  "system_prompt": "Optional system prompt"
}
```

**Response:**
```json
{
  "answer": "Quantum computing is...",
  "model": "google/gemini-2.0-flash-exp:free"
}
```

### `GET /health`
Health check endpoint to verify the service is running.

## Available Models

- **google/gemini-2.0-flash-exp:free** - Fast and free Gemini model (default)
- **google/gemini-flash-1.5** - Gemini Flash 1.5
- **openai/gpt-3.5-turbo** - OpenAI GPT-3.5 Turbo
- **anthropic/claude-3-haiku** - Anthropic Claude 3 Haiku

## Technologies Used

### Backend
- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server
- **Requests** - HTTP library for API calls
- **Pydantic** - Data validation

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **Vanilla JavaScript** - No framework dependencies
- **Inter Font** - Premium typography

## Design Features

- **Glassmorphism** - Frosted glass effect on cards
- **Gradient Backgrounds** - Vibrant color gradients
- **Smooth Animations** - Fade-in, slide-in, and hover effects
- **Responsive Layout** - Works on desktop, tablet, and mobile
- **Dark Theme** - Easy on the eyes
- **Custom Scrollbars** - Styled to match the theme

## Troubleshooting

**Issue: "OPENROUTER_API_KEY not set" warning**
- Make sure you've set the environment variable before starting the server
- Check that your API key is valid

**Issue: API returns 402 error**
- Your OpenRouter account may need credits
- Verify your API key is correct

**Issue: CORS errors**
- The app includes CORS middleware, but ensure you're accessing via the correct URL
- Use http://localhost:8000 not file:///

## License

This project is open source and available for personal and commercial use.

## Support

For issues or questions:
1. Check the OpenRouter documentation: https://openrouter.ai/docs
2. Verify your API key is set correctly
3. Check the browser console for error messages
4. Review the FastAPI logs in the terminal

---

Built with ❤️ using FastAPI and OpenRouter
