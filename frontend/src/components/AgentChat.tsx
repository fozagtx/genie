import React, { useEffect, useRef, useState } from 'react'
import { StatusIndicator } from './StatusIndicator'
import { useUIStore } from '../stores/uiStore'
import './AgentChat.css'

export interface AgentMessage {
  id: string
  agent: string
  role: 'system' | 'agent' | 'user' | 'thought'
  content: string
  timestamp: Date
  toolCalls?: string[]
  imageUrls?: string[]
}

interface AgentChatProps {
  messages: AgentMessage[]
  isStreaming?: boolean
  agentStatus?: string
  className?: string
}

export const AgentChat: React.FC<AgentChatProps> = ({
  messages,
  isStreaming = false,
  agentStatus = 'IDLE',
  className = '',
}) => {
  const chatEndRef = useRef<HTMLDivElement>(null)
  const autoScrollChat = useUIStore((state) => state.autoScrollChat)
  const [manualScrollOverride, setManualScrollOverride] = useState(false)

  useEffect(() => {
    console.log(`[AgentChat] Received ${messages.length} messages`);
  }, [messages.length]);

  const validMessages = React.useMemo(() => {
    console.log(`[AgentChat] Processing ${messages.length} messages...`);

    messages.forEach((msg, idx) => {
      console.log(`[AgentChat] Message ${idx}:`, {
        id: msg.id,
        hasId: !!msg.id,
        agent: msg.agent,
        role: msg.role,
        hasContent: !!(msg.content && msg.content.trim()),
        contentLength: msg.content?.length || 0,
        timestamp: msg.timestamp,
        timestampType: typeof msg.timestamp,
      });
    });

    const filtered = messages.filter(msg => {
      if (!msg.id) {
        console.warn('[AgentChat] Filtering out message with no ID:', {
          agent: msg.agent,
          role: msg.role,
          content: msg.content?.substring(0, 50),
        });
        return false;
      }

      if (!msg.content || msg.content.trim() === '') {
        console.warn('[AgentChat] Filtering out message with no content:', msg.id);
        return false;
      }

      try {
        const dateObj = msg.timestamp instanceof Date ? msg.timestamp : new Date(msg.timestamp);
        if (isNaN(dateObj.getTime())) {
          console.warn('[AgentChat] Filtering out message with invalid timestamp:', msg.id, msg.timestamp);
          return false;
        }
      } catch (error) {
        console.warn('[AgentChat] Error checking timestamp for message:', msg.id, error);
        return false;
      }

      return true;
    });

    console.log(`[AgentChat] Filtered messages: ${messages.length} -> ${filtered.length}`);
    return filtered;
  }, [messages]);

  useEffect(() => {
    if (autoScrollChat && !manualScrollOverride && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [validMessages, autoScrollChat, manualScrollOverride])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!autoScrollChat) return

    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50
    setManualScrollOverride(!isAtBottom)
  }

  const getMessageColor = (role: string) => {
    switch (role) {
      case 'system':
        return 'text-yellow-400'
      case 'agent':
        return 'text-blue-400'
      case 'user':
        return 'text-emerald-400'
      case 'thought':
        return 'text-muted-foreground'
      default:
        return 'text-foreground'
    }
  }

  const formatTimestamp = (date: Date | string | number) => {
    const dateObj = date instanceof Date ? date : new Date(date);

    if (isNaN(dateObj.getTime())) {
      return '--:--:--';
    }

    return dateObj.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  return (
    <div className={`agent-chat rounded-lg border border-border bg-card ${className}`}>
      {/* Chat Header */}
      <div className="px-4 py-2.5 border-b border-border flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Agent Communication</span>
        <StatusIndicator
          status={isStreaming ? 'loading' : 'success'}
          message={agentStatus}
          size="small"
        />
      </div>

      {/* Chat Messages */}
      <div className="chat-messages" onScroll={handleScroll}>
        {validMessages.length === 0 ? (
          <div className="chat-empty">
            <div className="text-center space-y-2">
              <p className="text-muted-foreground text-sm">Awaiting agent response</p>
              <p className="text-xs text-muted-foreground/60">System initialized. Listening for commands...</p>
            </div>
          </div>
        ) : (
          validMessages.map((message, index) => (
            <div
              key={message.id}
              className={`chat-message ${message.role}`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Message Header */}
              <div className="message-header">
                <span className={`message-agent ${getMessageColor(message.role)}`}>
                  {message.agent}
                </span>
                <span className="message-role">
                  {message.role === 'thought' ? '(thinking)' : ''}
                </span>
                <span className="message-timestamp text-muted-foreground">
                  {formatTimestamp(message.timestamp)}
                </span>
              </div>

              {/* Message Content */}
              <div className="message-content">
                <span className="message-text">
                  {message.content}
                  {message.role === 'thought' && (
                    <span className="typing-dots">
                      <span>.</span>
                      <span>.</span>
                      <span>.</span>
                    </span>
                  )}
                </span>
              </div>

              {/* Message Images */}
              {message.imageUrls && message.imageUrls.length > 0 && (
                <div className="message-images">
                  {message.imageUrls.map((url, idx) => (
                    <div key={idx} className="message-image-wrapper">
                      <img src={url} alt={`Attachment ${idx + 1}`} className="message-image" />
                    </div>
                  ))}
                </div>
              )}

              {/* Tool Calls */}
              {message.toolCalls && message.toolCalls.length > 0 && (
                <div className="message-tools">
                  <div className="tools-label text-muted-foreground text-xs">
                    Tools executed:
                  </div>
                  {message.toolCalls.map((tool, idx) => (
                    <div key={idx} className="tool-call">
                      <span className="tool-name">{tool}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}

        {/* Streaming Indicator */}
        {isStreaming && (
          <div className="chat-streaming">
            <span className="streaming-text">Agent processing</span>
            <span className="streaming-dots">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Chat Footer */}
      <div className="chat-footer">
        <div className="footer-stats">
          <span className="text-muted-foreground">Messages: {validMessages.length}</span>
          <span className="text-muted-foreground">Status: {isStreaming ? 'Active' : 'Standby'}</span>
          <span className="text-muted-foreground">
            Scroll: {autoScrollChat && !manualScrollOverride ? 'Auto' : 'Manual'}
          </span>
        </div>
      </div>
    </div>
  )
}

// Compact version for sidebars
export const AgentChatCompact: React.FC<{
  latestMessage?: AgentMessage
  messageCount: number
  isActive: boolean
}> = ({ latestMessage, messageCount, isActive }) => {
  return (
    <div className="agent-chat-compact rounded-lg border border-border bg-card p-3">
      <div className="compact-header">
        <span className="text-foreground text-sm font-medium">Agent Channel</span>
        <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">{messageCount}</span>
      </div>

      {latestMessage && (
        <div className="compact-message mt-2">
          <div className="text-xs text-muted-foreground">
            {latestMessage.agent} {formatTimestamp(latestMessage.timestamp)}
          </div>
          <div className="text-sm text-foreground mt-0.5">
            {latestMessage.content.substring(0, 50)}
            {latestMessage.content.length > 50 ? '...' : ''}
          </div>
        </div>
      )}

      {isActive && (
        <div className="compact-status mt-2 pt-2 border-t border-border">
          <StatusIndicator status="loading" message="Processing" size="small" />
        </div>
      )}
    </div>
  )
}

function formatTimestamp(timestamp: Date | string | number): string {
  const dateObj = timestamp instanceof Date ? timestamp : new Date(timestamp);

  if (isNaN(dateObj.getTime())) {
    return '--:--:--';
  }

  return dateObj.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}
