"use client";

import { AuthProvider } from "@/context/AuthContext";
import { CustomerProvider } from "@/context/CustomerContext";
import { FormWizardCustomerProvider } from "@/context/FormWizardCustomerContext";
import { NotificationProvider } from "@/context/NotificationsContext";
import { ProjectProvider } from "@/context/ProjectContext";
import { ReportProvider } from "@/context/ReportContext";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <FormWizardCustomerProvider>
        <CustomerProvider>
          <ProjectProvider>
            <ReportProvider>
              <NotificationProvider>
                <NextUIProvider>{children}</NextUIProvider>
              </NotificationProvider>
            </ReportProvider>
          </ProjectProvider>
        </CustomerProvider>
      </FormWizardCustomerProvider>
    </AuthProvider>
  );
}
