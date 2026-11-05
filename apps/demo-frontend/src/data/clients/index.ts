import type { ClientConfig } from "@/types";
import allcity from "./allcity-homeservices.json";
import northstar from "./northstar-hvac.json";

const registry: Record<string, ClientConfig> = {
  "allcity-homeservices": allcity as ClientConfig,
  "northstar-hvac": northstar as ClientConfig,
};

export function getClientConfig(slug: string): ClientConfig | null {
  return registry[slug] ?? null;
}

export function listSlugs(): string[] {
  return Object.keys(registry);
}
