// Core domain types for the Caphè Home Services demo factory.
// Configuration drives the UI; these types enforce the shape of every config file.

export type Environment = "demo" | "production";

export type IndustryId = "hvac" | "pest_control" | "plumbing" | "electrical" | "roofing";

export type ThemeId = "industrial" | "premium" | "rapid-response";

export type IntakeStepId =
  | "service"
  | "issue"
  | "property"
  | "scheduling"
  | "contact"
  | "confirmation";

export type Urgency = "asap" | "within_week" | "planning_ahead";

export type PropertyType = "residential" | "commercial" | "multi_unit";

// ── Client config (config/clients/*.json) ──────────────────────────────────

export interface ClientBranding {
  businessName: string;
  tagline?: string;
  primaryColor: string;
  accentColor: string;
  logoUrl?: string;
  phone?: string;
}

export interface ClientReviewConfig {
  provider: "manual" | "yelp" | "google";
  enabled: boolean;
  verified: boolean;
  yelpUrl?: string;
}

export interface ClientCRMConfig {
  mode: "standalone" | "hubspot" | "followupboss";
  provider: string | null;
}

export interface ClientConfig {
  clientId: string;
  industry: IndustryId;
  template: ThemeId;
  environment: Environment;
  routing: {
    slug: string;
    destination: string;
  };
  branding: ClientBranding;
  intake: {
    steps: IntakeStepId[];
    services: string[];
  };
  reviews: ClientReviewConfig;
  crm: ClientCRMConfig;
  leadDestination: "test-inbox" | "webhook" | "crm";
}

// ── Industry config (config/industries/*.json) ─────────────────────────────

export interface ServiceOption {
  id: string;
  label: string;
  description?: string;
}

export interface IntakeQuestion {
  id: string;
  label: string;
  type: "select" | "text" | "textarea";
  options?: { value: string; label: string }[];
  required: boolean;
}

export interface IndustryConfig {
  industryId: IndustryId;
  displayName: string;
  defaultServices: ServiceOption[];
  intakeQuestions: Record<IntakeStepId, IntakeQuestion[]>;
  defaultTheme: ThemeId;
  conversionCTA: string;
}

// ── Theme config (config/themes/*.json) ────────────────────────────────────

export interface ThemeConfig {
  themeId: ThemeId;
  displayName: string;
  colors: {
    primary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
  };
  heroHeadline: string;
  heroSubtext: string;
}

// ── Intake session (runtime) ───────────────────────────────────────────────

export interface IntakeFormData {
  service?: string;
  systemType?: string;
  issueDescription?: string;
  urgency?: Urgency;
  propertyType?: PropertyType;
  zipCode?: string;
  preferredDate?: string;
  name?: string;
  phone?: string;
  email?: string;
}

export interface LeadSubmission {
  clientId: string;
  slug: string;
  sessionId: string;
  environment: Environment;
  isTestSubmission: boolean;
  formData: IntakeFormData;
  submittedAt: string;
}
