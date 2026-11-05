import { ClientConfigSchema } from "./schema";
import type { ClientConfig, IndustryConfig, ThemeConfig } from "../types";

export async function loadClientConfig(slug: string): Promise<ClientConfig> {
  const res = await fetch(`/api/config/${slug}`);
  if (!res.ok) throw new Error(`No config found for slug: ${slug}`);
  const raw = await res.json();
  return ClientConfigSchema.parse(raw);
}

export function resolveTheme(
  clientConfig: ClientConfig,
  themes: Record<string, ThemeConfig>
): ThemeConfig {
  const base = themes[clientConfig.template];
  if (!base) throw new Error(`Unknown theme: ${clientConfig.template}`);
  return {
    ...base,
    colors: {
      ...base.colors,
      primary: clientConfig.branding.primaryColor ?? base.colors.primary,
      accent: clientConfig.branding.accentColor ?? base.colors.accent,
    },
  };
}

export function buildCSSVars(theme: ThemeConfig): Record<string, string> {
  return {
    "--color-primary": theme.colors.primary,
    "--color-accent": theme.colors.accent,
    "--color-bg": theme.colors.background,
    "--color-surface": theme.colors.surface,
    "--color-text": theme.colors.text,
    "--color-muted": theme.colors.muted,
  };
}

// Slug → industry config mapping for server-side rendering
export function resolveIndustryConfig(
  industryId: string,
  industries: Record<string, IndustryConfig>
): IndustryConfig {
  const config = industries[industryId];
  if (!config) throw new Error(`Unknown industry: ${industryId}`);
  return config;
}

// In production mode this checks an env var; in demo mode always returns true.
export function isDemoMode(clientConfig: ClientConfig): boolean {
  return clientConfig.environment === "demo";
}
