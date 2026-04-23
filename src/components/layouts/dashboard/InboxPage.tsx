"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Paperclip,
  Mic,
  Camera,
  Play,
  FileText,
  ChevronDown,
} from "lucide-react";
import { Contact, Message } from "@/type";
import { groups, persons, messages } from "@/constants";

// --- Avatar Component ---
function Avatar({
  contact,
  size = "md",
}: {
  contact: Contact;
  size?: "sm" | "md" | "lg";
}) {
  const sizeMap = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-11 h-11 text-sm",
  };
  return (
    <div
      className={`${sizeMap[size]} ${contact.color} rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0`}
    >
      {contact.initials}
    </div>
  );
}

// --- Sidebar Contact Item ---
function ContactItem({
  contact,
  active,
  onClick,
}: {
  contact: Contact;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-left ${
        active ? "bg-indigo-50 border border-indigo-100" : "hover:bg-gray-50"
      }`}
    >
      <Avatar contact={contact} />
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-semibold truncate ${active ? "text-indigo-700" : "text-gray-800"}`}
        >
          {contact.name}
        </p>
        <p className="text-xs text-gray-400 truncate flex items-center gap-1">
          {contact.hasFile && <FileText size={10} />}
          {contact.lastMessage}
        </p>
      </div>
      {contact.unread && (
        <span className="bg-indigo-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
          {contact.unread}
        </span>
      )}
    </button>
  );
}

// --- Message Bubble ---
function MessageBubble({ msg }: { msg: Message }) {
  const senderContact: Contact = {
    id: msg.id,
    name: msg.sender,
    initials: msg.sender.slice(0, 2).toUpperCase(),
    color:
      msg.sender === "Apip"
        ? "bg-indigo-400"
        : msg.sender === "Nia Slebeww"
          ? "bg-pink-400"
          : "bg-blue-500",
    avatar: "",
    lastMessage: "",
    type: "person",
  };

  if (msg.isMine) {
    return (
      <div className="flex justify-end items-end gap-2 mb-3">
        <div className="max-w-xs lg:max-w-sm">
          <div className="bg-white border border-gray-100 rounded-2xl rounded-br-sm px-4 py-2.5 shadow-sm">
            <p className="text-sm text-gray-700">{msg.content}</p>
          </div>
          <p className="text-[10px] text-gray-400 text-right mt-1">
            {msg.time}
          </p>
        </div>
        <div className="w-8 h-8 rounded-full bg-rose-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mb-4">
          AM
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2 mb-3">
      <Avatar contact={senderContact} size="sm" />
      <div className="max-w-xs lg:max-w-sm">
        <p className="text-xs font-semibold text-gray-600 mb-1">{msg.sender}</p>

        {msg.type === "text" && (
          <>
            {msg.subMessages?.map((sm, i) => (
              <div
                key={i}
                className="bg-indigo-500 text-white rounded-2xl rounded-tl-sm px-4 py-2.5 mb-1"
              >
                <p className="text-sm">{sm.content}</p>
              </div>
            ))}
          </>
        )}

        {msg.type === "audio" && (
          <>
            <div className="bg-indigo-500 rounded-2xl rounded-tl-sm px-4 py-3 mb-1 flex items-center gap-2 min-w-[200px]">
              <button className="w-7 h-7 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <Play
                  size={12}
                  className="text-indigo-500 ml-0.5"
                  fill="currentColor"
                />
              </button>
              <div className="flex items-center gap-0.5 flex-1">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-full w-1"
                    style={{
                      //   height: `${Math.random() * 16 + 4}px`,
                      opacity: i < 8 ? 1 : 0.5,
                    }}
                  />
                ))}
              </div>
              <span className="text-white text-xs opacity-70">⋯</span>
            </div>
            {msg.subMessages?.map((sm, i) => (
              <div
                key={i}
                className="bg-indigo-500 text-white rounded-2xl rounded-tl-sm px-4 py-2.5 mb-1"
              >
                <p className="text-sm">{sm.content}</p>
              </div>
            ))}
          </>
        )}

        {msg.type === "files" && (
          <>
            <div className="flex gap-2 mb-1 flex-wrap">
              {msg.files?.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2"
                >
                  <FileText size={14} className="text-amber-500" />
                  <div>
                    <p className="text-xs font-medium text-gray-700">
                      {f.name}
                    </p>
                    <p className="text-[10px] text-gray-400">{f.size}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mb-1">{msg.content}</p>
            {msg.subMessages?.map((sm, i) => (
              <div
                key={i}
                className={`rounded-2xl px-4 py-2.5 mb-1 ${
                  i === 0
                    ? "bg-emerald-500 text-white rounded-tl-sm"
                    : "bg-emerald-400 text-white rounded-tl-sm w-fit"
                }`}
              >
                <p className="text-sm">{sm.content}</p>
              </div>
            ))}
          </>
        )}

        <p className="text-[10px] text-gray-400 mt-1">{msg.time}</p>
      </div>
    </div>
  );
}

// --- Main Component ---
export default function ChatApp() {
  const [activeChat, setActiveChat] = useState<string>("g2");
  const [searchQuery, setSearchQuery] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [showGroupAll, setShowGroupAll] = useState(false);
  const [showPersonAll, setShowPersonAll] = useState(false);

  const activeContact =
    [...groups, ...persons].find((c) => c.id === activeChat) ?? groups[1];

  const visibleGroups = showGroupAll ? groups : groups.slice(0, 5);
  const visiblePersons = showPersonAll ? persons : persons.slice(0, 5);

  return (
    <div className="  h-screen bg-white w-full font-['DM_Sans',sans-serif]">
      <div className="px-4 pt-5 pb-10 ">
        {/* Search Bar */}

        <div className="flex items-center gap-2 w-full max-w-7xl ">
          <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-3.5 w-full border border-gray-400">
            <Search size={14} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search your course here...."
              className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
            <Filter size={16} className="text-gray-500" />
          </button>
        </div>
      </div>
      <div className="flex h-screen bg-gray-50 font-['DM_Sans',sans-serif] w-full ">
        {/* Sidebar */}
        <div className="w-72 bg-white flex flex-col border-r border-gray-100 flex-shrink-0">
          {/* Filter Pills */}
          <div className="px-4 pb-3 flex gap-2">
            <button className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors">
              All Category <ChevronDown size={12} />
            </button>
            <button className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors">
              Search here...
              <span className="bg-gray-300 text-gray-500 text-[9px] px-1 rounded">
                W/F
              </span>
            </button>
          </div>

          {/* Contacts List */}
          <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-4">
            {/* Groups */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1 mb-2">
                Group
              </p>
              <div className="space-y-0.5">
                {visibleGroups.map((g) => (
                  <ContactItem
                    key={g.id}
                    contact={g}
                    active={activeChat === g.id}
                    onClick={() => setActiveChat(g.id)}
                  />
                ))}
              </div>
              {groups.length > 5 && (
                <button
                  onClick={() => setShowGroupAll(!showGroupAll)}
                  className="text-xs font-semibold text-indigo-500 hover:text-indigo-700 px-4 mt-1 transition-colors"
                >
                  {showGroupAll ? "SHOW LESS" : "SHOW ALL"}
                </button>
              )}
            </div>

            {/* Persons */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1 mb-2">
                Person
              </p>
              <div className="space-y-0.5">
                {visiblePersons.map((p) => (
                  <ContactItem
                    key={p.id}
                    contact={p}
                    active={activeChat === p.id}
                    onClick={() => setActiveChat(p.id)}
                  />
                ))}
              </div>
              {persons.length > 5 && (
                <button
                  onClick={() => setShowPersonAll(!showPersonAll)}
                  className="text-xs font-semibold text-indigo-500 hover:text-indigo-700 px-4 mt-1 transition-colors"
                >
                  {showPersonAll ? "SHOW LESS" : "SHOW ALL"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-100 px-6 py-4 flex-shrink-0">
            <h2 className="text-base font-bold text-gray-800">
              {activeContact?.name}
            </h2>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-2 bg-white">
            {/* Date separator - previous */}
            {messages.slice(0, 3).map((msg) => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}

            {/* Today separator */}
            <div className="flex items-center justify-center my-4">
              <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                Today
              </span>
            </div>

            {messages.slice(3).map((msg) => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}
          </div>

          {/* Input Area */}
          <div className="bg-white mb-28 border border-gray-100 px-6 py-4 flex-shrink-0">
            <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <div className="flex items-center gap-2 text-gray-400">
                <button className="hover:text-indigo-500 transition-colors p-1">
                  <Paperclip size={18} />
                </button>
                <button className="hover:text-indigo-500 transition-colors p-1">
                  <Mic size={18} />
                </button>
                <button className="hover:text-indigo-500 transition-colors p-1">
                  <Camera size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
