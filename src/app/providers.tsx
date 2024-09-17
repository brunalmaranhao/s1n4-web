"use client";

import { AuthProvider } from "@/context/AuthContext";
import { FormWizardCustomerProvider } from "@/context/FormWizardCustomerContext";
import { NotificationProvider } from "@/context/NotificationsContext";
import { ProjectProvider } from "@/context/ProjectContext";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <FormWizardCustomerProvider>
        <ProjectProvider>
          <NotificationProvider>
            <NextUIProvider>{children}</NextUIProvider>
          </NotificationProvider>
        </ProjectProvider>
      </FormWizardCustomerProvider>
    </AuthProvider>
  );
}
