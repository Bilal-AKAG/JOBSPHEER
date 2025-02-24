export interface Job {
  _id: string;
  id: string;
  title: string;
  type: string;
  salary: string;
  description: string;
  company: string;
  logo: string;
  isBookMarked: boolean;
  location: string;
  experienceLevel: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobsResponse {
  jobs: Job[];
  total: number;
  page: number;
  limit: number;
}
