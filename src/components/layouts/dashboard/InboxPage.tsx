"use client";

import { useEffect, useState, useRef } from "react";
import {
  Search,
  Filter,
  Paperclip,
  Mic,
  Camera,
  Play,
  FileText,
  ChevronDown,
  ArrowLeft,
} from "lucide-react";
import { Contact, Message } from "@/type";
import { groups, persons, messages } from "@/constants";
import { createClientClient } from "@/utils/supabase/client";

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

  const initials = contact.initials || contact.name?.charAt(0).toUpperCase() || "?";
  const bgColor = contact.color || "bg-indigo-500";

  if (contact.avatar) {
    return (
      <img
        src={contact.avatar}
        alt={contact.name}
        className={`${sizeMap[size]} rounded-full object-cover flex-shrink-0`}
      />
    );
  }

  return (
    <div
      className={`${sizeMap[size]} ${bgColor} rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0`}
    >
      {initials}
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
          className={`text-sm font-semibold truncate ${
            active ? "text-indigo-700" : "text-gray-800"
          }`}
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
        <div className="max-w-[70%] sm:max-w-xs lg:max-w-sm">
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
      <div className="max-w-[70%] sm:max-w-xs lg:max-w-sm">
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
            <div className="bg-indigo-500 rounded-2xl rounded-tl-sm px-4 py-3 mb-1 flex items-center gap-2 min-w-[160px] sm:min-w-[200px]">
              <button className="w-7 h-7 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <Play
                  size={12}
                  className="text-indigo-500 ml-0.5"
                  fill="currentColor"
                />
              </button>
              <div className="flex items-center gap-0.5 flex-1">
                {[
                  8, 12, 16, 10, 14, 6, 18, 12, 8, 10, 16, 14, 6, 12, 10, 8, 14,
                  16, 10, 8,
                ].map((h, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-full w-1"
                    style={{ height: `${h}px`, opacity: i < 8 ? 1 : 0.5 }}
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
export default function ChatApp({ 
  initialConversations = [], 
  userId 
}: { 
  initialConversations?: any[], 
  userId?: string 
}) {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [conversations, setConversations] = useState(initialConversations);
  const [messagesList, setMessagesList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeContact = conversations.find((c) => c.id === activeChat) ?? null;

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messagesList]);


  useEffect(() => {
    if (!userId) return;

    let channel: any;

    const setupSubscriptions = async () => {
      try {
        const { createClientClient } = await import("@/utils/supabase/client");
        const supabase = createClientClient();

        // Use a more stable channel name
        const channelName = `inbox_main_${userId}`;
        console.log("InboxPage: 🔄 Menghubungkan ke Realtime...", channelName);

        channel = supabase.channel(channelName);
        
        channel
          .on(
            "postgres_changes",
            { event: "INSERT", schema: "public", table: "messages" },
            (payload: any) => {
              console.log("InboxPage: 📩 Pesan baru masuk!", payload.new);
              
              // Update Sidebar
              setConversations((prev) =>
                prev.map((c) => {
                  if (c.id === payload.new.conversation_id) {
                    return {
                      ...c,
                      lastMessage: payload.new.content,
                      time: new Date(payload.new.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    };
                  }
                  return c;
                })
              );

              // Update Chat bubbles if matches active chat
              if (payload.new.conversation_id === activeChat) {
                setMessagesList((prevList) => {
                  // Cek apakah pesan sudah ada (mencegah duplikat)
                  if (prevList.some((m) => m.id === payload.new.id)) return prevList;
                  return [...prevList, payload.new];
                });
              }
            }
          );

        channel.subscribe((status: string) => {
          if (status === "SUBSCRIBED") {
            console.log("InboxPage: ✅ Terhubung ke Realtime!");
          } else if (status === "CLOSED") {
            console.log("InboxPage: ❌ Koneksi Realtime tertutup.");
          } else if (status === "CHANNEL_ERROR") {
            console.error("InboxPage: ⚠️ Gagal terhubung ke Realtime. Pastikan 'Replication' di Supabase sudah aktif untuk tabel 'messages'.");
          } else {
            console.log("InboxPage: 📡 Status Subscription:", status);
          }
        });

      } catch (err) {
        console.error("InboxPage: Fatal Error setup realtime:", err);
      }
    };

    setupSubscriptions();

    return () => {
      if (channel) {
        console.log("InboxPage: 🔌 Memutus koneksi Realtime...");
        const supabase = createClientClient();
        supabase.removeChannel(channel);
      }
    };
  }, [userId, activeChat]);



  // Search users logic
  const handleSearchUsers = async (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const { createClientClient } = await import("@/utils/supabase/client");
    const supabase = createClientClient();

    const { data, error } = await supabase
      .from("users")
      .select("id, first_name, last_name, avatar_url")
      .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%`)
      .neq("id", userId)
      .limit(5);

    if (!error) {
      setSearchResults(data || []);
    }
  };

  const startNewConversation = async (otherUser: any) => {
    const { createClientClient } = await import("@/utils/supabase/client");
    const supabase = createClientClient();
    
    try {
      // 1. Create new conversation
      const { data: conv, error: convErr } = await supabase
        .from("conversations")
        .insert([{}]) // Use array for insert
        .select()
        .single();

      if (convErr) {
        console.error("Gagal membuat percakapan:", convErr.message);
        alert("Gagal memulai chat baru: " + convErr.message);
        return;
      }

      // 2. Add participants
      const { error: partErr } = await supabase.from("conversation_participants").insert([
        { conversation_id: conv.id, user_id: userId },
        { conversation_id: conv.id, user_id: otherUser.id }
      ]);

      if (partErr) {
        console.error("Gagal menambah partisipan:", partErr.message);
        return;
      }

      const newContact = {
        id: conv.id,
        name: `${otherUser.first_name} ${otherUser.last_name}`,
        avatar: otherUser.avatar_url,
        lastMessage: "Mulai percakapan baru...",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        unread: 0
      };

      setConversations([newContact, ...conversations]);
      setActiveChat(conv.id);
      setMessagesList([]);
      setSearchQuery("");
      setSearchResults([]);
      setIsSearching(false);
    } catch (err) {
      console.error("Fatal Error in Inbox:", err);
    }
  };






  // Function to fetch messages when a chat is selected
  const handleSelectChat = async (id: string) => {
    setActiveChat(id);
    const { createClientClient } = await import("@/utils/supabase/client");
    const supabase = createClientClient();
    
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", id)
      .order("created_at", { ascending: true });

    if (!error) {
      setMessagesList(data || []);
    }
  };


  const handleSendMessage = async () => {
    if (!messageInput.trim() || !activeChat || !userId) return;

    const { createClientClient } = await import("@/utils/supabase/client");
    const supabase = createClientClient();

    const newMessage = {
      conversation_id: activeChat,
      sender_id: userId,
      content: messageInput,
    };

    const { data, error } = await supabase
      .from("messages")
      .insert([newMessage])
      .select()
      .single();

    if (!error && data) {
      setMessagesList([...messagesList, data]);
      setMessageInput("");
    }
  };


  return (
    <div className="h-screen w-full flex flex-col bg-white font-['DM_Sans',sans-serif] overflow-hidden">
      {/* ── Top Search Bar ── */}
      <div
        className={`flex-shrink-0 px-4 pt-4 pb-3 mt-14 lg:mt-0 bg-white border-b border-gray-100 gap-2
          ${activeChat ? "hidden md:flex" : "flex"}
          items-center relative`}
      >
        <div className="flex items-center gap-2  bg-white rounded-xl px-3 py-3 flex-1 border border-gray-200 shadow-sm relative">
          <Search size={14} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Cari user untuk mulai chat..."
            className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-full"
            value={searchQuery}
            onChange={(e) => handleSearchUsers(e.target.value)}
          />
          
          {/* Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden">
              {searchResults.map((user) => (
                <button
                  key={user.id}
                  onClick={() => startNewConversation(user)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-0"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                    {user.avatar_url ? (
                      <img src={user.avatar_url} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      user.first_name[0]
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{user.first_name} {user.last_name}</p>
                    <p className="text-[10px] text-gray-400">Klik untuk mulai chat</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        <button className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0">
          <Filter size={16} className="text-gray-500" />
        </button>
      </div>


      {/* ── Body ── */}
      <div className="flex flex-col h-[calc(100vh-80px)] md:h-full bg-white overflow-hidden">
        {/* ── SIDEBAR ── */}
        {/* Mobile: full-width, hidden when a chat is open */}
        {/* Desktop: fixed 288px sidebar, always visible */}
        <div
          className={`bg-white flex-col border-r border-gray-100
            w-full md:w-72 md:flex md:flex-shrink-0
            ${activeChat ? "hidden" : "flex"}
          `}
        >
          {/* Filter Pills */}
          <div className="px-4 py-3 flex gap-2 flex-shrink-0">
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
            {/* Conversations */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1 mb-2">
                Pesan Terbaru
              </p>
              <div className="space-y-0.5">
                {conversations.map((c) => (
                  <ContactItem
                    key={c.id}
                    contact={c}
                    active={activeChat === c.id}
                    onClick={() => handleSelectChat(c.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── CHAT AREA ── */}
        <div
          className={`flex-col min-w-0 bg-white flex-1
            md:flex
            ${activeChat ? "flex" : "hidden"}
          `}
        >
          {/* Chat Header */}
          <div className="bg-white mt-20 border-b border-gray-100 px-4 md:px-6 py-4 flex-shrink-0 flex items-center gap-3">
            <button
              onClick={() => setActiveChat(null)}
              className="md:hidden p-1.5 -ml-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>

            {activeContact && (
              <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                {activeContact.name.charAt(0)}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-bold text-gray-800 truncate">
                {activeContact?.name ?? "Pilih percakapan"}
              </h2>
            </div>
          </div>

          {/* Empty state */}
          {!activeContact && (
            <div className="flex-1 hidden md:flex items-center justify-center">
              <p className="text-gray-400 text-sm">
                Pilih percakapan untuk mulai berkirim pesan
              </p>
            </div>
          )}

          {/* Messages */}
          {activeContact && (
            <>
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-6 py-5 space-y-4 bg-white">
                {messagesList.map((msg) => {
                  const isMine = msg.sender_id === userId;
                  return (
                    <div key={msg.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 shadow-sm ${
                        isMine 
                        ? "bg-white border border-gray-100 rounded-br-sm" 
                        : "bg-indigo-500 text-white rounded-tl-sm"
                      }`}>
                        <p className="text-sm">{msg.content}</p>
                        <p className={`text-[10px] mt-1 ${isMine ? "text-gray-400 text-right" : "text-indigo-100"}`}>
                          {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input Area */}
              <div className="bg-white border-t border-gray-100 px-4 md:px-6 py-4 flex-shrink-0">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3"
                >
                  <input
                    type="text"
                    placeholder="Tulis pesan..."
                    className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                  />
                  <button type="submit" className="text-indigo-500 font-bold text-sm px-2">Kirim</button>
                </form>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
