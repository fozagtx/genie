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

    // Dark theme for better code visibility
    monaco.editor.defineTheme('genie-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'C586C0' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'type', foreground: '4EC9B0' },
        { token: 'class', foreground: '4EC9B0', fontStyle: 'bold' },
        { token: 'function', foreground: 'DCDCAA' },
        { token: 'variable', foreground: '9CDCFE' },
        { token: 'constant', foreground: '4FC1FF' },
        { token: 'operator', foreground: 'D4D4D4' },
        { token: 'delimiter', foreground: '808080' },
      ],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4',
        'editor.lineHighlightBackground': '#2a2d2e',
        'editor.selectionBackground': '#264f78',
        'editor.inactiveSelectionBackground': '#3a3d41',
        'editorCursor.foreground': '#aeafad',
        'editorWhitespace.foreground': '#3b3b3b',
        'editorIndentGuide.background': '#404040',
        'editorIndentGuide.activeBackground': '#707070',
        'editorLineNumber.foreground': '#858585',
        'editorLineNumber.activeForeground': '#c6c6c6',
        'editorBracketMatch.background': '#0064001a',
        'editorBracketMatch.border': '#888888',
        'scrollbarSlider.background': '#4e4e4e80',
        'scrollbarSlider.hoverBackground': '#64646480',
        'scrollbarSlider.activeBackground': '#7e7e7e80',
      },
    })

    monaco.editor.setTheme('genie-dark')

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
