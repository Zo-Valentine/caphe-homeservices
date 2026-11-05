import { z } from "zod";

export const IntakeFormSchema = z.object({
  service: z.string().min(1, "Please select a service"),
  systemType: z.string().optional(),
  issueDescription: z.string().optional(),
  urgency: z.enum(["asap", "within_week", "planning_ahead"]).optional(),
  propertyType: z.enum(["residential", "commercial", "multi_unit"]).optional(),
  zipCode: z
    .string()
    .regex(/^\d{5}$/, "Enter a 5-digit ZIP")
    .optional(),
  preferredDate: z.string().optional(),
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email").optional(),
});

export type IntakeFormValues = z.infer<typeof IntakeFormSchema>;

export const ClientConfigSchema = z.object({
  clientId: z.string(),
  industry: z.enum(["hvac", "pest_control", "plumbing", "electrical", "roofing"]),
  template: z.enum(["industrial", "premium", "rapid-response"]),
  environment: z.enum(["demo", "production"]),
  routing: z.object({
    slug: z.string(),
    destination: z.string(),
  }),
  branding: z.object({
    businessName: z.string(),
    tagline: z.string().optional(),
    primaryColor: z.string(),
    accentColor: z.string(),
    logoUrl: z.string().optional(),
    phone: z.string().optional(),
  }),
  intake: z.object({
    steps: z.array(
      z.enum(["service", "issue", "property", "scheduling", "contact", "confirmation"])
    ),
    services: z.array(z.string()),
  }),
  reviews: z.object({
    provider: z.enum(["manual", "yelp", "google"]),
    enabled: z.boolean(),
    verified: z.boolean(),
    yelpUrl: z.string().optional(),
  }),
  crm: z.object({
    mode: z.enum(["standalone", "hubspot", "followupboss"]),
    provider: z.string().nullable(),
  }),
  leadDestination: z.enum(["test-inbox", "webhook", "crm"]),
});
