declare interface INewReport {
  name: string;
  workspaceId: string;
  reportId: string;
  actions?: string | null;
}

declare interface ReportDetailsProps {
  reportId: string;
  reportName: string;
  embedUrl: string;
}
declare interface ReportDetailsResponse {
  accessToken?: { token: string; expiration: string };
  embedUrl?: ReportDetailsProps[];
  expiry?: string;
  isError: boolean;
  name?: string
  id?: string
}
