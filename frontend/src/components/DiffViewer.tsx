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
  // Modern light theme styles for diff viewer
  const customStyles = {
    variables: {
      light: {
        diffViewerBackground: '#ffffff',
        diffViewerColor: '#1f2937',
        addedBackground: '#ecfdf5',
        addedColor: '#059669',
        removedBackground: '#fef2f2',
        removedColor: '#dc2626',
        wordAddedBackground: '#d1fae5',
        wordRemovedBackground: '#fecaca',
        addedGutterBackground: '#ecfdf5',
        removedGutterBackground: '#fef2f2',
        gutterBackground: '#f9fafb',
        gutterBackgroundDark: '#f3f4f6',
        highlightBackground: '#f3f4f6',
        highlightGutterBackground: '#f3f4f6',
        codeFoldGutterBackground: '#f9fafb',
        codeFoldBackground: '#ffffff',
        emptyLineBackground: '#ffffff',
        gutterColor: '#9ca3af',
        addedGutterColor: '#059669',
        removedGutterColor: '#dc2626',
        codeFoldContentColor: '#6b7280',
        diffViewerTitleBackground: '#f9fafb',
        diffViewerTitleColor: '#1f2937',
        diffViewerTitleBorderColor: '#e5e7eb',
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
          useDarkTheme={false}
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
