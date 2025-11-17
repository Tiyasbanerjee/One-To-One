const net = require("net");

// Create listening peer
const server = net.createServer((socket) => {
    console.log("Connected to Peer B");

    socket.on("data", (data) => {
        console.log("Peer B:", data.toString());
    });

    process.stdin.on("data", (input) => {
        socket.write(input.toString().trim());
    });
});

server.listen(5000, () => {
    console.log("Peer A waiting on port 5000...");
});
