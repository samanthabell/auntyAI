import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AuntyAI() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    const userMessage = { sender: "user", text: message };
    setChat([...chat, userMessage]);
    setMessage("");

    // Simulate AI response
    const aiResponse = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    }).then((res) => res.json());

    setChat([...chat, userMessage, { sender: "aunty", text: aiResponse.reply }]);
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">AuntyAI 💜</h1>
      <Card className="w-full p-4 mb-4">
        <CardContent className="space-y-2">
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg ${msg.sender === "user" ? "bg-blue-200 self-end" : "bg-gray-200"}`}
            >
              {msg.text}
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="flex w-full space-x-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask AuntyAI..."
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}
