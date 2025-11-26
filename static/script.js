// DOM Elements
const chatMessages = document.getElementById('chat-messages');
const questionInput = document.getElementById('question-input');
const sendBtn = document.getElementById('send-btn');
const modelSelect = document.getElementById('model-select');
const loadingOverlay = document.getElementById('loading-overlay');

// State
let isProcessing = false;
let conversationHistory = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    autoResizeTextarea();
});

function setupEventListeners() {
    // Send button click
    sendBtn.addEventListener('click', sendQuestion);
    
    // Enter key to send (Shift+Enter for new line)
    questionInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendQuestion();
        }
    });
    
    // Auto-resize textarea
    questionInput.addEventListener('input', autoResizeTextarea);
}

function autoResizeTextarea() {
    questionInput.style.height = 'auto';
    questionInput.style.height = Math.min(questionInput.scrollHeight, 150) + 'px';
}

function setQuestion(question) {
    questionInput.value = question;
    questionInput.focus();
    autoResizeTextarea();
}

async function sendQuestion() {
    const question = questionInput.value.trim();
    
    if (!question || isProcessing) {
        return;
    }
    
    // Clear welcome message on first question
    if (conversationHistory.length === 0) {
        chatMessages.innerHTML = '';
    }
    
    // Add user message to chat
    addMessage(question, 'user');
    
    // Clear input and reset height
    questionInput.value = '';
    questionInput.style.height = 'auto';
    
    // Disable input while processing
    isProcessing = true;
    sendBtn.disabled = true;
    questionInput.disabled = true;
    showLoading(true);
    
    try {
        // Get selected model
        const model = modelSelect.value;
        
        // Send request to backend
        const response = await fetch('/api/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question: question,
                model: model,
                max_tokens: 1000
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to get response');
        }
        
        const data = await response.json();
        
        // Add AI response to chat
        addMessage(data.answer, 'ai', data.model);
        
        // Store in conversation history
        conversationHistory.push({
            question: question,
            answer: data.answer,
            model: data.model,
            timestamp: new Date()
        });
        
    } catch (error) {
        console.error('Error:', error);
        addMessage(
            `Sorry, I encountered an error: ${error.message}\n\nPlease make sure your OPENROUTER_API_KEY is set correctly.`,
            'ai',
            'error'
        );
    } finally {
        // Re-enable input
        isProcessing = false;
        sendBtn.disabled = false;
        questionInput.disabled = false;
        questionInput.focus();
        showLoading(false);
    }
}

function addMessage(text, type, model = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Add label
    const labelDiv = document.createElement('div');
    labelDiv.className = 'message-label';
    labelDiv.textContent = type === 'user' ? 'You' : (model === 'error' ? 'Error' : `AI (${model || 'Assistant'})`);
    
    // Add text
    const textDiv = document.createElement('div');
    textDiv.className = 'message-text';
    textDiv.textContent = text;
    
    contentDiv.appendChild(labelDiv);
    contentDiv.appendChild(textDiv);
    messageDiv.appendChild(contentDiv);
    
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom with smooth animation
    setTimeout(() => {
        chatMessages.scrollTo({
            top: chatMessages.scrollHeight,
            behavior: 'smooth'
        });
    }, 100);
}

function showLoading(show) {
    if (show) {
        loadingOverlay.classList.remove('hidden');
    } else {
        loadingOverlay.classList.add('hidden');
    }
}

// Utility function to format timestamps
function formatTimestamp(date) {
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Export conversation (optional feature)
function exportConversation() {
    const blob = new Blob([JSON.stringify(conversationHistory, null, 2)], {
        type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversation-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}
