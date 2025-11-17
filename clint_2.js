const net = require("net");

// Connect to Peer A
const socket = net.connect(5000, "127.0.0.1", () => {
    console.log("Connected to Peer A");

    process.stdin.on("data", (input) => {
        socket.write(input.toString().trim());
    });
});

socket.on("data", (data) => {
    console.log("Peer A:", data.toString());
});
