import React, { useState, useEffect } from 'react';
import './styles/globals.css';
import { Copy, Play, Settings, User, Activity, X, Minus, LogOut, Check, Cpu } from 'lucide-react';

export default function App() {
  const [account, setAccount] = useState(null);
  const [status, setStatus] = useState({ online: true, players: { online: 142, max: 200 } });
  const [isLaunching, setIsLaunching] = useState(false);
  const [progressText, setProgressText] = useState('O‘yinga tayyor');
  const [progressPercent, setProgressPercent] = useState(0);

  // Modals
  const [showSettings, setShowSettings] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Settings
  const [ram, setRam] = useState(4096);
  const [offlineNick, setOfflineNick] = useState('');
  const [copied, setCopied] = useState(false);

  const IP = "play.neoterra.uz";

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.getCurrentAccount().then((acc) => {
        if (acc) setAccount(acc);
      });

      window.electronAPI.onSyncProgress((data) => {
        setProgressText(data.status);
        setProgressPercent(data.progress);
      });

      window.electronAPI.onLaunchEvent((event) => {
        if (event.type === 'close') {
          setIsLaunching(false);
          setProgressText('O‘yin yopildi.');
        }
      });
    }
  }, []);

  const copyIP = () => {
    navigator.clipboard.writeText(IP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMicrosoftLogin = async () => {
    try {
      if (!window.electronAPI) return;
      const acc = await window.electronAPI.loginMicrosoft();
      setAccount(acc);
      setShowAuthModal(false);
    } catch (e) {
      alert("Microsoft Login Xatosi: " + e.message);
    }
  };

  const handleOfflineLogin = (e) => {
    e.preventDefault();
    if (!offlineNick || offlineNick.trim().length < 3) {
      alert("Taxallus kamida 3 ta belgidan iborat bo'lishi kerak!");
      return;
    }
    if (window.electronAPI) {
      const acc = window.electronAPI.loginOffline(offlineNick.trim());
      setAccount(acc);
      setShowAuthModal(false);
    }
  };

  const handleLogout = async () => {
    if (window.electronAPI) {
      await window.electronAPI.logout();
      setAccount(null);
    }
  };

  const handlePlay = async () => {
    if (!account) {
      setShowAuthModal(true);
      return;
    }

    setIsLaunching(true);
    setProgressText('Fayllar sinxronlashtirilmoqda...');
    setProgressPercent(5);

    try {
      if (window.electronAPI) {
        await window.electronAPI.startGame({ ram });
      } else {
        alert("Electron API mavjud emas (Dev browser rejimida).");
        setIsLaunching(false);
      }
    } catch (e) {
      alert("Xatolik: " + e.message);
      setIsLaunching(false);
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', backgroundColor: '#090a10' }}>
      
      {/* Liquid Mesh Ambient Gradient Blobs (site.neoterra.uz) */}
      <div style={{ position: 'absolute', top: '10%', left: '15%', width: 480, height: 480, background: 'rgba(236, 72, 153, 0.15)', filter: 'blur(140px)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '15%', width: 480, height: 480, background: 'rgba(139, 92, 246, 0.15)', filter: 'blur(140px)', borderRadius: '50%', pointerEvents: 'none' }} />

      {/* Custom Windows Titlebar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px', zIndex: 50, WebkitAppRegion: 'drag' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontWeight: 900, letterSpacing: '1.5px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>NEOTERRA CLIENT</span>
        </div>
        <div style={{ display: 'flex', gap: '14px', WebkitAppRegion: 'no-drag' }}>
          <button onClick={() => window.electronAPI?.minimizeWindow()} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}><Minus size={18} /></button>
          <button onClick={() => window.electronAPI?.closeWindow()} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}><X size={18} /></button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, padding: '0 24px' }}>
        
        {/* Floating Glass Logo (Matching site.neoterra.uz) */}
        <div className="glass-effect animate-float liquid-shadow" style={{ width: 165, height: 165, borderRadius: '50%', padding: '6px', border: '1px solid rgba(255,255,255,0.25)', marginBottom: '20px' }}>
          <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', position: 'relative' }}>
            <img src="/neoterra-new-logo.jpg" alt="NeoTerra Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        {/* Hero Title */}
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', fontStyle: 'italic', margin: 0, textAlign: 'center', letterSpacing: '-1px', lineHeight: 1.1 }}>
          O'ZBEKISTONNING <br />
          <span style={{ background: 'linear-gradient(to right, #ec4899, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            ZAMONAVIY
          </span> SERVERI
        </h1>

        {/* IP and Status Pills */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
          
          {/* IP Copy Pill */}
          <div onClick={copyIP} className="glass-effect" style={{ borderRadius: '2rem', padding: '10px 24px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '9px', textTransform: 'uppercase', color: '#ec4899', fontWeight: 800, letterSpacing: '2px' }}>SERVER IP</div>
              <div style={{ fontSize: '1.1rem', fontFamily: 'monospace', fontWeight: 700 }}>{IP}</div>
            </div>
            {copied ? <Check size={18} color="#10b981" /> : <Copy size={18} color="rgba(255,255,255,0.5)" />}
          </div>

          {/* Online Counter Pill */}
          <div className="glass-effect" style={{ borderRadius: '2rem', padding: '10px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: 120 }}>
            <span className="liquid-shadow" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>{status.players.online}</span>
            <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', fontWeight: 800, letterSpacing: '2px' }}>ONLINE</span>
          </div>

          {/* Account Profile Pill */}
          <div onClick={() => setShowAuthModal(true)} className="glass-effect" style={{ borderRadius: '2rem', padding: '10px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <User size={18} color="#8b5cf6" />
            <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>
              {account ? account.name : 'Akkauntga kirish'}
            </div>
          </div>

          {/* Settings Button */}
          <div onClick={() => setShowSettings(true)} className="glass-effect" style={{ borderRadius: '2rem', padding: '10px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Settings size={20} color="rgba(255,255,255,0.8)" />
          </div>
        </div>

        {/* Action Button Section */}
        <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 380 }}>
          {isLaunching && (
            <div style={{ width: '100%', marginBottom: '12px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#ec4899', fontWeight: 600 }}>{progressText}</span>
              <div style={{ height: '6px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '6px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progressPercent}%`, background: 'linear-gradient(to right, #ec4899, #8b5cf6)', transition: 'width 0.3s' }} />
              </div>
            </div>
          )}

          <button 
            onClick={handlePlay}
            disabled={isLaunching}
            style={{
              background: '#ffffff',
              color: '#000000',
              fontWeight: 900,
              fontStyle: 'italic',
              fontSize: '1.2rem',
              padding: '16px 40px',
              borderRadius: '2rem',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
              transition: 'all 0.2s',
              width: '100%',
              justifyContent: 'center'
            }}
          >
            <span>{isLaunching ? 'YUKLANMOQDA...' : 'O‘YNASHNI BOSHLASH'}</span>
            <Play fill="#000" size={20} />
          </button>
        </div>

      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-effect" style={{ width: 380, borderRadius: '1.5rem', padding: '28px', position: 'relative' }}>
            <button onClick={() => setShowAuthModal(false)} style={{ position: 'absolute', top: 18, right: 18, background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={18} /></button>
            <h3 style={{ margin: '0 0 20px 0', fontStyle: 'italic', textTransform: 'uppercase', fontSize: '1.4rem' }}>AKKAUNTGA KIRISH</h3>
            
            {account ? (
              <div>
                <p style={{ color: 'var(--text-muted)' }}>Faol Akkaunt: <strong style={{ color: '#fff' }}>{account.name}</strong> ({account.type})</p>
                <button onClick={handleLogout} style={{ width: '100%', padding: '12px', borderRadius: '1rem', background: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <LogOut size={16} /> CHIQISH
                </button>
              </div>
            ) : (
              <div>
                <button onClick={handleMicrosoftLogin} style={{ width: '100%', padding: '14px', borderRadius: '1rem', background: '#0067b8', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, marginBottom: '16px' }}>
                  MICROSOFT RAZMIY KIRISH
                </button>

                <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>YOKI NICKNAME BILAN</div>

                <form onSubmit={handleOfflineLogin}>
                  <input 
                    type="text" 
                    placeholder="Nickname (masalan: NeoGamer)"
                    value={offlineNick}
                    onChange={(e) => setOfflineNick(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '1rem', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', outline: 'none', marginBottom: '16px' }}
                  />
                  <button type="submit" style={{ width: '100%', padding: '12px', borderRadius: '1rem', background: 'linear-gradient(to right, #ec4899, #8b5cf6)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 800 }}>
                    KIRISH (OFFLINE)
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-effect" style={{ width: 420, borderRadius: '1.5rem', padding: '28px', position: 'relative' }}>
            <button onClick={() => setShowSettings(false)} style={{ position: 'absolute', top: 18, right: 18, background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={18} /></button>
            <h3 style={{ margin: '0 0 20px 0', fontStyle: 'italic', textTransform: 'uppercase', fontSize: '1.4rem' }}>SOZLAMALAR</h3>
            
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Cpu size={16} /> Operativ Xotira (RAM):
                </span>
                <strong style={{ color: '#ec4899' }}>{ram / 1024} GB ({ram} MB)</strong>
              </div>
              <input 
                type="range" 
                min="2048" 
                max="16384" 
                step="1024"
                value={ram}
                onChange={(e) => setRam(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#ec4899', cursor: 'pointer' }}
              />
            </div>

            <button onClick={() => setShowSettings(false)} style={{ width: '100%', padding: '12px', borderRadius: '1rem', background: 'linear-gradient(to right, #ec4899, #8b5cf6)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 800 }}>
              SAQLASH
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
