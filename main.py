from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import requests
import os
import logging
import traceback

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="AI Q&A Assistant", description="Question-answering app using OpenRouter API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")


class QuestionRequest(BaseModel):
    question: str
    model: str = "google/gemini-2.0-flash-exp:free"
    max_tokens: int = 1000
    system_prompt: str = None


class QuestionResponse(BaseModel):
    answer: str
    model: str


def get_openrouter_response(prompt: str, model: str = "google/gemini-2.0-flash-exp:free", max_tokens: int = 1000, system_prompt: str = None):
    """Get response from OpenRouter API with optional system prompt"""
    try:
        # Get API key from environment for security
        # api_key = os.environ.get("OPENROUTER_API_KEY") or os.environ.get("OPENROUTER_KEY")
        # if not api_key:
        #     logger.error("OPENROUTER_API_KEY not set in environment variables")
        #     return "Error: API key not configured. Please set OPENROUTER_API_KEY environment variable."

        headers = {
            "Authorization": f"Bearer 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",
            "Content-Type": "application/json"
        }

        # Build messages array
        messages = []
        if system_prompt:
            messages.append({
                "role": "system",
                "content": system_prompt
            })
        
        messages.append({
            "role": "user",
            "content": prompt
        })
        
        data = {
            "model": model,
            "messages": messages,
            "max_tokens": max_tokens
        }
        
        logger.info(f"Sending request to OpenRouter API with model: {model}")
        
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=data,
            timeout=60
        )
        
        logger.info(f"OpenRouter response status: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            content = result['choices'][0]['message']['content']
            logger.info(f"Successfully received response from OpenRouter: {len(content)} characters")
            return content
        else:
            logger.error(f"OpenRouter API error: {response.status_code} - {response.text}")
            return f"Error: OpenRouter API returned status {response.status_code}. Details: {response.text}"
            
    except Exception as e:
        logger.error(f"Error calling OpenRouter: {e}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        return f"Error: {str(e)}"


@app.get("/")
async def read_root():
    """Serve the main HTML page"""
    return FileResponse("static/index.html")


@app.post("/api/ask", response_model=QuestionResponse)
async def ask_question(request: QuestionRequest):
    """
    Endpoint to receive a question and return an AI-generated response
    """
    try:
        logger.info(f"Received question: {request.question[:50]}...")
        
        # Get response from OpenRouter
        answer = get_openrouter_response(
            prompt=request.question,
            model=request.model,
            max_tokens=request.max_tokens,
            system_prompt=request.system_prompt
        )
        
        if answer.startswith("Error:"):
            raise HTTPException(status_code=500, detail=answer)
        
        return QuestionResponse(answer=answer, model=request.model)
    
    except Exception as e:
        logger.error(f"Error processing question: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "AI Q&A Assistant"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
