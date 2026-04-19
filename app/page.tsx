"use client";
 
import { useState } from "react";
 
const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E8C96A";
const GOLD_DIM = "#8B6914";
const BG = "#0A0800";
const SURFACE = "#110E00";
const BORDER = "#2A2200";
 
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');
 
  * { box-sizing: border-box; margin: 0; padding: 0; }
 
  body {
    background: ${BG};
    min-height: 100vh;
    font-family: 'Space Mono', monospace;
    color: #fff;
    overflow-x: hidden;
  }
 
  .grain {
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    opacity: 0.5;
  }
 
  .glow-bg {
    position: fixed;
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
    top: -200px; left: 50%; transform: translateX(-50%);
    pointer-events: none; z-index: 0;
    animation: pulse 6s ease-in-out infinite;
  }
 
  @keyframes pulse {
    0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
    50% { opacity: 1; transform: translateX(-50%) scale(1.1); }
  }
 
  .stars {
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    overflow: hidden;
  }
 
  .star {
    position: absolute;
    background: ${GOLD};
    border-radius: 50%;
    animation: twinkle var(--dur) ease-in-out infinite;
    animation-delay: var(--delay);
  }
 
  @keyframes twinkle {
    0%, 100% { opacity: 0; }
    50% { opacity: var(--opacity); }
  }
 
  .container {
    position: relative; z-index: 1;
    min-height: 100vh;
    display: flex; flex-direction: column;
    align-items: center;
    padding: 40px 20px 80px;
  }
 
  .logo-wrap {
    display: flex; flex-direction: column; align-items: center;
    margin-bottom: 32px;
    animation: fadeDown 0.8s ease both;
  }
 
  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
 
  .logo-icon {
    width: 64px; height: 64px; margin-bottom: 16px;
    filter: drop-shadow(0 0 20px rgba(201,168,76,0.6));
    animation: float 4s ease-in-out infinite;
  }
 
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
 
  .logo-title {
    font-family: 'Playfair Display', serif;
    font-size: 52px; font-weight: 900;
    letter-spacing: 4px;
    background: linear-gradient(135deg, #8B6914 0%, #E8C96A 50%, #8B6914 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
    text-transform: uppercase;
    line-height: 1;
  }
 
  .logo-sub {
    font-size: 10px; letter-spacing: 6px; color: #5a4a1a;
    margin-top: 6px; text-transform: uppercase;
  }
 
  .divider {
    width: 100%; max-width: 480px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #8B6914, transparent);
    margin: 4px auto 32px;
  }
 
  .stepper {
    display: flex; align-items: center; gap: 0;
    margin-bottom: 32px;
    animation: fadeIn 0.6s 0.3s ease both;
  }
 
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
 
  .step-item {
    display: flex; flex-direction: column; align-items: center; gap: 6px;
  }
 
  .step-circle {
    width: 36px; height: 36px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700;
    border: 1.5px solid #2A2200;
    color: #333; background: transparent;
    transition: all 0.3s;
  }
 
  .step-circle.active { border-color: #C9A84C; color: #C9A84C; box-shadow: 0 0 12px rgba(201,168,76,0.3); }
  .step-circle.done { border-color: #C9A84C; background: #C9A84C; color: #000; }
 
  .step-label { font-size: 8px; letter-spacing: 2px; color: #333; text-transform: uppercase; transition: color 0.3s; }
  .step-label.active { color: #C9A84C; }
  .step-label.done { color: #8B6914; }
 
  .step-line { width: 48px; height: 1px; background: #2A2200; margin-bottom: 20px; transition: background 0.3s; }
  .step-line.done { background: #8B6914; }
 
  .step-badge {
    display: inline-flex; align-items: center;
    background: rgba(201,168,76,0.08); border: 1px solid rgba(201,168,76,0.2);
    border-radius: 20px; padding: 4px 14px;
    font-size: 9px; letter-spacing: 3px; color: #C9A84C;
    text-transform: uppercase; margin-bottom: 20px;
  }
 
  .card {
    width: 100%; max-width: 480px;
    background: #110E00; border: 1px solid #2A2200;
    border-radius: 16px; padding: 36px 32px;
    animation: slideUp 0.5s ease both;
  }
 
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
 
  .card-title { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: #fff; margin-bottom: 8px; line-height: 1.2; }
  .card-sub { font-size: 11px; color: #4a4030; letter-spacing: 1px; margin-bottom: 28px; line-height: 1.6; }
 
  .input-wrap { position: relative; margin-bottom: 20px; }
  .input-prefix { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #8B6914; font-size: 14px; font-weight: 700; pointer-events: none; }
 
  .input-field {
    width: 100%; background: rgba(201,168,76,0.04); border: 1px solid #2A2200;
    border-radius: 10px; padding: 14px 14px 14px 32px;
    font-family: 'Space Mono', monospace; font-size: 14px; color: #fff;
    outline: none; transition: border-color 0.2s, box-shadow 0.2s;
  }
  .input-field:focus { border-color: #8B6914; box-shadow: 0 0 0 3px rgba(201,168,76,0.08); }
  .input-field::placeholder { color: #2a2010; }
 
  .btn-primary {
    width: 100%;
    background: linear-gradient(135deg, #8B6914, #C9A84C, #8B6914);
    background-size: 200% 200%;
    border: none; border-radius: 10px; padding: 15px;
    font-family: 'Space Mono', monospace; font-size: 13px; font-weight: 700;
    color: #000; letter-spacing: 2px; text-transform: uppercase;
    cursor: pointer; transition: all 0.3s;
    animation: shimmer 3s ease infinite;
  }
  @keyframes shimmer {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(201,168,76,0.25); }
  .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
 
  .btn-back {
    background: transparent; border: 1px solid #2A2200; border-radius: 10px; padding: 15px 20px;
    font-family: 'Space Mono', monospace; font-size: 13px; color: #4a4030;
    cursor: pointer; transition: all 0.2s;
  }
  .btn-back:hover { border-color: #8B6914; color: #C9A84C; }
 
  .btn-row { display: flex; gap: 12px; }
  .btn-row .btn-primary { flex: 1; }
 
  .task-item {
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(201,168,76,0.03); border: 1px solid #2A2200;
    border-radius: 10px; padding: 16px 18px; margin-bottom: 12px;
    transition: all 0.3s; cursor: pointer;
  }
  .task-item.done { border-color: rgba(201,168,76,0.2); background: rgba(201,168,76,0.06); }
  .task-item.done .task-text { text-decoration: line-through; color: #8B6914; }
  .task-text { font-size: 12px; color: #8a7040; line-height: 1.5; flex: 1; transition: all 0.3s; }
 
  .task-check {
    width: 28px; height: 28px; border-radius: 50%; border: 1.5px solid #2A2200;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; margin-left: 12px; transition: all 0.3s;
  }
  .task-check.done { background: #C9A84C; border-color: #C9A84C; box-shadow: 0 0 8px rgba(201,168,76,0.4); }
 
  .info-row { display: flex; gap: 12px; margin-bottom: 20px; }
  .info-box { flex: 1; background: rgba(201,168,76,0.04); border: 1px solid #2A2200; border-radius: 10px; padding: 14px 16px; }
  .info-label { font-size: 8px; letter-spacing: 3px; color: #3a3020; text-transform: uppercase; margin-bottom: 6px; }
  .info-value { font-size: 14px; color: #C9A84C; font-weight: 700; }
  .info-value.active { color: #4ade80; }
 
  .referral-box { background: rgba(201,168,76,0.04); border: 1px solid #2A2200; border-radius: 10px; padding: 18px; margin-bottom: 20px; }
  .ref-label { font-size: 8px; letter-spacing: 3px; color: #8B6914; text-transform: uppercase; margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
  .ref-dot { width: 6px; height: 6px; border-radius: 50%; background: #C9A84C; animation: blink 2s ease-in-out infinite; }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
 
  .ref-link-row { display: flex; gap: 10px; align-items: center; }
  .ref-link { flex: 1; background: transparent; border: 1px solid #2A2200; border-radius: 8px; padding: 10px 12px; font-family: 'Space Mono', monospace; font-size: 11px; color: #4a4030; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .copy-btn { background: #8B6914; border: none; border-radius: 8px; padding: 10px 14px; font-family: 'Space Mono', monospace; font-size: 11px; color: #fff; cursor: pointer; transition: all 0.2s; flex-shrink: 0; }
  .copy-btn:hover { background: #C9A84C; color: #000; }
 
  .share-btn {
    width: 100%; background: transparent; border: 1px solid #2A2200; border-radius: 10px; padding: 13px;
    font-family: 'Space Mono', monospace; font-size: 12px; color: #C9A84C;
    cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .share-btn:hover { border-color: #C9A84C; background: rgba(201,168,76,0.06); }
 
  .leaderboard-box {
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(201,168,76,0.03); border: 1px solid #2A2200;
    border-radius: 10px; padding: 16px 18px; margin-bottom: 20px;
  }
  .lb-label { font-size: 9px; letter-spacing: 3px; color: #3a3020; text-transform: uppercase; }
  .lb-value { font-size: 12px; color: #8B6914; margin-top: 4px; }
 
  .success-icon {
    width: 64px; height: 64px; border-radius: 50%;
    background: rgba(201,168,76,0.1); border: 2px solid #C9A84C;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 24px; font-size: 28px;
    box-shadow: 0 0 30px rgba(201,168,76,0.2);
    animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  }
  @keyframes popIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
 
  .wallet-option {
    display: flex; align-items: center; gap: 14px;
    background: rgba(201,168,76,0.03); border: 1px solid #2A2200;
    border-radius: 10px; padding: 16px 18px; margin-bottom: 12px;
    cursor: pointer; transition: all 0.2s;
  }
  .wallet-option:hover { border-color: #8B6914; background: rgba(201,168,76,0.06); }
  .wallet-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
  .wallet-name { font-size: 13px; color: #8a7040; }
  .wallet-arrow { margin-left: auto; color: #3a3020; }
 
  .footer-note { font-size: 9px; color: #2a2010; letter-spacing: 1px; text-align: center; margin-top: 32px; line-height: 1.8; }
  .error-msg { font-size: 10px; color: #c0392b; letter-spacing: 1px; margin-top: 8px; margin-bottom: 12px; }
`;
 
const SproutLogo = () => (
  <svg className="logo-icon" viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B6914" />
        <stop offset="50%" stopColor="#E8C96A" />
        <stop offset="100%" stopColor="#8B6914" />
      </linearGradient>
    </defs>
    <path d="M32 56 C32 56 32 30 32 24" stroke="url(#g1)" strokeWidth="3" strokeLinecap="round"/>
    <path d="M32 36 C28 32 18 28 14 20 C22 18 30 24 32 30" fill="url(#g1)" opacity="0.9"/>
    <path d="M32 28 C36 24 46 20 50 12 C42 10 34 16 32 22" fill="url(#g1)"/>
    <circle cx="32" cy="20" r="3" fill="#E8C96A" opacity="0.6"/>
    <circle cx="32" cy="56" r="4" fill="url(#g1)" opacity="0.4"/>
  </svg>
);
 
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 7L6 11L12 3" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
 
export default function Home() {
  const [step, setStep] = useState(1);
  const [handle, setHandle] = useState("");
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState([false, false, false]);
  const [copied, setCopied] = useState(false);
 
  const referralLink = handle
    ? `https://sugarsprout.xyz/?ref=${handle.replace("@", "")}`
    : "https://sugarsprout.xyz/?ref=you";
 
  const toggleTask = (i: number) => {
    const next = [...tasks];
    next[i] = !next[i];
    setTasks(next);
  };
 
  const allTasksDone = tasks.every(Boolean);
 
  const handleContinueStep1 = () => {
    if (!handle.trim()) { setError("Enter your X handle to continue."); return; }
    setError("");
    setStep(2);
  };
 
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
 
  const stepStatus = (n: number) => {
    if (step > n) return "done";
    if (step === n) return "active";
    return "";
  };
 
  return (
    <>
      <style>{styles}</style>
      <div className="grain" />
      <div className="glow-bg" />
 
      <div className="container">
        <div className="logo-wrap">
          <SproutLogo />
          <div className="logo-title">SugarSprout</div>
          <div className="logo-sub">NFT Arc · Genesis Collection · Base</div>
        </div>
 
        <div className="divider" />
 
        {step < 4 && (
          <div className="stepper">
            {[["1","Identity"],["2","Tasks"],["3","Wallet"],["4","Done"]].map(([n, label], i) => (
              <div key={label} style={{display:"flex",alignItems:"center"}}>
                <div className="step-item">
                  <div className={`step-circle ${stepStatus(i+1)}`}>
                    {step > i+1 ? <CheckIcon /> : n}
                  </div>
                  <div className={`step-label ${stepStatus(i+1)}`}>{label}</div>
                </div>
                {i < 3 && <div className={`step-line ${step > i+1 ? "done" : ""}`} />}
              </div>
            ))}
          </div>
        )}
 
        {step === 1 && (
          <>
            <div className="step-badge">Step 1 of 3</div>
            <div className="card">
              <div className="card-title">Who are you?</div>
              <div className="card-sub">Link your X account to claim your spot in the SugarSprout Genesis allowlist.</div>
              <div className="input-wrap">
                <span className="input-prefix">@</span>
                <input
                  className="input-field"
                  placeholder="yourhandle"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value.replace("@", ""))}
                  onKeyDown={(e) => e.key === "Enter" && handleContinueStep1()}
                />
              </div>
              {error && <div className="error-msg">{error}</div>}
              <button className="btn-primary" onClick={handleContinueStep1}>Continue →</button>
            </div>
          </>
        )}
 
        {step === 2 && (
          <>
            <div className="step-badge">Step 2 of 3</div>
            <div className="card">
              <div className="card-title">Let&apos;s grow together...</div>
              <div className="card-sub">Complete all tasks then mark them done</div>
              {[
                "Follow @SugarSproutNFT on X",
                'Like & quote the pinned post with a bullish caption containing "SugarSprout"',
                "Tag 2 friends on the pinned post"
              ].map((task, i) => (
                <div key={i} className={`task-item ${tasks[i] ? "done" : ""}`} onClick={() => toggleTask(i)}>
                  <div className="task-text">{task}</div>
                  <div className={`task-check ${tasks[i] ? "done" : ""}`}>
                    {tasks[i] && <CheckIcon />}
                  </div>
                </div>
              ))}
              <div style={{height: 8}} />
              <div className="btn-row">
                <button className="btn-back" onClick={() => setStep(1)}>←</button>
                <button className="btn-primary" disabled={!allTasksDone} onClick={() => setStep(3)}>All done →</button>
              </div>
            </div>
          </>
        )}
 
        {step === 3 && (
          <>
            <div className="step-badge">Step 3 of 3</div>
            <div className="card">
              <div className="card-title">Connect your wallet</div>
              <div className="card-sub">Link a Base-compatible wallet to secure your spot. We&apos;ll never request funds or approvals.</div>
              {[
                { icon: "🦊", name: "MetaMask" },
                { icon: "🔵", name: "Coinbase Wallet" },
                { icon: "🌈", name: "Rainbow" },
                { icon: "🔗", name: "WalletConnect" },
              ].map((w) => (
                <div key={w.name} className="wallet-option" onClick={() => setStep(4)}>
                  <div className="wallet-icon">{w.icon}</div>
                  <div className="wallet-name">{w.name}</div>
                  <div className="wallet-arrow">→</div>
                </div>
              ))}
              <div style={{height: 4}} />
              <div className="btn-row">
                <button className="btn-back" onClick={() => setStep(2)}>←</button>
              </div>
            </div>
          </>
        )}
 
        {step === 4 && (
          <div className="card" style={{textAlign:"center"}}>
            <div className="success-icon">✦</div>
            <div className="card-title" style={{textAlign:"center", marginBottom:8}}>Entry recorded</div>
            <div className="card-sub" style={{textAlign:"center", marginBottom:24}}>You&apos;re early. The leaderboard drops soon.</div>
            <div className="info-row">
              <div className="info-box">
                <div className="info-label">Handle</div>
                <div className="info-value">@{handle || "you"}</div>
              </div>
              <div className="info-box">
                <div className="info-label">Status</div>
                <div className="info-value active">● Active</div>
              </div>
            </div>
            <div className="leaderboard-box">
              <div>
                <div className="lb-label">Leaderboard</div>
                <div className="lb-value">Coming soon...</div>
              </div>
              <div style={{fontSize: 24}}>🏆</div>
            </div>
            <div className="referral-box">
              <div className="ref-label">
                <span className="ref-dot" />
                Your Referral Link
              </div>
              <div className="ref-link-row">
                <div className="ref-link">{referralLink}</div>
                <button className="copy-btn" onClick={handleCopy}>{copied ? "✓ Copied" : "Copy"}</button>
              </div>
            </div>
            <button className="share-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Share on X
            </button>
          </div>
        )}
 
        <div className="footer-note">
          SugarSprout Genesis NFT · Built on Base · Not financial advice
        </div>
      </div>
    </>
  );
}