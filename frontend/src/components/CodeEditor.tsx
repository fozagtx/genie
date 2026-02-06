import React, { useRef } from 'react'
import Editor, { OnMount } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import './CodeEditor.css'

interface CodeEditorProps {
  value: string
  onChange?: (value: string) => void
  language?: string
  readOnly?: boolean
  height?: string
  showMinimap?: boolean
  className?: string
  title?: string
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language = 'typescript',
  readOnly = false,
  height = '500px',
  showMinimap = true,
  className = '',
  title = 'Code Editor',
}) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor

    // Modern light theme
    monaco.editor.defineTheme('genie-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6b7280', fontStyle: 'italic' },
        { token: 'keyword', foreground: '7c3aed', fontStyle: 'bold' },
        { token: 'string', foreground: '059669' },
        { token: 'number', foreground: 'd97706' },
        { token: 'type', foreground: '2563eb' },
        { token: 'class', foreground: '2563eb', fontStyle: 'bold' },
        { token: 'function', foreground: '059669' },
        { token: 'variable', foreground: '1f2937' },
        { token: 'constant', foreground: 'd97706' },
        { token: 'operator', foreground: '6b7280' },
        { token: 'delimiter', foreground: '9ca3af' },
      ],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#1f2937',
        'editor.lineHighlightBackground': '#f9fafb',
        'editor.selectionBackground': '#dbeafe',
        'editor.inactiveSelectionBackground': '#f3f4f6',
        'editorCursor.foreground': '#2563eb',
        'editorWhitespace.foreground': '#e5e7eb',
        'editorIndentGuide.background': '#e5e7eb',
        'editorIndentGuide.activeBackground': '#d1d5db',
        'editorLineNumber.foreground': '#9ca3af',
        'editorLineNumber.activeForeground': '#6b7280',
        'editorBracketMatch.background': '#dbeafe',
        'editorBracketMatch.border': '#2563eb',
        'scrollbarSlider.background': '#d1d5db80',
        'scrollbarSlider.hoverBackground': '#9ca3af80',
        'scrollbarSlider.activeBackground': '#6b728080',
      },
    })

    monaco.editor.setTheme('genie-light')

    editor.updateOptions({
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
      fontSize: 14,
      lineHeight: 22,
      letterSpacing: 0.3,
    })
  }

  const handleEditorChange = (value: string | undefined) => {
    if (onChange && value !== undefined) {
      onChange(value)
    }
  }

  return (
    <div className={`code-editor rounded-lg border border-border bg-card overflow-hidden ${className}`}>
      {/* Header */}
      <div className="px-4 py-2.5 border-b border-border flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{title}</span>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>{language.toUpperCase()}</span>
          <span>{readOnly ? 'Read Only' : 'Edit'}</span>
          <span>{value.split('\n').length} lines</span>
        </div>
      </div>

      {/* Monaco Editor Container */}
      <div className="editor-container">
        <Editor
          width="100%"
          height={height}
          language={language}
          value={value}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            readOnly,
            minimap: { enabled: showMinimap },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: 'on',
            lineNumbers: 'on',
            glyphMargin: true,
            folding: true,
            lineDecorationsWidth: 10,
            lineNumbersMinChars: 3,
            renderLineHighlight: 'all',
            scrollbar: {
              vertical: 'auto',
              horizontal: 'auto',
              useShadows: false,
              verticalScrollbarSize: 12,
              horizontalScrollbarSize: 12,
            },
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            cursorBlinking: 'smooth',
            cursorStyle: 'line',
            renderWhitespace: 'selection',
          }}
        />
      </div>

      {/* Footer */}
      <div className="px-4 py-1.5 border-t border-border text-xs text-muted-foreground">
        Genie Editor {readOnly ? '| View Mode' : '| Ready'}
      </div>
    </div>
  )
}

// Compact version for previews
export const CodePreview: React.FC<{
  code: string
  language?: string
  maxLines?: number
  className?: string
}> = ({ code, language = 'typescript', maxLines = 10, className = '' }) => {
  const lines = code.split('\n').slice(0, maxLines)
  const truncated = code.split('\n').length > maxLines

  return (
    <div className={`code-preview rounded-lg border border-border bg-card overflow-hidden ${className}`}>
      <div className="px-3 py-2 border-b border-border text-xs text-muted-foreground">
        Preview [{language.toUpperCase()}]
      </div>
      <div className="preview-content">
        <pre className="preview-code">
          <code>
            {lines.map((line, idx) => (
              <div key={idx} className="preview-line">
                <span className="line-number">{String(idx + 1).padStart(3, ' ')}</span>
                <span className="line-content">{line || ' '}</span>
              </div>
            ))}
            {truncated && (
              <div className="preview-line text-muted-foreground">
                <span className="line-number">...</span>
                <span className="line-content">
                  [{code.split('\n').length - maxLines} more lines]
                </span>
              </div>
            )}
          </code>
        </pre>
      </div>
    </div>
  )
}
