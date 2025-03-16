import { useState, useEffect } from "react";
import io from "socket.io-client";
import "./index.css";

const socket = io("http://localhost:5000");

export default function App() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("receiveMessage", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => socket.off("receiveMessage");
    }, []);
    // // Cleanup function to remove event listener when component unmounts
        // const cleanup = () => {
        //     socket.off("receiveMessage");
        // };
        // return cleanup;

    const sendMessage = (e) => {
        e.preventDefault();
        if (!message) return;
        socket.emit("sendMessage", message);
        setMessage("");
    };

    return (
        <div className="chat-container">
            <h2>Chat App</h2>
            <div className="messages">
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

// // Render the chat application
// return (
//     // Main container for the chat app
//     <div className="chat-container">
//         {/* Chat title */}
//         <h2>Chat App</h2>

//         {/* Messages display area */}
//         <div className="messages">
//             {/* Loop through messages array and display each message */}
//             {messages.map((message, index) => (
//                 <p key={index}>{message}</p>
//             ))}
//         </div>

//         {/* Message input form */}
//         <form onSubmit={sendMessage}>
//             {/* Text input for new messages */}
//             <input
//                 type="text"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Type a message..."
//             />
//             {/* Submit button */}
//             <button type="submit">Send</button>
