"use client";

import { AuthProvider } from "@/context/AuthContext";
import { FormWizardCustomerProvider } from "@/context/FormWizardCustomerContext";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <FormWizardCustomerProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </FormWizardCustomerProvider>
    </AuthProvider>
  );
}
