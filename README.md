# One-To-One

<h1><a href="#" target="_blank">A handy wakiTalki</a></h1>

<h4><b>How i got the idea?</b></h4>
one day , it's maybe a year ago, i listened that meta is removeing it's end to end enqureption from instragram chats.

i knew that young people loved to use instragram type of chats , specialy young couples for privacy reasons.

i thought in this specific situation,
* user trust another user
* both user wants full privacy
* both dont trust any servers or 3ed party

,,,and what can be better than this situation for applying WebRTC...

---
<h3><b>How this works?</b></h3>

This uses a standerd web protocal , WebRtc.
this is like a direct peer to peer connection with no one in between.
the way i made it , it is a pure peer connection. like plugging a jack between two phones.

* your phone first asks in the internet whats its public ip ( this uses standerd google stun servers)

* then it generates a request containg its own capabilties and essencial information to guide the other device to connect with it.

* in other apps , this hand-shake , like sending your phone's token to the another happens through a server in between, but as i told this has no servers. so the users have to make the handsake.

* now after both devices get to know each other they will establish a WebRtc chanel, it would be a DTLS data chanel.

* now the devices are ready to talk to each other.

<h3>what does peer connection means?</h3>

peer connection means you are not relaying on any server, insted your device directly talks with another device..

---
<h3><b> is this safe?</b></h3>

this is completely safe! even safer than relaying on servers!
but only when you trust the other person or your peer.
if he/she is not trsuted then its recomended not to use it, 
because you are shareing your public ip and device specs.

in normal day stuffs like server bassed stuffs , where there is a server between two peers , you ussaly trust the server, insted of peer and share this informations with the server...

thats the diffrence..
