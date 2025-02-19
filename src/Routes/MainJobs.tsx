import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { SearchBar } from "../components/SearchBar";
import { Filters } from "../components/Filters";
import { JobList } from "../components/JobList";
import { SavedJobs } from "../components/SavedJobs";
import { Pagination } from "../components/Pagination";
import type { Job } from "../types";

const jobsPerPage = 5;

type FetchJobsParams = {
  page: number;
  searchTerm: string;
  selectedTypes: string[];
  salaryRange: [number, number];
};

type JobsResponse = {
  jobs: Job[];
  total: number;
};

const fetchJobs = async ({
  page,
  searchTerm,
  selectedTypes,
  salaryRange,
}: FetchJobsParams): Promise<JobsResponse> => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: "50",
  });

  if (searchTerm) queryParams.append("title", searchTerm);

  const response = await fetch(
    `https://joblisting-rd8f.onrender.com/api/jobs?${queryParams}`
  );

  if (!response.ok) throw new Error("Failed to fetch jobs");
  return response.json();
};

const MainJobs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 200000]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading, refetch } = useQuery<JobsResponse>({
    queryKey: ["getjobs", searchTerm, selectedTypes, salaryRange, currentPage],
    queryFn: () =>
      fetchJobs({ page: currentPage, searchTerm, selectedTypes, salaryRange }),
    keepPreviousData: true,
  });

  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  useEffect(() => {
    if (data?.jobs) {
      let filtered = [...data.jobs];
      if (selectedTypes.length)
        filtered = filtered.filter((job) => selectedTypes.includes(job.type));
      if (salaryRange[1] < 200000)
        filtered = filtered.filter(
          (job) => Number(job.salary.replace(/[$,]/g, "")) <= salaryRange[1]
        );
      setFilteredJobs(filtered);
    }
  }, [data, selectedTypes, salaryRange]);

  const searchMutation = useMutation({
    mutationFn: () =>
      fetchJobs({ page: 1, searchTerm, selectedTypes, salaryRange }),
    onSuccess: () => refetch(),
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchMutation.mutate();
  };

  const resetFilters = () => {
    setSelectedTypes([]);
    setSalaryRange([0, 200000]);
    setSearchTerm("");
    setCurrentPage(1);
    refetch();
  };

  const toggleBookmark = (jobId: string) => {
    setFilteredJobs((prev) =>
      prev.map((job) =>
        job.id === jobId ? { ...job, isBookMarked: !job.isBookMarked } : job
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          <Filters
            selectedTypes={selectedTypes}
            toggleJobType={(type) =>
              setSelectedTypes((prev) =>
                prev.includes(type)
                  ? prev.filter((t) => t !== type)
                  : [...prev, type]
              )
            }
            salaryRange={salaryRange}
            handleSalaryRangeChange={(value) => setSalaryRange([0, value])}
            resetFilters={resetFilters}
          />
          <div className="col-span-6">
            <JobList
              jobs={filteredJobs.slice(
                (currentPage - 1) * jobsPerPage,
                currentPage * jobsPerPage
              )}
              toggleBookmark={toggleBookmark}
              loading={isLoading}
            />
            {filteredJobs.length > jobsPerPage && (
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredJobs.length / jobsPerPage)}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
          <div className="col-span-3">
            <SavedJobs
              jobs={filteredJobs.filter((job) => job.isBookMarked)}
              toggleBookmark={toggleBookmark}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainJobs;
