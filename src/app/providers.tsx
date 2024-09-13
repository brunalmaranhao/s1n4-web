"use client";

import { AuthProvider } from "@/context/AuthContext";
import { FormWizardCustomerProvider } from "@/context/FormWizardCustomerContext";
import { ProjectProvider } from "@/context/ProjectContext";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <FormWizardCustomerProvider>
        <ProjectProvider>
          <NextUIProvider>{children}</NextUIProvider>
        </ProjectProvider>
      </FormWizardCustomerProvider>
    </AuthProvider>
  );
}
