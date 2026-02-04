import React from 'react'
// @ts-ignore - package lacks type definitions
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer-continued'
import './DiffViewer.css'

interface DiffViewerProps {
  oldCode: string
  newCode: string
  oldTitle?: string
  newTitle?: string
  language?: string
  splitView?: boolean
  className?: string
}

export const DiffViewer: React.FC<DiffViewerProps> = ({
  oldCode,
  newCode,
  oldTitle = 'Original',
  newTitle = 'Modified',
  language = 'typescript',
  splitView = true,
  className = '',
}) => {
  // Modern dark theme styles for diff viewer
  const customStyles = {
    variables: {
      dark: {
        diffViewerBackground: '#0a0a0a',
        diffViewerColor: '#e5e7eb',
        addedBackground: '#064e3b',
        addedColor: '#34d399',
        removedBackground: '#4c0519',
        removedColor: '#fb7185',
        wordAddedBackground: '#065f46',
        wordRemovedBackground: '#881337',
        addedGutterBackground: '#064e3b',
        removedGutterBackground: '#4c0519',
        gutterBackground: '#111827',
        gutterBackgroundDark: '#0a0a0a',
        highlightBackground: '#1f2937',
        highlightGutterBackground: '#1f2937',
        codeFoldGutterBackground: '#111827',
        codeFoldBackground: '#0a0a0a',
        emptyLineBackground: '#0a0a0a',
        gutterColor: '#6b7280',
        addedGutterColor: '#34d399',
        removedGutterColor: '#fb7185',
        codeFoldContentColor: '#9ca3af',
        diffViewerTitleBackground: '#111827',
        diffViewerTitleColor: '#e5e7eb',
        diffViewerTitleBorderColor: '#374151',
      },
    },
    line: {
      padding: '8px 4px',
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
      fontSize: '13px',
      lineHeight: '20px',
    },
    gutter: {
      padding: '8px 8px',
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
      fontSize: '12px',
      minWidth: '50px',
      textAlign: 'right',
    },
  }

  const addedLineStats = newCode.split('\n').length - oldCode.split('\n').length
  const isAddition = addedLineStats > 0

  return (
    <div className={`diff-viewer rounded-lg border border-border bg-card overflow-hidden ${className}`}>
      {/* Header */}
      <div className="px-4 py-2.5 border-b border-border flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Diff Analysis</span>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>{splitView ? 'Split View' : 'Unified'}</span>
          <span className={isAddition ? 'text-emerald-400' : 'text-destructive'}>
            {isAddition ? '+' : ''}{addedLineStats} lines
          </span>
          <span>{language.toUpperCase()}</span>
        </div>
      </div>

      {/* File Labels */}
      <div className="diff-labels">
        <div className="label-item old-label">
          <span>{oldTitle}</span>
        </div>
        {splitView && (
          <div className="label-item new-label">
            <span>{newTitle}</span>
          </div>
        )}
      </div>

      {/* Diff Viewer */}
      <div className="diff-container">
        <ReactDiffViewer
          oldValue={oldCode}
          newValue={newCode}
          splitView={splitView}
          compareMethod={DiffMethod.WORDS}
          useDarkTheme={true}
          styles={customStyles}
          leftTitle={undefined}
          rightTitle={undefined}
          showDiffOnly={false}
          hideLineNumbers={false}
        />
      </div>

      {/* Legend */}
      <div className="diff-legend">
        <div className="legend-item">
          <span className="legend-box added"></span>
          <span className="text-emerald-400">Added</span>
        </div>
        <div className="legend-item">
          <span className="legend-box removed"></span>
          <span className="text-destructive">Removed</span>
        </div>
        <div className="legend-item">
          <span className="legend-box modified"></span>
          <span className="text-yellow-400">Modified</span>
        </div>
      </div>
    </div>
  )
}

// Compact diff summary
export const DiffSummary: React.FC<{
  additions: number
  deletions: number
  modifications: number
  className?: string
}> = ({ additions, deletions, modifications, className = '' }) => {
  const total = additions + deletions + modifications

  return (
    <div className={`diff-summary rounded-lg border border-border bg-card p-4 ${className}`}>
      <div className="text-sm font-medium text-foreground mb-3">Change Summary</div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Additions:</span>
          <span className="text-emerald-400">+{additions} lines</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Deletions:</span>
          <span className="text-destructive">-{deletions} lines</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Modifications:</span>
          <span className="text-yellow-400">~{modifications} lines</span>
        </div>
        <div className="border-t border-border pt-2 flex justify-between">
          <span className="text-muted-foreground">Total:</span>
          <span className="text-foreground font-medium">{total} changes</span>
        </div>
      </div>
    </div>
  )
}

// Inline diff for small changes
export const InlineDiff: React.FC<{
  oldText: string
  newText: string
  className?: string
}> = ({ oldText, newText, className = '' }) => {
  return (
    <div className={`inline-diff ${className}`}>
      <div className="inline-diff-line removed">
        <span className="diff-marker">-</span>
        <span className="diff-text">{oldText}</span>
      </div>
      <div className="inline-diff-line added">
        <span className="diff-marker">+</span>
        <span className="diff-text">{newText}</span>
      </div>
    </div>
  )
}
