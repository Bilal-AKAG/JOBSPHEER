export interface Job {
  id: string;
  title: string;
  currency: string;
  experienceLevel: string;
  type: string;
  location: string;
  salary: string;
  description: string;
  company: string;
  logo: string;
  isBookMarked: boolean;
}
  
  export interface JobsResponse {
    jobs: Job[]
    totalJobs: number
    currentPage: number
    totalPages: number
  }
  
  