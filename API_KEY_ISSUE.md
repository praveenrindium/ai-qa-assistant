# OpenRouter API Key Issue - Action Required

## Problem

The OpenRouter API is returning a **401 "User not found"** error, which means the API key is invalid or has been revoked.

**Error Details:**
```
Error: OpenRouter API returned status 401. 
Details: {"error":{"message":"User not found.","code":401}}
```

## Solution

You need to get a valid OpenRouter API key. Here's how:

### Step 1: Get Your OpenRouter API Key

1. **Go to OpenRouter**: Visit [https://openrouter.ai](https://openrouter.ai)
2. **Sign In/Sign Up**: 
   - If you have an account, sign in
   - If not, create a free account
3. **Navigate to API Keys**: Go to [https://openrouter.ai/settings/keys](https://openrouter.ai/settings/keys)
4. **Create New Key**:
   - Click "Create Key"
   - Give it a name (e.g., "AI Q&A Assistant")
   - Copy the key (starts with `sk-or-v1-...`)

### Step 2: Update main.py

Once you have your valid API key, update line 52 in `main.py`:

**Current (Invalid):**
```python
"Authorization": f"Bearer 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",
```

**Replace with your new key:**
```python
"Authorization": f"Bearer YOUR_NEW_API_KEY_HERE",
```

### Step 3: Test Again

```powershell
python .\test_api.py
```

You should see a successful response with the answer "4" or similar.

## Important Notes

- **Free Tier**: OpenRouter offers free access to some models
- **Rate Limits**: Free tier has rate limits (you may see 429 errors if you exceed them)
- **Credits**: You can add credits to your account for higher limits and more models

## Alternative: Use Environment Variable (Recommended for Deployment)

If you want to keep the key secure for deployment, you can use environment variables:

1. **In main.py**, uncomment lines 46-49 and update line 52:
   ```python
   api_key = os.environ.get("OPENROUTER_API_KEY") or os.environ.get("OPENROUTER_KEY")
   if not api_key:
       logger.error("OPENROUTER_API_KEY not set in environment variables")
       return "Error: API key not configured. Please set OPENROUTER_API_KEY environment variable."

   headers = {
       "Authorization": f"Bearer {api_key}",
       "Content-Type": "application/json"
   }
   ```

2. **Set the environment variable:**
   ```powershell
   $env:OPENROUTER_API_KEY="your_new_valid_key"
   ```

3. **For Render deployment**, set the environment variable in Render dashboard (as shown in deployment guide)

## Why This Matters

- The current key is **not recognized** by OpenRouter
- It may have been:
  - Revoked
  - Never valid
  - From a deleted account
  - A test/example key

You **must** use your own valid API key from your OpenRouter account.
