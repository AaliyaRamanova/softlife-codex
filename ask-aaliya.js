document.addEventListener("DOMContentLoaded", function () {
  // 💖 Advice buttons
  function showAdvice(type) {
    const boxes = ['adviceHype', 'adviceSee', 'adviceCheckin'];
    boxes.forEach(id => document.getElementById(id).style.display = 'none');
    const box = document.getElementById(`advice${type.charAt(0).toUpperCase() + type.slice(1)}`);
    if (box) box.style.display = 'block';
  }

  // 📓 Journal
  function toggleJournal() {
    const journal = document.getElementById('journalSection');
    journal.style.display = journal.style.display === 'block' ? 'none' : 'block';
    document.getElementById('journalInput').value = localStorage.getItem('askAaliyaJournal') || '';
    document.getElementById('journalStatus').textContent = '';
  }

  function saveJournal() {
    const text = document.getElementById('journalInput').value.trim();
    localStorage.setItem('askAaliyaJournal', text);
    document.getElementById('journalStatus').textContent = '✨ Saved to memory.';
  }

  // 💬 GPT Response
  async function askAaliyaGPT() {
    const prompt = document.getElementById("gptPrompt").value.trim();
    const outputBox = document.getElementById("gptReply");

    if (!prompt) {
      outputBox.innerText = "🌙 Type your heart out first, babe.";
      return;
    }

    const mode = localStorage.getItem("glowModeSpartan") || localStorage.getItem("glowMode") || "Creative";
    outputBox.classList.add("typing");
    outputBox.innerText = "✨ Typing Ask Aaliya's insight...";

    try {
      const response = await fetch("/api/ask-aaliya", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt, mode })
      });

      const data = await response.json();
      const reply = data.reply || "💤 Something didn’t vibe right. Try again.";
      outputBox.classList.remove("typing");
      outputBox.innerText = reply;
    } catch (err) {
      outputBox.classList.remove("typing");
      outputBox.innerText = "⚠️ Error reaching Ask Aaliya. Try again later.";
      console.error(err);
    }
  }

  // 🔗 Event Listeners
  document.getElementById("askButton")?.addEventListener("click", askAaliyaGPT);
  window.showAdvice = showAdvice;
  window.toggleJournal = toggleJournal;
  window.saveJournal = saveJournal;
});
