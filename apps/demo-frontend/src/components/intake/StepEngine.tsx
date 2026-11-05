"use client";

import { useState } from "react";
import type { ClientConfig, IntakeStepId, IntakeFormData } from "@/types";
import ServiceSelector from "./ServiceSelector";
import IssueDetails from "./IssueDetails";
import PropertyDetails from "./PropertyDetails";
import Scheduling from "./Scheduling";
import ContactCapture from "./ContactCapture";
import Confirmation from "./Confirmation";

interface Props {
  config: ClientConfig;
}

const STEP_COMPONENTS: Record<
  IntakeStepId,
  React.ComponentType<{ config: ClientConfig; data: IntakeFormData; onNext: (patch: Partial<IntakeFormData>) => void }>
> = {
  service: ServiceSelector,
  issue: IssueDetails,
  property: PropertyDetails,
  scheduling: Scheduling,
  contact: ContactCapture,
  confirmation: Confirmation,
};

export default function StepEngine({ config }: Props) {
  const steps = config.intake.steps;
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState<IntakeFormData>({});

  const currentStep = steps[stepIndex] as IntakeStepId;
  const StepComponent = STEP_COMPONENTS[currentStep];
  const progress = Math.round(((stepIndex + 1) / steps.length) * 100);

  function handleNext(patch: Partial<IntakeFormData>) {
    setFormData((prev) => ({ ...prev, ...patch }));
    if (stepIndex < steps.length - 1) {
      setStepIndex((i) => i + 1);
    }
  }

  return (
    <div>
      {/* Progress bar */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ fontSize: "12px", color: "var(--color-muted)", marginBottom: "6px" }}>
          Step {stepIndex + 1} of {steps.length}
        </div>
        <div
          style={{
            height: "4px",
            background: "var(--color-surface)",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "var(--color-accent)",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>

      <StepComponent config={config} data={formData} onNext={handleNext} />
    </div>
  );
}
