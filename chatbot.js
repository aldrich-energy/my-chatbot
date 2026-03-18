(function () {
  const css = `
    #_cb_launcher{position:fixed;bottom:28px;right:28px;width:56px;height:56px;border-radius:50%;background:#D4A017;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(0,0,0,0.2);z-index:99999;transition:transform .2s;}
    #_cb_launcher:hover{transform:scale(1.07);}
    #_cb_launcher::before{content:'';position:absolute;width:56px;height:56px;border-radius:50%;border:2px solid #D4A017;animation:_cb_pulse 2s ease-out infinite;}
    @keyframes _cb_pulse{0%{transform:scale(1);opacity:.6}100%{transform:scale(1.6);opacity:0}}
    #_cb_badge{position:absolute;top:-3px;right:-3px;width:18px;height:18px;background:#ef4444;border-radius:50%;font-size:10px;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;border:2px solid #fff;font-family:sans-serif;}
    #_cb_window{position:fixed;bottom:96px;right:28px;width:360px;height:540px;background:#fff;border-radius:20px;border:1px solid #e5e5e3;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.13);z-index:99998;transform:scale(0.92) translateY(16px);opacity:0;pointer-events:none;transition:transform .25s cubic-bezier(0.34,1.56,0.64,1),opacity .2s ease;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
    #_cb_window.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all;}
    ._cb_header{padding:16px 18px;background:#111;display:flex;align-items:center;gap:12px;}
    ._cb_avatar{width:38px;height:38px;border-radius:50%;background:#D4A017;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:16px;}
    ._cb_hname{font-size:14px;font-weight:600;color:#fff;}
    ._cb_hstatus{font-size:11px;color:#aaa;display:flex;align-items:center;gap:5px;margin-top:2px;}
    ._cb_dot{width:6px;height:6px;border-radius:50%;background:#22c55e;display:inline-block;}
    #_cb_msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:9px;scroll-behavior:smooth;}
    #_cb_msgs::-webkit-scrollbar{width:3px;}
    #_cb_msgs::-webkit-scrollbar-thumb{background:#e0e0de;border-radius:4px;}
    ._cb_msg{max-width:85%;font-size:13.5px;line-height:1.55;padding:10px 13px;border-radius:16px;animation:_cb_up .2s ease;}
    @keyframes _cb_up{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
    ._cb_bot{background:#f5f5f3;color:#111;border-bottom-left-radius:4px;align-self:flex-start;}
    ._cb_user{background:#111;color:#fff;border-bottom-right-radius:4px;align-self:flex-end;}
    ._cb_qr{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;animation:_cb_up .25s ease;}
    ._cb_qrbtn{padding:7px 12px;border-radius:20px;border:1.5px solid #D4A017;background:#fff;font-size:12px;color:#111;cursor:pointer;transition:all .15s;font-family:inherit;white-space:nowrap;font-weight:500;}
    ._cb_qrbtn:hover{background:#D4A017;color:#fff;}
    ._cb_typing{display:flex;align-items:center;gap:4px;padding:12px 14px;background:#f5f5f3;border-radius:16px;border-bottom-left-radius:4px;align-self:flex-start;width:fit-content;}
    ._cb_typing span{width:6px;height:6px;border-radius:50%;background:#aaa;animation:_cb_bounce 1.2s infinite;display:inline-block;}
    ._cb_typing span:nth-child(2){animation-delay:.2s;}
    ._cb_typing span:nth-child(3){animation-delay:.4s;}
    @keyframes _cb_bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}
    ._cb_emailbox{background:#fffbf0;border:1.5px solid #D4A017;border-radius:12px;padding:13px;margin-top:4px;animation:_cb_up .25s ease;}
    ._cb_emailbox p{font-size:12.5px;color:#555;margin-bottom:9px;line-height:1.5;}
    ._cb_emailrow{display:flex;gap:7px;}
    ._cb_einput{flex:1;padding:9px 11px;border:1px solid #ddd;border-radius:8px;font-size:13px;font-family:inherit;outline:none;transition:border .15s;background:#fff;}
    ._cb_einput:focus{border-color:#D4A017;}
    ._cb_esubmit{padding:9px 13px;background:#D4A017;color:#fff;border:none;border-radius:8px;font-size:13px;cursor:pointer;font-family:inherit;font-weight:600;transition:background .15s;}
    ._cb_esubmit:hover{background:#b8880f;}
    ._cb_inputarea{padding:11px 13px;border-top:1px solid #f0f0ee;display:flex;gap:8px;align-items:center;background:#fff;}
    #_cb_input{flex:1;padding:9px 13px;border:1px solid #e5e5e3;border-radius:22px;font-size:13px;font-family:inherit;outline:none;color:#111;background:#fafafa;transition:border .15s;}
    #_cb_input:focus{border-color:#D4A017;background:#fff;}
    #_cb_input::placeholder{color:#bbb;}
    #_cb_input:disabled{opacity:0.4;cursor:not-allowed;}
    #_cb_sendbtn{width:36px;height:36px;border-radius:50%;background:#111;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .15s;}
    #_cb_sendbtn:hover{background:#333;}
    ._cb_link{color:#D4A017;text-decoration:underline;cursor:pointer;font-weight:500;display:inline-block;margin-top:6px;}
    ._cb_powered{text-align:center;font-size:10px;color:#ccc;padding:5px 0 3px;}
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const launcher = document.createElement('button');
  launcher.id = '_cb_launcher';
  launcher.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M12 2C6.48 2 2 6.05 2 11c0 2.6 1.15 4.94 3 6.58V22l4.44-2.22A10.6 10.6 0 0012 20c5.52 0 10-4.05 10-9S17.52 2 12 2z"/></svg><span id="_cb_badge">1</span>`;
  document.body.appendChild(launcher);

  const win = document.createElement('div');
  win.id = '_cb_window';
  win.innerHTML = `
    <div class="_cb_header">
      <div class="_cb_avatar">🌍</div>
      <div>
        <div class="_cb_hname">AIMCS Africa Assistant</div>
        <div class="_cb_hstatus"><span class="_cb_dot"></span> Online · Always here to help</div>
      </div>
    </div>
    <div id="_cb_msgs"></div>
    <div class="_cb_inputarea">
      <input type="text" id="_cb_input" placeholder="Please enter your email first..." disabled />
      <button id="_cb_sendbtn"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg></button>
    </div>
    <div class="_cb_powered">AIMCS Africa · Smart Assistant</div>
  `;
  document.body.appendChild(win);

  // ── FAQ DATA ─────────────────────────────────────────────────────────────
  const FAQ = {
    about: "AIMCS Africa (Asset Integrity Management Conference & Summit) is Africa's premier event focused on asset integrity, maintenance, and reliability. It brings together industry leaders, engineers, and decision-makers from across the continent and beyond. 🌍",
    when: "📅 Date: 15–17 September 2026\n📍 Venue: Cairo International Convention Centre\n📌 New Cairo, Egypt\n\nDoors open at 8:00 AM daily!",
    register: { text: "Registering is easy! We have Visitor Passes, Delegate Packages, and VIP options available.\n\nClick below to secure your spot:", link: "Register Now →", url: "https://aimcs-africa.framer.website/register" },
    sponsor: "🤝 Sponsorship Packages:\n\n• Bronze – $2,500\n• Silver – $5,000\n• Gold – $10,000\n• Platinum – $20,000\n\nEach includes exhibition space, branding & delegate passes.\nEmail: sponsor@aimcs-africa.com"
  };

  const MAIN_QRS = ["What is AIMCS Africa?", "Event Date & Venue", "How to Register?", "Sponsorship Details"];

  let chatOpen = false, greeted = false, emailCollected = false;

  launcher.addEventListener('click', () => {
    chatOpen = !chatOpen;
    win.classList.toggle('open', chatOpen);
    const b = document.getElementById('_cb_badge');
    if (b) b.remove();
    if (chatOpen && !greeted) { greeted = true; setTimeout(greet, 400); }
  });

  // ── STEP 1: Greet and ask for email immediately ──────────────────────────
  function greet() {
    showTyping();
    setTimeout(() => {
      removeTyping();
      addBot("👋 Hello! Welcome to AIMCS Africa!\n\nWe're excited to have you here. To get started, please share your email address so we can keep you updated about our upcoming event in Cairo. 📩");
      setTimeout(() => showEmailCapture(), 400);
    }, 800);
  }

  function addBot(text, qrs = [], linkObj = null) {
    const msgs = document.getElementById('_cb_msgs');
    const d = document.createElement('div');
    d.className = '_cb_msg _cb_bot';
    d.style.whiteSpace = 'pre-line';
    d.textContent = text;
    if (linkObj) {
      const a = document.createElement('a');
      a.href = linkObj.url; a.target = '_blank';
      a.className = '_cb_link'; a.textContent = linkObj.link;
      d.appendChild(a);
    }
    msgs.appendChild(d);
    if (qrs.length) addQRs(qrs);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function addUser(text) {
    const msgs = document.getElementById('_cb_msgs');
    const d = document.createElement('div');
    d.className = '_cb_msg _cb_user';
    d.textContent = text;
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function addQRs(qrs) {
    const msgs = document.getElementById('_cb_msgs');
    const div = document.createElement('div');
    div.className = '_cb_qr';
    qrs.forEach(label => {
      const btn = document.createElement('button');
      btn.className = '_cb_qrbtn'; btn.textContent = label;
      btn.onclick = () => { div.remove(); handleInput(label); };
      div.appendChild(btn);
    });
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showTyping() {
    const msgs = document.getElementById('_cb_msgs');
    const d = document.createElement('div');
    d.className = '_cb_typing'; d.id = '_cb_typing';
    d.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight;
  }

  function removeTyping() { const t = document.getElementById('_cb_typing'); if (t) t.remove(); }

  // ── Email capture box ────────────────────────────────────────────────────
  function showEmailCapture() {
    const msgs = document.getElementById('_cb_msgs');
    const box = document.createElement('div');
    box.className = '_cb_emailbox'; box.id = '_cb_emailbox';
    box.innerHTML = `
      <p>✉️ Enter your email address below:</p>
      <div class="_cb_emailrow">
        <input type="email" class="_cb_einput" id="_cb_einput" placeholder="your@email.com"/>
        <button class="_cb_esubmit" id="_cb_esubmit">Submit</button>
      </div>`;
    msgs.appendChild(box);
    msgs.scrollTop = msgs.scrollHeight;
    setTimeout(() => { const i = document.getElementById('_cb_einput'); if(i) i.focus(); }, 100);
    document.getElementById('_cb_esubmit').addEventListener('click', submitEmail);
    document.getElementById('_cb_einput').addEventListener('keydown', e => { if (e.key === 'Enter') submitEmail(); });
  }

  // ── STEP 2: After email → thank you → show FAQ ───────────────────────────
  function submitEmail() {
    const inp = document.getElementById('_cb_einput');
    const email = inp ? inp.value.trim() : '';
    if (!email || !email.includes('@')) {
      if(inp) { inp.style.borderColor = '#ef4444'; setTimeout(() => inp.style.borderColor = '#ddd', 1500); }
      return;
    }
    emailCollected = true;
    const box = document.getElementById('_cb_emailbox');
    if (box) box.remove();
    addUser(email);
    console.log('Email captured:', email); // 🔁 Replace with your webhook/CRM

    // Enable the text input now
    const textInput = document.getElementById('_cb_input');
    if (textInput) { textInput.disabled = false; textInput.placeholder = 'Type a message or pick a topic...'; }

    showTyping();
    setTimeout(() => {
      removeTyping();
      addBot("🎉 Thank you! We've saved your email and will keep you updated.\n\nNow, how can I help you? Please choose a topic below or type your question:", MAIN_QRS);
    }, 800);
  }

  // ── Handle messages after email collected ────────────────────────────────
  function handleInput(text) {
    if (!emailCollected) return;
    const t = text.toLowerCase().trim();
    addUser(text); showTyping();
    setTimeout(() => {
      removeTyping();
      if (t.match(/^(hi|hello|hey|greetings)/)) {
        addBot("👋 Hello again! How can I help you today?", MAIN_QRS);
      } else if (t.includes('what is') || t.includes('about') || t.includes('aimcs')) {
        addBot(FAQ.about, MAIN_QRS);
      } else if (t.includes('date') || t.includes('when') || t.includes('where') || t.includes('venue') || t.includes('location') || t.includes('event date')) {
        addBot(FAQ.when, MAIN_QRS);
      } else if (t.includes('register') || t.includes('ticket') || t.includes('pass') || t.includes('attend') || t.includes('how to')) {
        addBot(FAQ.register.text, MAIN_QRS, { link: FAQ.register.link, url: FAQ.register.url });
      } else if (t.includes('sponsor') || t.includes('package') || t.includes('partner') || t.includes('exhibit')) {
        addBot(FAQ.sponsor, MAIN_QRS);
      } else if (t.includes('thank')) {
        addBot("You're welcome! 😊 We look forward to seeing you at AIMCS Africa 2026 in Cairo!", MAIN_QRS);
      } else if (t.includes('bye') || t.includes('goodbye')) {
        addBot("Goodbye! 👋 See you at AIMCS Africa 2026. Feel free to come back anytime!", []);
      } else {
        addBot("I'm here to help with questions about AIMCS Africa. Please choose a topic:", MAIN_QRS);
      }
    }, 700);
  }

  function send() {
    const inp = document.getElementById('_cb_input');
    if (!inp || inp.disabled) return;
    const text = inp.value.trim();
    if (!text) return;
    inp.value = ''; handleInput(text);
  }

  document.getElementById('_cb_sendbtn').addEventListener('click', send);
  document.getElementById('_cb_input').addEventListener('keydown', e => { if (e.key === 'Enter') send(); });
})();
