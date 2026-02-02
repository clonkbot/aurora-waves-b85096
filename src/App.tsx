import { useState, useEffect } from 'react'
import './App.css'

interface ColorOption {
  id: string
  name: string
  colors: string[]
}

const colorOptions: ColorOption[] = [
  { id: 'aurora', name: 'Aurora', colors: ['#00d4aa', '#00b4d8', '#9b5de5', '#f15bb5'] },
  { id: 'sunset', name: 'Sunset', colors: ['#ff6b6b', '#ffa06b', '#ffd93d', '#ff8fab'] },
  { id: 'ocean', name: 'Ocean', colors: ['#0077b6', '#00b4d8', '#90e0ef', '#48cae4'] },
  { id: 'forest', name: 'Forest', colors: ['#2d6a4f', '#40916c', '#52b788', '#95d5b2'] },
  { id: 'cosmic', name: 'Cosmic', colors: ['#7400b8', '#6930c3', '#5e60ce', '#4ea8de'] },
]

function App() {
  const [activeColor, setActiveColor] = useState<ColorOption>(colorOptions[0])
  const [intensity, setIntensity] = useState(75)
  const [speed, setSpeed] = useState(50)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    document.documentElement.style.setProperty('--wave-color-1', activeColor.colors[0])
    document.documentElement.style.setProperty('--wave-color-2', activeColor.colors[1])
    document.documentElement.style.setProperty('--wave-color-3', activeColor.colors[2])
    document.documentElement.style.setProperty('--wave-color-4', activeColor.colors[3])
    document.documentElement.style.setProperty('--wave-speed', `${15 - (speed / 10)}s`)
    document.documentElement.style.setProperty('--wave-opacity', `${intensity / 100}`)
  }, [activeColor, intensity, speed])

  return (
    <div className="app-container">
      <div className={`wave-background ${!isPlaying ? 'paused' : ''}`}>
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
        <div className="wave wave-4"></div>
        <div className="noise-overlay"></div>
      </div>

      <div className="content">
        <header className="header">
          <div className="status-bar">
            <span className="time">{new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
            <div className="status-icons">
              <svg className="signal-icon" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="16" width="3" height="6" rx="1" />
                <rect x="7" y="12" width="3" height="10" rx="1" />
                <rect x="12" y="8" width="3" height="14" rx="1" />
                <rect x="17" y="4" width="3" height="18" rx="1" />
              </svg>
              <svg className="wifi-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 18c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-4.9-2.3l1.4 1.4C9.4 16.4 10.6 16 12 16s2.6.4 3.5 1.1l1.4-1.4C15.6 14.6 13.9 14 12 14s-3.6.6-4.9 1.7zm-2.8-2.8l1.4 1.4C7.3 13.1 9.5 12 12 12s4.7 1.1 6.3 2.3l1.4-1.4C17.7 11.1 15 10 12 10s-5.7 1.1-7.7 2.9z" />
              </svg>
              <div className="battery-icon">
                <div className="battery-level" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>
          <h1 className="app-title">Aurora</h1>
          <p className="app-subtitle">Ambient Waves</p>
        </header>

        <main className="main-content">
          <section className="color-section">
            <h2 className="section-title">Color Theme</h2>
            <div className="color-grid">
              {colorOptions.map((option) => (
                <button
                  key={option.id}
                  className={`color-button ${activeColor.id === option.id ? 'active' : ''}`}
                  onClick={() => setActiveColor(option)}
                  style={{
                    background: `linear-gradient(135deg, ${option.colors[0]}, ${option.colors[1]}, ${option.colors[2]})`,
                  }}
                >
                  <span className="color-name">{option.name}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="controls-section">
            <div className="control-group">
              <div className="control-header">
                <span className="control-label">Intensity</span>
                <span className="control-value">{intensity}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="slider"
              />
            </div>

            <div className="control-group">
              <div className="control-header">
                <span className="control-label">Speed</span>
                <span className="control-value">{speed}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="slider"
              />
            </div>
          </section>

          <section className="playback-section">
            <button
              className="play-button"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <span className="playback-label">{isPlaying ? 'Playing' : 'Paused'}</span>
          </section>

          <section className="presets-section">
            <h2 className="section-title">Quick Presets</h2>
            <div className="presets-grid">
              <button
                className="preset-button"
                onClick={() => { setActiveColor(colorOptions[0]); setIntensity(60); setSpeed(30); }}
              >
                <span className="preset-icon">🌙</span>
                <span className="preset-name">Sleep</span>
              </button>
              <button
                className="preset-button"
                onClick={() => { setActiveColor(colorOptions[4]); setIntensity(80); setSpeed(70); }}
              >
                <span className="preset-icon">🧘</span>
                <span className="preset-name">Meditate</span>
              </button>
              <button
                className="preset-button"
                onClick={() => { setActiveColor(colorOptions[1]); setIntensity(90); setSpeed(85); }}
              >
                <span className="preset-icon">⚡</span>
                <span className="preset-name">Focus</span>
              </button>
              <button
                className="preset-button"
                onClick={() => { setActiveColor(colorOptions[2]); setIntensity(50); setSpeed(40); }}
              >
                <span className="preset-icon">🌊</span>
                <span className="preset-name">Relax</span>
              </button>
            </div>
          </section>
        </main>

        <footer className="app-footer">
          <span>Requested by @BosonJoe · Built by @clonkbot</span>
        </footer>
      </div>

      <nav className="bottom-nav">
        <button className="nav-item active">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3l9 8h-3v10h-5v-6h-2v6H6V11H3l9-8z" />
          </svg>
          <span>Home</span>
        </button>
        <button className="nav-item">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" fillOpacity="0" stroke="currentColor" strokeWidth="2" />
            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
          <span>Timer</span>
        </button>
        <button className="nav-item">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
          <span>Sounds</span>
        </button>
        <button className="nav-item">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
          </svg>
          <span>Settings</span>
        </button>
      </nav>
    </div>
  )
}

export default App