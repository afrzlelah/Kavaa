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
import { createClientClient } from "@/utils/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { findExistingConversationClient, markMessagesAsReadClient } from "@/services/inboxClientService";
import { Contact } from "@/type";

// --- Helper for Relative Time ---
const formatRelativeTime = (date: string | Date) => {
  try {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: id });
  } catch (e) {
    return "Baru saja";
  }
};

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
function MessageBubble({ msg, isNewGroup }: { msg: any; isNewGroup: boolean }) {
  const isMine = msg.isMine;
  const senderName = msg.sender || "Kavaa User";
  
  const senderContact: Contact = {
    id: msg.sender_id,
    name: senderName,
    initials: senderName.slice(0, 2).toUpperCase(),
    color: isMine ? "bg-primary" : "bg-gray-400",
    avatar: msg.sender_avatar || "",
    lastMessage: "",
    type: "person",
  };

  if (isMine) {
    return (
      <div className={`flex justify-end items-end gap-2 ${isNewGroup ? "mb-4 mt-2" : "mb-1"}`}>
        <div className="max-w-[75%] sm:max-w-md lg:max-w-lg">
          <div className={`bg-primary text-white rounded-2xl px-4 py-2.5 shadow-sm transition-all hover:shadow-md ${isNewGroup ? "rounded-br-sm" : ""}`}>
            <p className="text-sm leading-relaxed">{msg.content}</p>
            <div className="flex items-center justify-end gap-1 mt-1 opacity-70">
              <p className="text-[9px]">{msg.time}</p>
            </div>
          </div>
        </div>
        {isNewGroup && (
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mb-4">
            ME
          </div>
        )}
        {!isNewGroup && <div className="w-8 flex-shrink-0" />}
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-2 ${isNewGroup ? "mb-4 mt-2" : "mb-1"}`}>
      {isNewGroup ? <Avatar contact={senderContact} size="sm" /> : <div className="w-8 flex-shrink-0" />}
      <div className="max-w-[75%] sm:max-w-md lg:max-w-lg">
        {isNewGroup && (
          <p className="text-[10px] font-bold mb-1 ml-1 text-gray-500 uppercase tracking-wider">
            {msg.sender}
          </p>
        )}
        
        {msg.type === "text" && (
          <div className={`bg-white border border-gray-100 text-gray-800 rounded-2xl px-4 py-2.5 shadow-sm transition-all hover:shadow-md ${isNewGroup ? "rounded-tl-sm" : ""}`}>
            <p className="text-sm leading-relaxed">{msg.content}</p>
            <p className="text-[9px] text-gray-400 mt-1">{msg.time}</p>
          </div>
        )}

        {msg.type === "audio" && (
          <div className={`bg-primary/5 border border-primary/10 rounded-2xl px-4 py-3 mb-1 flex items-center gap-3 min-w-[200px] ${isNewGroup ? "rounded-tl-sm" : ""}`}>
            <button className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-sm transition-transform active:scale-95">
              <Play size={14} className="text-white ml-0.5" fill="currentColor" />
            </button>
            <div className="flex items-center gap-1 flex-1">
              {[10, 14, 18, 12, 16, 8, 20, 14, 10, 12, 18, 16, 8, 14, 12, 10, 16, 18, 12, 10].map((h, i) => (
                <div key={i} className="bg-primary/40 rounded-full w-1" style={{ height: `${h}px` }} />
              ))}
            </div>
            <span className="text-primary text-[10px] font-bold opacity-70">0:42</span>
          </div>
        )}

        {msg.type === "files" && (
          <div className={`flex flex-col gap-2 ${isNewGroup ? "rounded-tl-sm" : ""}`}>
            <div className="flex gap-2 flex-wrap">
              {msg.files?.map((f:any, i:any) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 shadow-sm transition-all hover:bg-white">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">{f.name}</p>
                    <p className="text-[10px] text-gray-400 uppercase">{f.size}</p>
                  </div>
                </div>
              ))}
            </div>
            {msg.content && (
              <div className="bg-white border border-gray-100 text-gray-800 rounded-2xl px-4 py-2.5 shadow-sm">
                <p className="text-sm leading-relaxed">{msg.content}</p>
                <p className="text-[9px] text-gray-400 mt-1">{msg.time}</p>
              </div>
            )}
          </div>
        )}
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
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard auto-focus logic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        activeChat && 
        document.activeElement?.tagName !== "INPUT" && 
        document.activeElement?.tagName !== "TEXTAREA" &&
        !e.ctrlKey && !e.metaKey && !e.altKey &&
        e.key.length === 1 
      ) {
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeChat]);

  const activeContact = conversations.find((c) => c.id === activeChat) ?? null;

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messagesList]);

  // Auto-focus input
  useEffect(() => {
    if (activeChat && inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeChat]);


  useEffect(() => {
    if (!userId) return;

    let channel: any;

    const setupSubscriptions = async () => {
      try {
        const { createClientClient } = await import("@/utils/supabase/client");
        const supabase = createClientClient();

        const channelName = `inbox_global_${userId}`;
        console.log("Inbox: 🔄 Subscribing to messages...", channelName);

        channel = supabase
          .channel(channelName)
          .on(
            "postgres_changes",
            { event: "INSERT", schema: "public", table: "messages" },
            (payload: any) => {
              console.log("Inbox: 📩 New message received!", payload.new);
              
              const newMsg = payload.new;

              // 1. Update active chat messages
              if (newMsg.conversation_id === activeChat) {
                setMessagesList((prev) => {
                  if (prev.some(m => m.id === newMsg.id)) return prev;
                  return [...prev, newMsg];
                });
                
                // Mark as read on the server
                if (newMsg.sender_id !== userId) {
                  markMessagesAsReadClient(newMsg.conversation_id, userId!);
                }
              }

              // 2. Update sidebar conversations
              setConversations((prev) => {
                const index = prev.findIndex(c => c.id === newMsg.conversation_id);
                
                if (index !== -1) {
                  const updated = [...prev];
                  updated[index] = {
                    ...updated[index],
                    lastMessage: newMsg.content,
                    time: formatRelativeTime(newMsg.created_at),
                    last_message_at: newMsg.created_at,
                    unread: newMsg.conversation_id === activeChat ? 0 : (updated[index].unread || 0) + (newMsg.sender_id !== userId ? 1 : 0)
                  };
                  // Move to top
                  return updated.sort((a, b) => 
                    new Date(b.last_message_at || 0).getTime() - new Date(a.last_message_at || 0).getTime()
                  );
                } else {
                  // New conversation! Should ideally fetch details from server
                  // For now, we'll wait for a refresh or implement a fetch logic
                  console.log("Inbox: New conversation detected, please refresh or implement fetch.");
                  return prev;
                }
              });
            }
          )
          .subscribe((status) => {
            console.log("Inbox: Subscription status:", status);
          });

      } catch (err) {
        console.error("Inbox: Subscription error:", err);
      }
    };

      setupSubscriptions();

      return () => {
        if (channel) {
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
      // 1. Check if conversation already exists
      const existingId = await findExistingConversationClient(userId!, otherUser.id);
      
      if (existingId) {
        handleSelectChat(existingId);
        setSearchQuery("");
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      // 2. Create new conversation
      const { data: conv, error: convErr } = await supabase
        .from("conversations")
        .insert([{}]) 
        .select()
        .single();

      if (convErr) return;

      // 3. Add participants
      await supabase.from("conversation_participants").insert([
        { conversation_id: conv.id, user_id: userId },
        { conversation_id: conv.id, user_id: otherUser.id }
      ]);

      const newContact = {
        id: conv.id,
        name: `${otherUser.first_name} ${otherUser.last_name}`,
        avatar: otherUser.avatar_url,
        lastMessage: "Mulai percakapan baru...",
        time: "Baru saja",
        last_message_at: new Date().toISOString(),
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
    
    // 1. Fetch messages
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", id)
      .order("created_at", { ascending: true });

    if (!error) {
      setMessagesList(data || []);
    }

    // 2. Mark as read
    await markMessagesAsReadClient(id, userId!);

    // 3. Update Sidebar unread count locally
    setConversations((prev) => 
      prev.map(c => c.id === id ? { ...c, unread: 0 } : c)
    );
  };


  const handleSendMessage = async () => {
    if (!messageInput.trim() || !activeChat || !userId) return;

    const content = messageInput.trim();
    setMessageInput("");

    // --- Optimistic Update ---
    const tempId = `temp-${Date.now()}`;
    const optimisticMsg = {
      id: tempId,
      conversation_id: activeChat,
      sender_id: userId,
      content: content,
      created_at: new Date().toISOString(),
      isOptimistic: true,
    };

    setMessagesList((prev) => [...prev, optimisticMsg]);

    const { createClientClient } = await import("@/utils/supabase/client");
    const supabase = createClientClient();

    const { data, error } = await supabase
      .from("messages")
      .insert([{
        conversation_id: activeChat,
        sender_id: userId,
        content: content,
      }])
      .select()
      .single();

    if (error) {
      console.error("Gagal mengirim pesan:", error);
      setMessagesList((prev) => prev.filter((m) => m.id !== tempId));
      alert("Gagal mengirim pesan. Silakan coba lagi.");
    } else if (data) {
      // Replace optimistic message with real data
      setMessagesList((prev) => 
        prev.map((m) => (m.id === tempId ? data : m))
      );
      
      // Update Sidebar with unified logic
      setConversations((prev) => {
        const updated = prev.map((c) => {
          if (c.id === activeChat) {
            return {
              ...c,
              lastMessage: data.content,
              time: "Baru saja",
              last_message_at: data.created_at,
              unread: 0 // Reset unread when I send a message
            };
          }
          return c;
        });
        
        return [...updated].sort((a, b) => 
          new Date(b.last_message_at || 0).getTime() - new Date(a.last_message_at || 0).getTime()
        );
      });
    }
  };


  // Keyboard auto-focus logic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        activeChat && 
        document.activeElement?.tagName !== "INPUT" && 
        document.activeElement?.tagName !== "TEXTAREA" &&
        !e.ctrlKey && !e.metaKey && !e.altKey &&
        e.key.length === 1 
      ) {
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeChat]);

  return (
    <div className="flex-1 w-full flex flex-col bg-white font-['DM_Sans',sans-serif] overflow-hidden">
      {/* ── Top Search Bar ── */}
      <div
        className={`flex-shrink-0 px-6 py-4 mt-14 lg:mt-0 bg-white border-b border-gray-100 gap-3
          ${activeChat ? "hidden md:flex" : "flex"}
          items-center relative`}
      >
        <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3 flex-1 border border-gray-100 shadow-sm focus-within:ring-2 focus-within:ring-primary/10 transition-all relative">
          <Search size={16} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Cari user untuk mulai chat..."
            className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-full"
            value={searchQuery}
            onChange={(e) => handleSearchUsers(e.target.value)}
          />
          
          {/* Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-1">
              {searchResults.map((user) => (
                <button
                  key={user.id}
                  onClick={() => startNewConversation(user)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-0"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
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
      <div className="flex flex-1 overflow-hidden">
        {/* ── SIDEBAR ── */}
        <div
          className={`bg-white flex-col border-r border-gray-100
            w-full md:w-72 md:flex md:flex-shrink-0
            ${activeChat ? "hidden" : "flex"}
          `}
        >
          {/* Filter Pills */}
          <div className="px-4 py-3 flex gap-2 flex-shrink-0">
            <button className="flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-xl px-4 py-2 text-xs font-bold text-gray-600 transition-all active:scale-95">
              All Category <ChevronDown size={14} />
            </button>
            <button className="flex items-center gap-1.5 bg-primary/10 hover:bg-primary/20 rounded-xl px-4 py-2 text-xs font-bold text-primary transition-all active:scale-95">
              Search...
            </button>
          </div>

          {/* Contacts List */}
          <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-4 scrollbar-hide">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] px-4 mb-4">
                Pesan Terbaru
              </p>
              <div className="space-y-1">
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
          <div className="bg-white mt-14 lg:mt-0 border-b border-gray-100 px-6 py-4 flex-shrink-0 flex items-center gap-4">
            <button
              onClick={() => setActiveChat(null)}
              className="md:hidden p-2 -ml-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft size={22} className="text-gray-600" />
            </button>

            {activeContact && (
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold overflow-hidden">
                {activeContact.avatar ? (
                  <img src={activeContact.avatar} className="w-full h-full object-cover" />
                ) : (
                  activeContact.name.charAt(0)
                )}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-black text-gray-800 truncate">
                {activeContact?.name ?? "Pilih percakapan"}
              </h2>
              <p className="text-[10px] font-bold text-green-500 uppercase">Online</p>
            </div>
          </div>

          {/* Empty state */}
          {!activeContact && (
            <div className="flex-1 hidden md:flex flex-col items-center justify-center p-8 text-center">
              <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-4">
                <Mic size={40} className="text-primary/20" />
              </div>
              <h3 className="text-lg font-black text-gray-800 mb-2">Pesan Anda</h3>
              <p className="text-sm text-gray-400 max-w-[240px]">
                Kirim foto dan pesan pribadi ke teman atau grup.
              </p>
              <button className="mt-6 bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95">
                Kirim Pesan
              </button>
            </div>
          )}

          {/* Messages & Input Area */}
          {activeContact && (
            <>
              <div 
                ref={scrollRef} 
                className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-2 bg-gray-50/30 scroll-smooth"
              >
                {messagesList.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-400 text-sm italic">Belum ada pesan. Mulai percakapan sekarang!</p>
                  </div>
                ) : (
                  messagesList.map((msg, idx) => {
                    const prevMsg = messagesList[idx - 1];
                    const isNewGroup = !prevMsg || prevMsg.sender_id !== msg.sender_id || 
                                     (new Date(msg.created_at).getTime() - new Date(prevMsg.created_at).getTime() > 300000); 
                    
                    return (
                      <MessageBubble 
                        key={msg.id} 
                        isNewGroup={isNewGroup}
                        msg={{
                          ...msg,
                          isMine: msg.sender_id === userId,
                          sender: msg.sender_name || (msg.sender_id === userId ? "Me" : activeContact.name),
                          time: new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                          type: msg.type || "text"
                        }} 
                      />
                    );
                  })
                )}
              </div>
 
              {/* Input Area */}
              <div className="bg-white border-t border-gray-100 px-4 md:px-8 py-5 flex-shrink-0">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-2 focus-within:ring-4 focus-within:ring-primary/5 focus-within:border-primary/20 transition-all shadow-sm"
                >
                  <button type="button" className="p-2 text-gray-400 hover:text-primary transition-colors">
                    <Paperclip size={20} />
                  </button>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Tulis pesan..."
                    className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none py-2"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                  />
                  <div className="flex items-center gap-1">
                    <button type="button" className="p-2 text-gray-400 hover:text-primary transition-colors">
                      <Mic size={20} />
                    </button>
                    <button type="button" className="p-2 text-gray-400 hover:text-primary transition-colors">
                      <Camera size={20} />
                    </button>
                    <button 
                      type="submit" 
                      disabled={!messageInput.trim()}
                      className={`bg-primary text-white p-2.5 rounded-xl transition-all shadow-md shadow-primary/20 ${
                        messageInput.trim() ? "hover:scale-105 active:scale-95 opacity-100" : "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <svg className="w-5 h-5 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
