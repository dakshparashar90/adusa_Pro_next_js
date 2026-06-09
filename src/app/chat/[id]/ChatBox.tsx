"use client";

import { pusherClient } from "@/src/lib/pusher-client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

type Props = {
  receiverId: string;
  receiverName: string;
};

type Message = {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
};

export default function ChatBox({
  receiverId,
  receiverName,
}: Props) {
  const { data: session } = useSession();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  // Initial Messages Load
  useEffect(() => {
    async function fetchMessages() {
      const res = await fetch(
        `/api/messages/${receiverId}`
      );

      const data = await res.json();

      setMessages(data);
    }

    fetchMessages();
  }, [receiverId]);

  // Pusher Listener
  useEffect(() => {
    if (!session?.user?.id) return;

    const userId = session.user.id;

    const channel =
      pusherClient.subscribe(userId);

    channel.bind(
      "new-message",
      (message: Message) => {
        setMessages((prev) => [
          ...prev,
          message,
        ]);
      }
    );

    return () => {
      channel.unbind_all();
      pusherClient.unsubscribe(userId);
    };
  }, [session]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const res = await fetch(
      "/api/messages",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          senderId: session?.user?.id,
          receiverId,
          content: message,
        }),
      }
    );

    const newMessage =
      await res.json();

    // Sender side pe turant show
    setMessages((prev) => [
      ...prev,
      newMessage,
    ]);

    setMessage("");
  };

  return (
    <div className="h-screen flex flex-col">

      <div className="border-b p-4 font-bold">
        {receiverName}
      </div>

      <div className="flex-1 overflow-y-auto p-4">

        {messages.map((msg) => {
          const isMe =
            msg.senderId ===
            session?.user?.id;

          return (
            <div
              key={msg.id}
              className={`flex mb-2 ${
                isMe
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`px-3 py-2 rounded-lg max-w-xs ${
                  isMe
                    ? "bg-green-300"
                    : "bg-gray-300"
                }`}
              >
                {msg.content}
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t p-4 flex gap-2">
        <input
          className="border flex-1 p-2"
          placeholder="Type a message..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
        />

        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4"
        >
          Send
        </button>
      </div>
    </div>
  );
}