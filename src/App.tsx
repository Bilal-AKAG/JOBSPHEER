import type React from "react"
import { useEffect, useState } from "react"
import type { Job } from "./types"
import { Header } from "./components/Header"
import { SearchBar } from "./components/SearchBar"
import { Filters } from "./components/Filters"
import { JobList } from "./components/JobList"
import { SavedJobs } from "./components/SavedJobs"
import { Pagination } from "./components/Pagination"
import { useParams } from "react-router"
interface JobsResponse {
  total: number;
  page: number;
  limit: number;
  jobs: Job[];
}

function App() {
  const [allJobs, setAllJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 200000])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const jobsPerPage = 5

  useEffect(() => {
    fetchJobs(1)
  }, [])

  // Apply filters whenever selectedTypes or salaryRange changes
  useEffect(() => {
    filterJobs(allJobs, true)
  }, [selectedTypes, salaryRange])

  const filterJobs = (jobs = allJobs, resetPage = true) => {
    let filtered = [...jobs]
    
    // Apply job type filter
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(job => selectedTypes.includes(job.type))
    }

    // Apply salary filter
    if (salaryRange[1] < 200000) {
      filtered = filtered.filter(job => {
        // Convert salary string to number (remove $ and ,)
        const salary = Number(job.salary.replace(/[$,]/g, ''))
        return salary <= salaryRange[1]
      })
    }

    setFilteredJobs(filtered)
    // Update total pages based on filtered results
    setTotalPages(Math.max(1, Math.ceil(filtered.length / jobsPerPage)))
    // Only reset page when explicitly told to (i.e., when filters change)
    if (resetPage) {
      setCurrentPage(1)
    }
  }

  const getCurrentPageJobs = () => {
    const startIndex = (currentPage - 1) * jobsPerPage
    const endIndex = startIndex + jobsPerPage
    return filteredJobs.slice(startIndex, endIndex)
  }

  const fetchJobs = async (page: number) => {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: "50", // Fetch more jobs at once for client-side filtering
      })

      if (searchTerm) {
        queryParams.append("title", searchTerm)
      }

      const url = `https://joblisting-rd8f.onrender.com/api/jobs?${queryParams}`
      console.log("Fetching jobs with URL:", url)

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data: JobsResponse = await response.json()
      console.log("API Response:", data)
      
      setAllJobs(data.jobs)
      setFilteredJobs(data.jobs) // Initialize filtered jobs with all jobs
    } catch (error) {
      console.error("Error fetching jobs:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleJobType = (type: string) => {
    console.log("Toggling job type:", type)
    setSelectedTypes((prev) => {
      if (prev.includes(type)) {
        return []
      } else {
        return [type]
      }
    })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchJobs(1)
  }

  const handleSalaryRangeChange = (value: number) => {
    setSalaryRange([0, value])
  }

  const resetFilters = async () => {
    // First reset all states
    setSelectedTypes([])
    setSalaryRange([0, 200000])
    setSearchTerm("")
    setCurrentPage(1)

    // Then fetch new data
    try {
      setLoading(true)
      const response = await fetch("https://joblisting-rd8f.onrender.com/api/jobs?page=1&limit=50")
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data: JobsResponse = await response.json()
      console.log("Reset: Fetched new data:", data)
      
      setAllJobs(data.jobs)
      setFilteredJobs(data.jobs)
      setTotalPages(Math.max(1, Math.ceil(data.jobs.length / 5)))
    } catch (error) {
      console.error("Error resetting jobs:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleBookmark = (jobId: string) => {
    setAllJobs(prev => {
      const updated = prev.map((job) => 
        job.id === jobId ? { ...job, isBookMarked: !job.isBookMarked } : job
      )
      return updated
    })

    setFilteredJobs(prev => {
      const updated = prev.map((job) => 
        job.id === jobId ? { ...job, isBookMarked: !job.isBookMarked } : job
      )
      return updated
    })
  }

  const {paramId}=useParams();
  console.log(paramId);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          <Filters
            selectedTypes={selectedTypes}
            toggleJobType={toggleJobType}
            salaryRange={salaryRange}
            handleSalaryRangeChange={handleSalaryRangeChange}
            resetFilters={resetFilters}
          />
          <div className="col-span-6">
            <JobList jobs={getCurrentPageJobs()} toggleBookmark={toggleBookmark} loading={loading} />
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
          <div className="col-span-3">
            <SavedJobs jobs={filteredJobs.filter(job => job.isBookMarked)} toggleBookmark={toggleBookmark} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App;