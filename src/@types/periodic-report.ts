declare interface INewPeriodicReport{
    name: string;
    customerId: string;
    projectId: string;
    month: string
    year: string
    file: File[]
  }

  declare interface PeriodicReportDetailsResponse{
    id: string
    name: string
    year: string
    month: string
    url: string
    project:{
      name: string
    }
    status: 'ACTIVE' | 'INACTIVE'
  }
  