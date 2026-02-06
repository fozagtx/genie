/**
 * ErrorFixNotification Component
 * Shows toast-style notifications for error detection and fixing
 */

import { useEffect, useState } from 'react';
import { PreviewError } from '@/utils/previewErrorCapture';

interface ErrorFixNotificationProps {
  errors: PreviewError[];
  isFixing: boolean;
  onDismiss?: () => void;
  onManualFix?: () => void;
}

export function ErrorFixNotification({
  errors,
  isFixing,
  onDismiss,
  onManualFix,
}: ErrorFixNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (errors.length > 0 || isFixing) {
      setIsVisible(true);
      return;
    }

    // Delay hiding to allow animation
    const timer = setTimeout(() => setIsVisible(false), 300);
    return () => clearTimeout(timer);
  }, [errors.length, isFixing]);

  if (!isVisible) return null;

  const errorsByType = errors.reduce((acc, error) => {
    if (!acc[error.type]) {
      acc[error.type] = [];
    }
    acc[error.type].push(error);
    return acc;
  }, {} as Record<string, PreviewError[]>);

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md animate-slide-up">
      <div className="bg-card border border-border rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className={`px-4 py-3 flex items-center justify-between ${
          isFixing ? 'bg-blue-50 border-b border-blue-200' :
          'bg-red-50 border-b border-red-200'
        }`}>
          <div className="flex items-center gap-2">
            {isFixing ? (
              <>
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-medium text-blue-700">
                  Fixing Errors...
                </span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium text-red-700">
                  Preview Errors Detected
                </span>
              </>
            )}
          </div>
          {!isFixing && onDismiss && (
            <button
              onClick={onDismiss}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Content */}
        <div className="px-4 py-3 max-h-64 overflow-y-auto">
          {isFixing ? (
            <div className="text-sm text-muted-foreground">
              <p className="mb-2">
                The AI is analyzing and fixing the detected errors...
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span>This may take a few moments</span>
              </div>
            </div>
          ) : (
            <>
              <div className="text-sm text-foreground mb-3">
                {errors.length} error{errors.length > 1 ? 's' : ''} found in preview:
              </div>

              {/* Error Groups */}
              <div className="space-y-2">
                {Object.entries(errorsByType).map(([type, typeErrors]) => (
                  <div key={type} className="bg-muted rounded p-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-orange-600 uppercase">
                        {type}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({typeErrors.length})
                      </span>
                    </div>
                    <div className="space-y-1">
                      {typeErrors.slice(0, 2).map((error, idx) => (
                        <div key={idx} className="text-xs text-muted-foreground">
                          {error.message.substring(0, 80)}
                          {error.message.length > 80 ? '...' : ''}
                        </div>
                      ))}
                      {typeErrors.length > 2 && (
                        <div className="text-xs text-muted-foreground italic">
                          + {typeErrors.length - 2} more...
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        {!isFixing && onManualFix && (
          <div className="px-4 py-3 bg-muted border-t border-border flex gap-2">
            <button
              onClick={onManualFix}
              className="flex-1 px-3 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
            >
              Fix Automatically
            </button>
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="px-3 py-2 text-sm font-medium bg-secondary hover:bg-accent text-muted-foreground rounded transition-colors"
              >
                Dismiss
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
