from flask import Flask, render_template, request, jsonify
import openai
import os
from config import OPENAI_API_KEY

# Initialize Flask app
app = Flask(__name__)

# Configure OpenAI API
openai.api_key = OPENAI_API_KEY

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get("message")
    
    # Send request to OpenAI API
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", 
        messages=[{"role": "user", "content": user_message}]
    )
    
    bot_reply = response["choices"][0]["message"]["content"].strip()
    return jsonify({"response": bot_reply})

if __name__ == '__main__':
    app.run(debug=True)
