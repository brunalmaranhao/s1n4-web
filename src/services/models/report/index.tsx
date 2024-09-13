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

  return {
    createReport,
  };
}
