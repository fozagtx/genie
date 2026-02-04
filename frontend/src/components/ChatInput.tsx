import React, { useState, useRef } from 'react';
import { FileUpload, UploadedFile } from './FileUpload';
import { useAuthContext } from '../contexts/AuthContext';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { Send, Paperclip } from 'lucide-react';
import { Button } from './ui/button';
import './ChatInput.css';

export interface ChatInputMessage {
  text: string;
  imageUrls?: string[];
}

interface ChatInputProps {
  onSend: (message: ChatInputMessage) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  showImageUpload?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  disabled = false,
  placeholder = 'Type your message...',
  className = '',
  showImageUpload = true,
}) => {
  const [text, setText] = useState('');
  const [uploadedImages, setUploadedImages] = useState<UploadedFile[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const { user } = useAuthContext();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { playClick, playToggle, playType } = useSoundEffects();
  const lastTypeTimeRef = useRef<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && uploadedImages.length === 0) return;

    const imageUrls = uploadedImages.map(img => img.url);
    onSend({
      text: text.trim(),
      imageUrls: imageUrls.length > 0 ? imageUrls : undefined,
    });

    setText('');
    setUploadedImages([]);
    setShowUpload(false);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);

    const now = Date.now();
    if (now - lastTypeTimeRef.current > 100) {
      playType();
      lastTypeTimeRef.current = now;
    }

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleImagesChange = (files: UploadedFile[]) => {
    setUploadedImages(files);
  };

  const toggleUpload = () => {
    setShowUpload(!showUpload);
  };

  return (
    <div className={`chat-input rounded-lg border border-border bg-card ${className}`}>
      <form onSubmit={handleSubmit} className="chat-input-form p-3">
        {/* Image Upload Section */}
        {showImageUpload && user && showUpload && (
          <div className="chat-input-upload-section mb-3">
            <FileUpload
              userId={user.id}
              folder="chat"
              maxFiles={3}
              onFilesChange={handleImagesChange}
              disabled={disabled}
            />
          </div>
        )}

        {/* Input Row */}
        <div className="chat-input-row">
          {showImageUpload && user && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={showUpload ? 'text-blue-400' : 'text-muted-foreground'}
              onClick={() => {
                playToggle();
                toggleUpload();
              }}
              disabled={disabled}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
          )}

          <div className="input-wrapper">
            <textarea
              ref={textareaRef}
              className="chat-textarea"
              value={text}
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              rows={1}
            />
          </div>

          <Button
            type="submit"
            size="sm"
            disabled={disabled || (!text.trim() && uploadedImages.length === 0)}
            onClick={() => playClick()}
          >
            <Send className="h-4 w-4 mr-1" />
            Send
          </Button>
        </div>

        {/* Hint */}
        <div className="chat-input-hint text-xs text-muted-foreground mt-2">
          <span>Press Enter to send, Shift+Enter for new line</span>
          {uploadedImages.length > 0 && (
            <span className="image-count ml-2">
              {uploadedImages.length} image(s) attached
            </span>
          )}
        </div>
      </form>
    </div>
  );
};
