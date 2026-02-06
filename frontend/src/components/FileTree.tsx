import React from 'react';
import { useSoundEffects } from '../hooks/useSoundEffects';

/**
 * Returns a colored icon element for a given file extension/name.
 * Colors match popular editor icon themes (VS Code Material Icons).
 */
const getFileIcon = (filename: string): React.ReactNode => {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  const lowerName = filename.toLowerCase();

  // Language / extension color map
  const langColors: Record<string, string> = {
    ts: '#3178c6', tsx: '#3178c6',
    js: '#f7df1e', jsx: '#61dafb', mjs: '#f7df1e', cjs: '#f7df1e',
    py: '#3572A5', pyw: '#3572A5',
    html: '#e34c26', htm: '#e34c26',
    css: '#563d7c', scss: '#c6538c', less: '#1d365d', sass: '#c6538c',
    json: '#a8b065',
    md: '#519aba', mdx: '#519aba',
    go: '#00ADD8',
    rs: '#dea584',
    java: '#b07219',
    rb: '#CC342D', rake: '#CC342D',
    php: '#4F5D95',
    swift: '#F05138',
    c: '#555555', h: '#555555',
    cpp: '#f34b7d', cc: '#f34b7d', cxx: '#f34b7d', hpp: '#f34b7d',
    cs: '#178600',
    vue: '#41b883',
    svelte: '#ff3e00',
    yaml: '#cb171e', yml: '#cb171e',
    xml: '#0060ac',
    svg: '#FFB13B',
    sql: '#e38c00',
    sh: '#89e051', bash: '#89e051', zsh: '#89e051',
    toml: '#9c4221',
    lua: '#000080',
    r: '#198CE7',
    dart: '#00B4AB',
    kt: '#A97BFF', kts: '#A97BFF',
    scala: '#DC322F',
    ex: '#6e4a7e', exs: '#6e4a7e',
    erl: '#B83998',
    hs: '#5e5086',
    clj: '#db5855',
    graphql: '#e535ab', gql: '#e535ab',
    proto: '#4285F4',
    tf: '#5C4EE5',
    zig: '#F7A41D',
  };

  const imageExts = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'ico', 'tiff']);
  const configExts = new Set(['env', 'ini', 'cfg', 'conf']);
  const lockExts = new Set(['lock']);
  const textExts = new Set(['txt', 'rtf', 'log']);

  // Small colored SVG icon builder
  const buildIcon = (color: string, shape: 'code' | 'data' | 'text' | 'image' | 'config' | 'generic' = 'code') => {
    const paths: Record<string, React.ReactNode> = {
      code: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
          <rect x="1" y="1" width="14" height="14" rx="2" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1" />
          <path d="M6 5L3.5 8L6 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 5L12.5 8L10 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      data: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
          <rect x="1" y="1" width="14" height="14" rx="2" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1" />
          <text x="8" y="11.5" textAnchor="middle" fontSize="8" fontWeight="700" fill={color}>{'{}'}</text>
        </svg>
      ),
      text: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
          <rect x="1" y="1" width="14" height="14" rx="2" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1" />
          <line x1="4" y1="5" x2="12" y2="5" stroke={color} strokeWidth="1" strokeLinecap="round" />
          <line x1="4" y1="8" x2="10" y2="8" stroke={color} strokeWidth="1" strokeLinecap="round" />
          <line x1="4" y1="11" x2="8" y2="11" stroke={color} strokeWidth="1" strokeLinecap="round" />
        </svg>
      ),
      image: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
          <rect x="1" y="1" width="14" height="14" rx="2" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1" />
          <circle cx="5.5" cy="5.5" r="1.5" fill={color} />
          <path d="M2 12L5.5 8.5L8 11L10.5 7.5L14 12" stroke={color} strokeWidth="1" strokeLinejoin="round" />
        </svg>
      ),
      config: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
          <rect x="1" y="1" width="14" height="14" rx="2" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1" />
          <circle cx="8" cy="8" r="2.5" stroke={color} strokeWidth="1.2" />
          <line x1="8" y1="2" x2="8" y2="4.5" stroke={color} strokeWidth="1" />
          <line x1="8" y1="11.5" x2="8" y2="14" stroke={color} strokeWidth="1" />
          <line x1="2" y1="8" x2="4.5" y2="8" stroke={color} strokeWidth="1" />
          <line x1="11.5" y1="8" x2="14" y2="8" stroke={color} strokeWidth="1" />
        </svg>
      ),
      generic: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
          <path d="M3 2H10L13 5V14H3V2Z" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1" strokeLinejoin="round" />
          <path d="M10 2V5H13" stroke={color} strokeWidth="1" strokeLinejoin="round" />
        </svg>
      ),
    };
    return paths[shape];
  };

  // Special filenames
  if (lowerName === 'dockerfile' || lowerName.startsWith('dockerfile.'))
    return buildIcon('#384d54', 'config');
  if (lowerName === '.gitignore' || lowerName === '.gitattributes')
    return buildIcon('#F05033', 'config');
  if (lowerName === 'package.json')
    return buildIcon('#cb3837', 'data');
  if (lowerName === 'tsconfig.json' || lowerName.startsWith('tsconfig.'))
    return buildIcon('#3178c6', 'data');
  if (lowerName === 'vite.config.ts' || lowerName === 'vite.config.js')
    return buildIcon('#646CFF', 'config');
  if (lowerName === 'tailwind.config.ts' || lowerName === 'tailwind.config.js')
    return buildIcon('#06B6D4', 'config');
  if (lowerName === '.eslintrc' || lowerName.startsWith('.eslintrc.') || lowerName === 'eslint.config')
    return buildIcon('#4B32C3', 'config');
  if (lowerName === '.prettierrc' || lowerName.startsWith('.prettierrc.'))
    return buildIcon('#56B3B4', 'config');

  // Image files
  if (imageExts.has(ext)) return buildIcon('#a074c4', 'image');

  // JSON / data files
  if (ext === 'json' || ext === 'jsonc') return buildIcon(langColors['json'] || '#a8b065', 'data');

  // Text / markdown
  if (ext === 'md' || ext === 'mdx') return buildIcon(langColors['md'] || '#519aba', 'text');
  if (textExts.has(ext)) return buildIcon('#6B7280', 'text');

  // Config files
  if (configExts.has(ext)) return buildIcon('#ecd53f', 'config');
  if (lockExts.has(ext)) return buildIcon('#6B7280', 'config');
  if (ext === 'yaml' || ext === 'yml') return buildIcon(langColors['yaml'] || '#cb171e', 'data');
  if (ext === 'toml') return buildIcon(langColors['toml'] || '#9c4221', 'data');
  if (ext === 'xml') return buildIcon(langColors['xml'] || '#0060ac', 'data');
  if (ext === 'graphql' || ext === 'gql') return buildIcon(langColors['graphql'] || '#e535ab', 'data');

  // Code files with known language colors
  if (langColors[ext]) return buildIcon(langColors[ext], 'code');

  // Default
  return buildIcon('#6B7280', 'generic');
};

/** Folder icons (open / closed) */
const FolderIcon: React.FC<{ open: boolean }> = ({ open }) => {
  const color = '#dcb67a';
  if (open) {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
        <path d="M1.5 3H6L7.5 4.5H14.5V5.5H3L1.5 12.5V3Z" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1" strokeLinejoin="round" />
        <path d="M3 5.5H14.5L12.5 12.5H1.5L3 5.5Z" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M1.5 3H6L7.5 4.5H14.5V12.5H1.5V3Z" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
};

interface FileTreeProps {
  files: Array<{ path: string; content: string }>;
  onSelectFile: (file: { path: string; content: string }) => void;
  selectedFile?: { path: string; content: string } | null;
}

interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
}

export const FileTree: React.FC<FileTreeProps> = ({ files, onSelectFile, selectedFile }) => {
  const { playFileSelect, playToggle } = useSoundEffects();
  
  // Remove duplicate files (keep the last occurrence)
  const uniqueFiles = files.reduce((acc, file) => {
    const existingIndex = acc.findIndex(f => f.path === file.path);
    if (existingIndex !== -1) {
      acc[existingIndex] = file; // Replace with newer version
    } else {
      acc.push(file);
    }
    return acc;
  }, [] as Array<{ path: string; content: string }>);

  // Build tree structure from flat file list
  const buildTree = (files: Array<{ path: string; content: string }>): FileNode[] => {
    const root: FileNode[] = [];
    
    files.forEach(file => {
      const parts = file.path.split('/');
      let currentLevel = root;
      
      parts.forEach((part, index) => {
        const isFile = index === parts.length - 1;
        const existingNode = currentLevel.find(node => node.name === part);
        
        if (existingNode) {
          if (!isFile && existingNode.children) {
            currentLevel = existingNode.children;
          }
        } else {
          const newNode: FileNode = {
            name: part,
            path: parts.slice(0, index + 1).join('/'),
            type: isFile ? 'file' : 'folder',
            children: isFile ? undefined : [],
            content: isFile ? file.content : undefined,
          };
          
          currentLevel.push(newNode);
          
          if (!isFile && newNode.children) {
            currentLevel = newNode.children;
          }
        }
      });
    });
    
    return root;
  };

  const tree = buildTree(uniqueFiles);

  const TreeNode: React.FC<{ node: FileNode; level: number }> = ({ node, level }) => {
    const [isExpanded, setIsExpanded] = React.useState(true);
    const isSelected = selectedFile?.path === node.path;

    const handleClick = () => {
      if (node.type === 'folder') {
        playToggle();
        setIsExpanded(!isExpanded);
      } else {
        playFileSelect();
        onSelectFile({ path: node.path, content: node.content || '' });
      }
    };

    return (
      <div className="tree-node">
        <div 
          className={`tree-node-label ${isSelected ? 'selected' : ''}`}
          style={{ paddingLeft: `${level * 12}px` }}
          onClick={handleClick}
        >
          {node.type === 'folder' ? (
            <>
              <span className="folder-icon"><FolderIcon open={isExpanded} /></span>
              <span className="node-name">{node.name}</span>
            </>
          ) : (
            <>
              <span className="file-icon">{getFileIcon(node.name)}</span>
              <span className="node-name">{node.name}</span>
            </>
          )}
        </div>
        {node.type === 'folder' && isExpanded && node.children && (
          <div className="tree-node-children">
            {node.children.map((child, index) => (
              <TreeNode key={`${child.path}-${index}`} node={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="file-tree-list">
      {tree.map((node, index) => (
        <TreeNode key={`${node.path}-${index}`} node={node} level={0} />
      ))}
    </div>
  );
};
