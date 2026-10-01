export type SnippetCategory =
  | 'compose-national-day'
  | 'compose-update-dialogs'
  | 'compose-buttons'
  | 'compose-inputs'
  | 'compose-selection'
  | 'compose-loaders'
  | 'compose-cards'
  | 'compose-nav'
  | 'compose-feedback'
  | 'compose-forms'
  | 'compose-common'
  | 'kotlin-coroutine'
  | 'android-arch'
  | 'android-system'
  | 'android-utils'
  | 'custom';

export interface CategoryInfo {
  id: SnippetCategory;
  name: string;
  badge?: string;
  icon: string;
  description: string;
  group: 'compose' | 'kotlin' | 'system' | 'custom';
}

export interface Snippet {
  id: string;
  title: string;
  category: SnippetCategory;
  categoryName: string;
  language: 'kotlin' | 'compose' | 'xml' | 'gradle';
  description: string;
  tips?: string;
  code: string;
  tags: string[];
  isCustom?: boolean;
  createdAt?: number;
  interactivePreviewKey?: string;
  filePath?: string; // 精准对应 Android 项目文件路径，如 app/src/main/java/com/nationalday/ui/home/HomeScreen.kt
}

export interface GitHubConfig {
  owner: string;
  repo: string;
  branch: string;
  token?: string;
  projectBasePath: string;
}

export type ThemeGlassMode = 'dark-frost' | 'aurora-frost' | 'deep-sea';
