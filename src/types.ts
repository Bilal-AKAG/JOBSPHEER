export interface Job {
    id: string
    title: string
    type: string
    salary: string
    description: string
    company: string
    logo: string
    isBookMarked: boolean
  }
  
  export interface JobsResponse {
    jobs: Job[]
    totalJobs: number
    currentPage: number
    totalPages: number
  }
  
  