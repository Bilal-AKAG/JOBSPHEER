export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  posted: string;
  isBookMarked?: boolean;
}
export interface JobsResponse {
  jobs: Job[];
  totalJobs: number;
  currentPage: number;
  totalPages: number;
}
