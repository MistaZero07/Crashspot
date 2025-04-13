import { useState } from 'react';

const dummyResponses = [
  "Crash frequency is rising this month. 🚧",
  "Lighting upgrades are needed in several areas.",
  "Petitions are gaining momentum! 📢",
  "Accident reports show increased pedestrian risk.",
  "The city has responded to 3 petitions so far.",
  "Speed bumps suggested near school zones.",
];

export default function ChatAssistant() {
  const [messages, setMessages] = useState([
    { from: 'ai', text: '👋 Ask me about crash data, reports, or petitions.' },
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    const aiReply = {
      from: 'ai',
      text: dummyResponses[Math.floor(Math.random() * dummyResponses.length)],
    };

    setMessages((prev) => [...prev, userMessage, aiReply]);
    setInput('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-indigo-700"
        >
          💬 Ask AI
        </button>
      )}

      {isOpen && (
        <div className="w-80 bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
          <div className="bg-indigo-600 text-white px-4 py-2 flex justify-between items-center">
            <h3 className="font-semibold text-sm">AI Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-sm">×</button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto max-h-80 space-y-2 text-sm text-gray-800">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-md max-w-xs ${
                  msg.from === 'user'
                    ? 'bg-indigo-100 self-end text-right ml-auto'
                    : 'bg-gray-100 self-start'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-2 border-t flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              className="flex-1 border rounded px-2 py-1 text-sm"
            />
            <button
              onClick={sendMessage}
              className="bg-indigo-600 text-white text-sm px-3 py-1 rounded hover:bg-indigo-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
