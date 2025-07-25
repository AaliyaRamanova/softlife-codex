# main.py – Flask backend for Soft Life Codex

from flask import Flask, render_template, send_from_directory, jsonify
from dotenv import load_dotenv
import os

# Load your .env vault
load_dotenv()

app = Flask(__name__, static_folder='static', template_folder='templates')

# Route homepage
@app.route('/')
def index():
    return render_template('index.html')

# Pages routing
@app.route('/ask-aaliya')
def ask_aaliya():
    return render_template('ask-aaliya.html')

@app.route('/glowfilter')
def glowfilter():
    return render_template('glowfilter.html')

@app.route('/cycle-calendar')
def cycle_calendar():
    return render_template('cycle-calendar.html')

@app.route('/downloads')
def downloads():
    return render_template('downloads.html')

@app.route('/safe-soft-alert')
def safe_soft():
    return render_template('safe-soft-alert.html')

@app.route('/screenshot-intelligence')
def screenshot_intel():
    return render_template('screenshot-intelligence.html')

@app.route('/doctor-near-me')
def doctor_finder():
    return render_template('doctor-near-me.html')

@app.route('/detect-profile-check')
def detect_profile():
    return render_template('detect-profile-check.html')

@app.route('/softlife-guide')
def softlife_guide():
    return render_template('softlife-guide.html')

@app.route('/ai-image-generator')
def ai_image():
    return render_template('ai-image-generator.html')

# Static file delivery (css, images, etc.)
@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

# 🧠 Vault test route
@app.route('/check-vault')
def check_vault():
    github_token = os.getenv("GITHUB_TOKEN")
    openai_key = os.getenv("OPENAI_API_KEY")
    email = os.getenv("SOFTLIFE_EMAIL")

    if github_token and openai_key and email:
        return jsonify({"status": "🧠 Vault Synced!", "email": email})
    else:
        return jsonify({
            "status": "❌ Vault Not Found",
            "GITHUB_TOKEN": github_token,
            "OPENAI_API_KEY": openai_key,
            "SOFTLIFE_EMAIL": email
        })

if __name__ == '__main__':
    app.run(debug=True)
