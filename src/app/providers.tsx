"use client";

import { AppProvider } from "@/context/AppConext";
import { AuthProvider } from "@/context/AuthContext";
import { CustomerProvider } from "@/context/CustomerContext";
import { FinancialProvider } from "@/context/FinancialContext";
import { FormWizardCustomerProvider } from "@/context/FormWizardCustomerContext";
import { NotificationProvider } from "@/context/NotificationsContext";
import { ProjectProvider } from "@/context/ProjectContext";
import { ReportProvider } from "@/context/ReportContext";
import { TagProvider } from "@/context/TagContext";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <AppProvider>
        <AuthProvider>
          <FormWizardCustomerProvider>
            <CustomerProvider>
              <ProjectProvider>
                <ReportProvider>
                  <NotificationProvider>
                    <FinancialProvider>
                      <TagProvider>
                        <NextUIProvider>{children}</NextUIProvider>
                      </TagProvider>
                    </FinancialProvider>
                  </NotificationProvider>
                </ReportProvider>
              </ProjectProvider>
            </CustomerProvider>
          </FormWizardCustomerProvider>
        </AuthProvider>
      </AppProvider>
    </ThemeProvider>
  );
}
