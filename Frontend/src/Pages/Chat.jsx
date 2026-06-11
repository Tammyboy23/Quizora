import { useState, useRef, useEffect } from "react"
import toast from "react-hot-toast";
import { LuSend, LuTrash2, LuBot, LuUser, LuLoader } from "react-icons/lu"

function Chat(){
    const [messages, setMessages] = useState([]);
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const bodyRef = useRef(null);

    const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, [messages, loading]);

    const sendMessage = async () => {
        const text = prompt.trim();
        if (!text || loading) return;

        // Build conversation history for the API
        const conversation = [
            {
                role: "system",
                content: "You are an AI assistant known as Quizora. Your main purpose is to help people explain topics and understand concepts better. You were created by Tamilore as a project and you are friendly, helpful, and thorough in your explanations."
            },
            ...messages.map(m => ({
                role: m.role,
                content: m.content
            })),
            {
                role: "user",
                content: text
            }
        ];

        // Add user message to UI immediately
        setMessages(prev => [...prev, { role: "user", content: text }]);
        setPrompt("");
        setLoading(true);

        try {
            const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + API_KEY,
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: conversation,
                }),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error?.message || `HTTP ${res.status}`);
            }

            const data = await res.json();
            const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";
            setMessages(prev => [...prev, { role: "assistant", content: reply }]);
        } catch (err) {
            toast.error(err.message || "Something went wrong. Please try again.");
            // Remove the user's message if the API call failed, so they can retry
            setMessages(prev => prev.slice(0, -1));
        } finally {
            setLoading(false);
        }
    };

    const clearChat = () => {
        if (messages.length === 0) return;
        setMessages([]);
        toast.success("Chat cleared");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="chat">
            {/* Header */}
            <div className="chat-top">
                <div className="chat-top-left">
                    <LuBot size={22} color="var(--accent2)" />
                    <h1>Quizora Chat</h1>
                </div>
                <button
                    className="chat-clear-btn"
                    onClick={clearChat}
                    disabled={messages.length === 0}
                    title="Clear conversation"
                >
                    <LuTrash2 size={18} />
                </button>
            </div>

            {/* Messages */}
            <div className="chat-body" ref={bodyRef}>
                {messages.length === 0 ? (
                    <div className="chat-empty">
                        <LuBot size={48} />
                        <h2>Ask me anything!</h2>
                        <p>I can help explain topics, answer questions, and clarify concepts.</p>
                    </div>
                ) : (
                    messages.map((msg, i) => (
                        <div key={i} className={`message ${msg.role}`}>
                            <div className="message-avatar">
                                {msg.role === "user" ? (
                                    <LuUser size={16} />
                                ) : (
                                    <LuBot size={16} />
                                )}
                            </div>
                            <div className="message-bubble">
                                <div className="message-content">{msg.content}</div>
                            </div>
                        </div>
                    ))
                )}

                {/* Typing indicator */}
                {loading && (
                    <div className="message assistant">
                        <div className="message-avatar">
                            <LuBot size={16} />
                        </div>
                        <div className="message-bubble typing-bubble">
                            <span className="typing-dot" />
                            <span className="typing-dot" />
                            <span className="typing-dot" />
                        </div>
                    </div>
                )}
            </div>

            {/* Input bar */}
            <div className="chat-bottom">
                <input
                    type="text"
                    placeholder="Ask about anything..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={loading}
                />
                <button
                    className="chat-send-btn"
                    onClick={sendMessage}
                    disabled={!prompt.trim() || loading}
                >
                    {loading ? (
                        <LuLoader size={20} className="spin-icon" />
                    ) : (
                        <LuSend size={18} />
                    )}
                </button>
            </div>
        </div>
    );
}

export default Chat