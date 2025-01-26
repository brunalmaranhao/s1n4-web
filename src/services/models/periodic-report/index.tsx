import { api } from "@/services/api";
import { get } from "@/services/methods/get";
import { post, postFormData } from "@/services/methods/post";

export default async function PeriodicReportService() {
  async function createPeriodicReport(
    report: INewPeriodicReport,
  ): Promise<string> {
    const { name, month, year, projectId, file } = report;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("month", month);
    formData.append("year", year);
    formData.append("projectId", projectId);
    formData.append("file", file[0]);

    const response = await api.post<{ report: string }>(
      `/periodic-report`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data.report;
  }

  async function fetchPeriodicReportsByUser(): Promise<{
    periodicReports: PeriodicReportDetailsResponse[];
  }> {
    const response = await get<{
      periodicReports: PeriodicReportDetailsResponse[];
    }>(`/periodic-report`);

    return { periodicReports: response.periodicReports };
  }

  async function fetchPeriodicReportsByCustomer(customerId: string): Promise<{
    periodicReports: PeriodicReportDetailsResponse[];
  }> {
    const response = await get<{
      periodicReports: PeriodicReportDetailsResponse[];
    }>(`/periodic-report/customer/${customerId}`);

    return { periodicReports: response.periodicReports };
  }
  async function fetchPeriodicReportsByCustomerAndYear(
    customerId: string,
    year: string,
  ): Promise<{
    periodicReports: PeriodicReportDetailsResponse[];
  }> {
    const response = await get<{
      periodicReports: PeriodicReportDetailsResponse[];
    }>(`/periodic-report/customer/${customerId}/${year}`);

    return { periodicReports: response.periodicReports };
  }

  async function fetchPeriodicReportsByUserAndYear(year: string): Promise<{
    periodicReports: PeriodicReportDetailsResponse[];
  }> {
    const response = await get<{
      periodicReports: PeriodicReportDetailsResponse[];
    }>(`/periodic-report/${year}`);

    return { periodicReports: response.periodicReports };
  }

  async function fetchAll(): Promise<{
    periodicReports: PeriodicReportDetailsResponse[];
  }> {
    const response = await get<{
      periodicReports: PeriodicReportDetailsResponse[];
    }>(`/periodic-report/all`);

    return { periodicReports: response.periodicReports };
  }

  return {
    createPeriodicReport,
    fetchPeriodicReportsByUser,
    fetchPeriodicReportsByUserAndYear,
    fetchPeriodicReportsByCustomerAndYear,
    fetchPeriodicReportsByCustomer,
    fetchAll,
  };
}
