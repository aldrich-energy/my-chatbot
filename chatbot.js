(function () {
  // ── Styles ──────────────────────────────────────────────────────────────
  const css = `
    #_cb_launcher {
      position:fixed;bottom:28px;right:28px;width:56px;height:56px;
      border-radius:50%;background:#111;border:none;cursor:pointer;
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 4px 20px rgba(0,0,0,0.2);z-index:99999;
      transition:transform .2s,background .2s;
    }
    #_cb_launcher:hover{transform:scale(1.07);background:#333}
    #_cb_launcher::before{
      content:'';position:absolute;width:56px;height:56px;border-radius:50%;
      border:2px solid #111;animation:_cb_pulse 2s ease-out infinite;
    }
    @keyframes _cb_pulse{0%{transform:scale(1);opacity:.6}100%{transform:scale(1.6);opacity:0}}
    #_cb_badge{
      position:absolute;top:-3px;right:-3px;width:18px;height:18px;
      background:#ef4444;border-radius:50%;font-size:10px;color:#fff;
      display:flex;align-items:center;justify-content:center;
      font-weight:700;border:2px solid #fff;font-family:sans-serif;
    }
    #_cb_window{
      position:fixed;bottom:96px;right:28px;width:370px;height:560px;
      background:#fff;border-radius:20px;border:1px solid #e5e5e3;
      display:flex;flex-direction:column;overflow:hidden;
      box-shadow:0 8px 40px rgba(0,0,0,0.13);z-index:99998;
      transform:scale(0.92) translateY(16px);opacity:0;pointer-events:none;
      transition:transform .25s cubic-bezier(0.34,1.56,0.64,1),opacity .2s ease;
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
    }
    #_cb_window.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all}
    ._cb_header{padding:18px 20px 16px;border-bottom:1px solid #f0f0ee;display:flex;align-items:center;gap:12px}
    ._cb_avatar{width:38px;height:38px;border-radius:50%;background:#111;display:flex;align-items:center;justify-content:center;flex-shrink:0}
    ._cb_hname{font-size:14px;font-weight:600;color:#111}
    ._cb_hstatus{font-size:12px;color:#888;display:flex;align-items:center;gap:5px;margin-top:2px}
    ._cb_dot{width:7px;height:7px;border-radius:50%;background:#22c55e;display:inline-block}
    #_cb_msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;scroll-behavior:smooth}
    #_cb_msgs::-webkit-scrollbar{width:4px}
    #_cb_msgs::-webkit-scrollbar-thumb{background:#e0e0de;border-radius:4px}
    ._cb_msg{max-width:82%;font-size:13.5px;line-height:1.55;padding:10px 14px;border-radius:16px;animation:_cb_up .2s ease}
    @keyframes _cb_up{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
    ._cb_bot{background:#f5f5f3;color:#111;border-bottom-left-radius:4px;align-self:flex-start}
    ._cb_user{background:#111;color:#fff;border-bottom-right-radius:4px;align-self:flex-end}
    ._cb_qr{display:flex;flex-wrap:wrap;gap:7px;margin-top:6px;animation:_cb_up .25s ease}
    ._cb_qrbtn{padding:7px 13px;border-radius:20px;border:1px solid #ddd;background:#fff;font-size:12.5px;color:#333;cursor:pointer;transition:all .15s;font-family:inherit;white-space:nowrap}
    ._cb_qrbtn:hover{background:#111;color:#fff;border-color:#111}
    ._cb_typing{display:flex;align-items:center;gap:4px;padding:12px 14px;background:#f5f5f3;border-radius:16px;border-bottom-left-radius:4px;align-self:flex-start;width:fit-content}
    ._cb_typing span{width:6px;height:6px;border-radius:50%;background:#aaa;animation:_cb_bounce 1.2s infinite;display:inline-block}
    ._cb_typing span:nth-child(2){animation-delay:.2s}
    ._cb_typing span:nth-child(3){animation-delay:.4s}
    @keyframes _cb_bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}
    ._cb_emailbox{background:#f9f9f7;border:1px solid #e8e8e6;border-radius:12px;padding:14px;margin-top:6px;animation:_cb_up .25s ease}
    ._cb_emailbox p{font-size:12.5px;color:#555;margin-bottom:10px}
    ._cb_emailrow{display:flex;gap:8px}
    ._cb_einput{flex:1;padding:9px 12px;border:1px solid #ddd;border-radius:8px;font-size:13px;font-family:inherit;outline:none;transition:border .15s;background:#fff}
    ._cb_einput:focus{border-color:#111}
    ._cb_esubmit{padding:9px 14px;background:#111;color:#fff;border:none;border-radius:8px;font-size:13px;cursor:pointer;font-family:inherit;font-weight:500;transition:background .15s;white-space:nowrap}
    ._cb_esubmit:hover{background:#333}
    ._cb_inputarea{padding:12px 14px;border-top:1px solid #f0f0ee;display:flex;gap:8px;align-items:center;background:#fff}
    #_cb_input{flex:1;padding:10px 14px;border:1px solid #e5e5e3;border-radius:22px;font-size:13.5px;font-family:inherit;outline:none;resize:none;color:#111;background:#fafafa;transition:border .15s;max-height:80px}
    #_cb_input:focus{border-color:#bbb;background:#fff}
    #_cb_input::placeholder{color:#bbb}
    #_cb_sendbtn{width:38px;height:38px;border-radius:50%;background:#111;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .15s,transform .1s}
    #_cb_sendbtn:hover{background:#333}
    #_cb_sendbtn:active{transform:scale(0.93)}
    ._cb_powered{text-align:center;font-size:11px;color:#ccc;padding:6px 0 2px;letter-spacing:.02em}
  `;

  // ── Inject CSS ───────────────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ── Launcher Button ──────────────────────────────────────────────────────
  const launcher = document.createElement('button');
  launcher.id = '_cb_launcher';
  launcher.title = 'Chat with us';
  launcher.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24">
      <path fill="#fff" d="M12 2C6.48 2 2 6.05 2 11c0 2.6 1.15 4.94 3 6.58V22l4.44-2.22A10.6 10.6 0 0012 20c5.52 0 10-4.05 10-9S17.52 2 12 2z"/>
    </svg>
    <span id="_cb_badge">1</span>
  `;
  document.body.appendChild(launcher);

  // ── Chat Window ──────────────────────────────────────────────────────────
  const win = document.createElement('div');
  win.id = '_cb_window';
  win.innerHTML = `
    <div class="_cb_header">
      <div class="_cb_avatar">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
          <path fill="#fff" d="M12 2a5 5 0 100 10A5 5 0 0012 2zm0 12c-5.33 0-8 2.67-8 4v2h16v-2c0-1.33-2.67-4-8-4z"/>
        </svg>
      </div>
      <div>
        <div class="_cb_hname">Agency Assistant</div>
        <div class="_cb_hstatus"><span class="_cb_dot"></span> Online · Replies instantly</div>
      </div>
    </div>
    <div id="_cb_msgs"></div>
    <div class="_cb_inputarea">
      <textarea id="_cb_input" placeholder="Type your message..." rows="1"></textarea>
      <button id="_cb_sendbtn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
          <path fill="#fff" d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
        </svg>
      </button>
    </div>
    <div class="_cb_powered">Powered by AI</div>
  `;
  document.body.appendChild(win);

  // ── State ────────────────────────────────────────────────────────────────
  let chatOpen = false, greeted = false, emailCollected = false;
  let history = [];

  const SYSTEM = `You are a friendly, professional assistant for a Business/Agency website. Keep responses SHORT (2-3 sentences max).

Agency info:
- Services: Branding, Web Design, Digital Marketing, Social Media Management, Event Marketing
- Pricing: Starter from $500/mo, Growth from $1,500/mo, Enterprise custom pricing
- Events: Monthly networking events, quarterly workshops, annual brand summits
- Location: Dubai, UAE — serving global clients

Collect email naturally after they ask something substantive — say [COLLECT_EMAIL] at end of that message only.
Suggest 2-3 quick replies on a new line as [QR: option1 | option2 | option3].
Options: Our Services, Pricing Plans, Upcoming Events, Get a Quote, Talk to Human`;

  // ── Toggle ───────────────────────────────────────────────────────────────
  launcher.addEventListener('click', () => {
    chatOpen = !chatOpen;
    win.classList.toggle('open', chatOpen);
    const badge = document.getElementById('_cb_badge');
    if (badge) badge.remove();
    if (chatOpen && !greeted) { greeted = true; setTimeout(greet, 400); }
  });

  // ── Greeting ─────────────────────────────────────────────────────────────
  function greet() {
    showTyping();
    setTimeout(() => {
      removeTyping();
      addBot("Hi there! 👋 Welcome! I can help with our services, pricing, events, or anything else. What can I help you with?",
        ["Our Services", "Pricing Plans", "Upcoming Events", "Get a Quote"]);
    }, 900);
  }

  // ── Messages ─────────────────────────────────────────────────────────────
  function addBot(text, qrs = []) {
    const msgs = document.getElementById('_cb_msgs');
    const clean = text.replace(/\[COLLECT_EMAIL\]/g, '').replace(/\[QR:[^\]]*\]/g, '').trim();
    const d = document.createElement('div');
    d.className = '_cb_msg _cb_bot';
    d.textContent = clean;
    msgs.appendChild(d);

    if (text.includes('[COLLECT_EMAIL]') && !emailCollected) showEmailCapture();

    if (qrs.length) {
      const qrDiv = document.createElement('div');
      qrDiv.className = '_cb_qr';
      qrs.forEach(label => {
        const btn = document.createElement('button');
        btn.className = '_cb_qrbtn';
        btn.textContent = label;
        btn.onclick = () => { qrDiv.remove(); addUser(label); callAI(label); };
        qrDiv.appendChild(btn);
      });
      msgs.appendChild(qrDiv);
    }
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

  function showTyping() {
    const msgs = document.getElementById('_cb_msgs');
    const d = document.createElement('div');
    d.className = '_cb_typing'; d.id = '_cb_typing';
    d.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById('_cb_typing');
    if (t) t.remove();
  }

  function showEmailCapture() {
    const msgs = document.getElementById('_cb_msgs');
    const box = document.createElement('div');
    box.className = '_cb_emailbox'; box.id = '_cb_emailbox';
    box.innerHTML = `
      <p>Enter your email and we'll get back to you shortly.</p>
      <div class="_cb_emailrow">
        <input type="email" class="_cb_einput" id="_cb_einput" placeholder="your@email.com" />
        <button class="_cb_esubmit" id="_cb_esubmit">Send</button>
      </div>`;
    msgs.appendChild(box);
    msgs.scrollTop = msgs.scrollHeight;

    document.getElementById('_cb_esubmit').addEventListener('click', submitEmail);
  }

  function submitEmail() {
    const inp = document.getElementById('_cb_einput');
    const email = inp ? inp.value.trim() : '';
    if (!email || !email.includes('@')) {
      inp.style.borderColor = '#ef4444';
      setTimeout(() => inp.style.borderColor = '#ddd', 1500);
      return;
    }
    emailCollected = true;
    const box = document.getElementById('_cb_emailbox');
    if (box) box.remove();
    addUser(email);
    history.push({ role: 'user', content: 'My email is: ' + email });
    showTyping();
    setTimeout(() => {
      removeTyping();
      addBot("Perfect! We've got your email and will reach out soon. Anything else I can help with?", ["Our Services", "Upcoming Events"]);
      history.push({ role: 'assistant', content: "Perfect! We've got your email." });
    }, 700);
    console.log('Email captured:', email); // Replace with your CRM/webhook call
  }

  // ── AI Call ───────────────────────────────────────────────────────────────
  async function callAI(msg) {
    history.push({ role: 'user', content: msg });
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM,
          messages: history
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Sorry, something went wrong. Please try again!";
      history.push({ role: 'assistant', content: reply });
      const qrMatch = reply.match(/\[QR:([^\]]+)\]/);
      const qrs = qrMatch ? qrMatch[1].split('|').map(s => s.trim()) : [];
      removeTyping();
      addBot(reply, qrs);
    } catch {
      removeTyping();
      addBot("Oops, something went wrong. Please try again!", ["Try Again"]);
    }
  }

  // ── Send ──────────────────────────────────────────────────────────────────
  function send() {
    const inp = document.getElementById('_cb_input');
    const text = inp.value.trim();
    if (!text) return;
    inp.value = ''; inp.style.height = 'auto';
    addUser(text); showTyping(); callAI(text);
  }

  document.getElementById('_cb_sendbtn').addEventListener('click', send);
  document.getElementById('_cb_input').addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  });
  document.getElementById('_cb_input').addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 80) + 'px';
  });
})();
