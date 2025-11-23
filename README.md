# Link -- <a href="https://tiyasbanerjee.github.io/One-To-One/">|O|</a>

<div align="center">

# ⚡ One-to-One | P2P Uplink
### Serverless Zero-Trust Communication

[![Status](https://img.shields.io/badge/Status-V2_Optimized-00ff00?style=for-the-badge&logo=statuspage)](https://github.com/tiyasbanerjee/One-To-One)
[![Architecture](https://img.shields.io/badge/Arch-Serverless_WebRTC-blueviolet?style=for-the-badge&logo=webrtc)](https://webrtc.org/)
[![Encryption](https://img.shields.io/badge/Security-E2EE_(DTLS%2FSRTP)-red?style=for-the-badge&logo=lock)](https://github.com/tiyasbanerjee/One-To-One)

<br />
<a href="https://tiyasbanerjee.github.io/One-To-One/">
  <img src="https://img.shields.io/badge/LAUNCH_APP-Click_Here_To_Start_Encryption-%23000?style=for-the-badge&labelColor=black&color=white" alt="Launch App" />
</a>
<br />
<br />

</div>

---

## 🔮 Overview

**One-to-One** is a lightweight, zero-trust communication system that establishes direct peer-to-peer connectivity **without any intermediary message server**. 

It utilizes a **Manual Signaling Handshake**, converting complex SDP data into compact Base64 Security Tokens. This ensures that you and your peer are the *only* two people involved in the connection process.

> **Philosophy:** No backend. No logs. No persistent data. Close the tab, and the conversation ceases to exist.

---

## ⚡ Key Features

| Feature | Description |
| :--- | :--- |
| **👻 Serverless & Ephemeral** | No database or signaling server. All data lives in RAM and vanishes upon refresh. |
| **🛡️ Hex-Identity** | Generates unique **Group Keys** via temporal-hex entropy logic for secure pairing. |
| **🤝 Manual Signaling** | Users exchange encrypted SDP tokens manually (via DM/Email/Signal) for absolute trust. |
| **🎨 Neon Glass UI** | Reactive UI with glassmorphism aesthetics and deterministic coloring based on alias hashing. |

---

## 📖 How to Connect (Manual Handshake)

Since there is no server to "introduce" peers, you perform the handshake yourself:

1.  **Peer A:** Generates an **Offer Token**.
2.  **Peer A:** Sends this token to Peer B (via any external secure channel).
3.  **Peer B:** Pastes the token and generates an **Answer Token**.
4.  **Peer B:** Sends the Answer back to Peer A.
5.  **Peer A:** Accepts the Answer.
6.  **Connected:** The secure P2P Data Channel opens.

---

## 🛠 Tech Stack

Built with a focus on semantic structure and zero dependencies.

* **Structure:** HTML5 (Semantic)
* **Style:** Tailwind CSS (CDN) + CSS Variables (Neon/Glass effects)
* **Logic:** Vanilla JavaScript (ES6+)
* **Protocol:** WebRTC (RTCPeerConnection + RTCDataChannel)

---

## 🚀 Quick Start

This project is client-side only. You do not need `npm` or `node_modules`.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/one-to-one.git](https://github.com/your-username/one-to-one.git)
