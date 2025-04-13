import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function PetitionSummaryBot() {
  const [messages, setMessages] = useState([
    { from: 'ai', text: '👋 Ask me about current petitions, top requests, or petition categories.' },
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [petitions, setPetitions] = useState([]);

  useEffect(() => {
    const fetchPetitions = async () => {
      const snapshot = await getDocs(collection(db, 'petitions'));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPetitions(data);
    };

    fetchPetitions();
  }, []);

  const generateReply = (input) => {
    if (petitions.length === 0) return "⏳ Still loading petitions. Try again soon.";

    const lower = input.toLowerCase();
    const top = [...petitions].sort((a, b) => b.upvotes - a.upvotes)[0];
    const categoryCount = {};

    petitions.forEach((p) => {
      categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
    });

    if (lower.includes('top') || lower.includes('most')) {
      return `📣 Top petition: "${top.title}" (${top.upvotes} upvotes) at ${top.location}`;
    } else if (lower.includes('how many') || lower.includes('filed')) {
      return `🗳️ Total petitions filed: ${petitions.length}`;
    } else if (lower.includes('category') || lower.includes('type')) {
      const summary = Object.entries(categoryCount)
        .map(([k, v]) => `${k}: ${v}`)
        .join(', ');
      return `📂 Petition categories: ${summary}`;
    } else if (lower.includes('urgent')) {
      return `⚠️ No urgency tags yet, but "${top.title}" has the most support.`;
    } else {
      return `🤖 I'm not sure. Ask me about top petitions, number of filed ones, or categories.`;
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { from: 'user', text: input };
    const botMsg = { from: 'ai', text: generateReply(input) };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
  };

  return (
    <div className="fixed bottom-5 left-5 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-indigo-700"
        >
          🧠 Petition Bot
        </button>
      )}

      {isOpen && (
        <div className="w-80 bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
          <div className="bg-indigo-600 text-white px-4 py-2 flex justify-between items-center">
            <h3 className="font-semibold text-sm">Petition Summary Bot</h3>
            <button onClick={() => setIsOpen(false)} className="text-sm font-bold">×</button>
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
