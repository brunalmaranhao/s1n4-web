import { del } from "@/services/methods/delete";
import { get } from "@/services/methods/get";
import { post } from "@/services/methods/post";

export default async function ReportService() {
  async function createReport(
    name: string,
    pbiWorkspaceId: string,
    pbiReportId: string,
    customerId: string,
  ): Promise<string> {
    const payload = JSON.stringify({
      name,
      pbiWorkspaceId,
      pbiReportId,
      customerId,
    });
    const response = await post<{ reportId: string }, string>(
      `/report`,
      payload,
    );
    return response.reportId;
  }

  async function fetchReports(
    page: number,
    size: number,
  ): Promise<{ reports: ReportDetailsResponse[]; total: number }> {
    const response = await get<{
      reportsEmbeds: ReportDetailsResponse[];
      total: number;
    }>(`/pbi-reports/all?page=${page}&size=${size}`);

    return { reports: response.reportsEmbeds, total: response.total };
  }

  async function fetchReportsByCustomerId(
    customerId: string,
    page: number,
    size: number,
  ): Promise<{ reports: ReportDetailsResponse[]; total: number }> {
    const response = await get<{
      reportsEmbeds: ReportDetailsResponse[];
      total: number;
    }>(`/pbi-reports/${customerId}?page=${page}&size=${size}`);

    return { reports: response.reportsEmbeds, total: response.total };
  }

  async function fetchReportsByUser(
    page: number,
    size: number,
  ): Promise<{ reports: ReportDetailsResponse[]; total: number }> {
    const response = await get<{
      reportsEmbeds: ReportDetailsResponse[];
      total: number;
    }>(`/pbi-reports?page=${page}&size=${size}`);

    return { reports: response.reportsEmbeds, total: response.total };
  }

  async function remove(id: string): Promise<void> {
    await del<void>(`/report/${id}`);
  }
  async function fetchProjectsByCustomer(
    customerId: string,
  ): Promise<IProject[]> {
    const response = await get<{ projects: IProject[] }>(
      `/customer/${customerId}/projects`,
    );
    return response.projects;
  }


  return {
    createReport,
    fetchReports,
    fetchReportsByCustomerId,
    fetchReportsByUser,
    remove
  };
}
