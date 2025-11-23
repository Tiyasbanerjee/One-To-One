one-to-one // P2P Uplink

Status: V2 Optimized
Architecture: Serverless WebRTC
Encryption: End-to-End (DTLS/SRTP)

one-to-one is a lightweight, zero-trust communication tool that establishes a direct peer-to-peer connection between two clients without an intermediary message server. It uses a manual signaling handshake mechanism, converting complex Session Description Protocol (SDP) data into optimized Base64 "Security Tokens" for easy exchange.

⚡ Key Features

Serverless Architecture: No database, no backend logging, no message persistence. If the tab closes, the data ceases to exist.

Hex-Optimized Identity: Generates unique Group Keys based on a temporal-hex algorithm (Year-Month-Day-Entropy compression).

Manual Handshake: Users manually exchange encrypted SDP tokens, ensuring complete control over who connects.

Visual Cryptography:

Cyber UI: Glassmorphism, neon accents, and reactive animations.

Deterministic Coloring: User avatars are color-coded based on a hash of their alias.

Sanitized Inputs: Basic XSS prevention on message rendering.

🛠️ Tech Stack

Structure: HTML5 (Semantic)

Style: Tailwind CSS (via CDN) + Custom CSS Variables

Logic: Vanilla JavaScript (ES6+)

Protocol: WebRTC (RTCPeerConnection, RTCDataChannel)

🚀 Quick Start

Since one-to-one is client-side only, it requires no installation (npm/yarn are not needed).

Clone the Repository

git clone [https://github.com/your-username/one-to-one.git](https://github.com/your-username/one-to-one.git)


Launch
Simply open index.html in any modern browser (Chrome, Firefox, Edge, Brave).

Note: For strict browser security policies regarding clipboard access or microphone/camera (if added later), serve via a local server (e.g., Live Server in VS Code) rather than file:// protocol.

📡 Usage Protocol (The Handshake)

Because there is no server to introduce the peers, you must perform the Signaling Handshake manually.

Phase 1: Initialization (Host)

Open the app and select Create Channel.

Enter your Operator Alias.

The system generates a Group Key (for verification) and a Security Token (Offer).

Action: Copy the Security Token and send it to your peer (via email, Signal, SMS, etc.).

Phase 2: Response (Guest)

Open the app and select Join Channel.

Paste the Security Token received from the Host.

Click Generate Response. The system will process the Host's offer and generate a Response Token (Answer).

Action: Copy the Response Token and send it back to the Host.

Phase 3: Uplink (Host)

Paste the Response Token received from the Guest into the final field.

Click Establish Connection.

Status: ENCRYPTED LINK ACTIVE. Messaging may now commence.

🧠 System Architecture

The "One-Token" Optimization

Standard WebRTC requires exchanging "ICE Candidates" (network paths) separately from the "Offer/Answer" (capabilities).
one-to-one waits for the browser to finish gathering all ICE candidates before generating the token. This allows us to bundle everything into a single Base64 string:

Token = Base64( JSON.stringify( SessionDescription + ICE_Candidates ) )

The Hex-Key Logic

The Group Key is not a database ID. It is a generated artifact of the current time and entropy, converted to Hexadecimal to look "cyber" and professional:

// Logic visualization
Time(2025, 11, 24) + Entropy(Random) -> [0x7E9, 0x1A, ...] -> "7E9-1A-..."


📂 File Structure

one-to-one/
├── index.html    # The Topology (DOM Structure)
├── style.css     # The Aesthetics (Animations, Glassmorphism)
└── script.js     # The Engine (WebRTC Logic, State Management)


🔮 Future Challenges (For the Architect)

To deepen your understanding of this system, try implementing these extensions:

File Sharing: The RTCDataChannel supports binary types. Can you implement drag-and-drop file transfer?

Voice Mode: Add getUserMedia to stream an audio track over the peer connection.

Steganography: Hide the connection token inside an image or a block of standard text to mask the handshake.

System secure. End of line.