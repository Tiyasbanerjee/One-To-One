# one-to-one 
# P2P Uplink
# Link -- <a hrf="https://tiyasbanerjee.github.io/One-To-One/">|O|</a>
**Status:** V2 — Optimized  
**Architecture:** Serverless WebRTC  
**Encryption:** End-to-End (DTLS/SRTP)

**one-to-one** is a lightweight, zero-trust communication system that establishes direct peer-to-peer connectivity without any intermediary message server. It uses a manual signaling handshake mechanism, converting complex SDP data into compact Base64 **Security Tokens** for controlled, user-managed exchange.

---

## ⚡ Key Features

### Serverless & Ephemeral
- No backend, no logs, no persistent messages.
- Close the tab → all data disappears.

### Hex-Optimized Identity
- Generates unique **Group Keys** via temporal-hex entropy logic.

### Manual Signaling Handshake
- Users exchange encrypted SDP tokens manually for full trust and access control.

### Visual Cryptography & UI
- Glassmorphism, neon aesthetics, reactive UI elements.
- Deterministic coloring based on avatar alias hashing.
- Sanitized input rendering with basic XSS filtering.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 (Semantic) |
| Style | Tailwind CSS (via CDN) + Custom CSS Variables |
| Logic | Vanilla JavaScript (ES6+) |
| Protocol | WebRTC (RTCPeerConnection + RTCDataChannel) |

---

## 🚀 Quick Start

No installation required (client-side only, no npm/yarn dependencies).

### Clone the Repository
```bash
git clone https://github.com/your-username/one-to-one.git
