"use client";

import { AppProvider } from "@/context/AppConext";
import { AuthProvider } from "@/context/AuthContext";
import { CustomerProvider } from "@/context/CustomerContext";
import { FinancialProvider } from "@/context/FinancialContext";
import { FormWizardCustomerProvider } from "@/context/FormWizardCustomerContext";
import { NotificationProvider } from "@/context/NotificationsContext";
import { ProjectProvider } from "@/context/ProjectContext";
import { ProjectUpdateProvider } from "@/context/ProjectUpdateContext";
import { ReportProvider } from "@/context/ReportContext";
import { TagProvider } from "@/context/TagContext";
import { UserCustomerProvider } from "@/context/UserCostumerContext";
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
                        <ProjectUpdateProvider>
                          <UserCustomerProvider>
                            <NextUIProvider>{children}</NextUIProvider>
                          </UserCustomerProvider>
                        </ProjectUpdateProvider>
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
