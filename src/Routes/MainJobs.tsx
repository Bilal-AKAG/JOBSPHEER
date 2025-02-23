import type React from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchBar } from "../components/SearchBar";
import { Filters } from "../components/Filters";
import { JobList } from "../components/JobList";
import { SavedJobs } from "../components/SavedJobs";
import { Pagination } from "../components/Pagination";
import type { Job } from "../types";

const JOBS_PER_PAGE = 5; // Make sure this matches your API's limit

type FetchJobsParams = {
  page: number;
  searchTerm: string;
  selectedTypes: string[];
  salaryRange: [number, number];
};

type JobsResponse = {
  jobs: Job[];
  total: number;
  currentPage: number;
  totalPages: number;
};

const fetchJobs = async ({
  page,
  searchTerm,
  selectedTypes,
  salaryRange,
}: FetchJobsParams): Promise<JobsResponse> => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: JOBS_PER_PAGE.toString(),
  });

  if (searchTerm) {
    queryParams.append("title", searchTerm);
  }

  if (selectedTypes.length === 1) {
    queryParams.append("type", selectedTypes[0]);
  }

  if (salaryRange[1] < 200000) {
    queryParams.append("minSalary", salaryRange[0].toString());
    queryParams.append("maxSalary", salaryRange[1].toString());
  }

  console.log(`Fetching page ${page}`); // Debug log

  const response = await fetch(
    `https://joblisting-rd8f.onrender.com/api/jobs?${queryParams.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const data = await response.json();
  console.log("API Response:", data); // Debug log

  return {
    jobs: data.jobs,
    total: data.total,
    currentPage: data.currentPage || page,
    totalPages: data.totalPages || Math.ceil(data.total / JOBS_PER_PAGE),
  };
};

const MainJobs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 200000]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Set<string>>(new Set());

  const { data, isLoading, refetch } = useQuery<JobsResponse>({
    queryKey: [
      "jobs",
      currentPage,
      searchTerm,
      selectedTypes.join(","),
      salaryRange.join(","),
    ],
    queryFn: () =>
      fetchJobs({
        page: currentPage,
        searchTerm,
        selectedTypes,
        salaryRange,
      }),
    keepPreviousData: true,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  const handlePageChange = (page: number) => {
    console.log("Changing to page:", page); // Debug log
    setCurrentPage(page);
    refetch();
  };

  const toggleJobType = (type: string) => {
    setSelectedTypes((prev) => {
      const newTypes = prev.includes(type) ? [] : [type];
      setCurrentPage(1);
      return newTypes;
    });
  };

  const handleSalaryRangeChange = (value: number) => {
    setSalaryRange([0, value]);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedTypes([]);
    setSalaryRange([0, 200000]);
    setSearchTerm("");
    setCurrentPage(1);
    refetch();
  };

  const toggleBookmark = (jobId: string) => {
    setBookmarkedJobs((prev) => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(jobId)) {
        newBookmarks.delete(jobId);
      } else {
        newBookmarks.add(jobId);
      }
      return newBookmarks;
    });
  };

  const jobs =
    data?.jobs.map((job) => ({
      ...job,
      isBookMarked: bookmarkedJobs.has(job.id),
    })) || [];

  const savedJobs = jobs.filter((job) => bookmarkedJobs.has(job.id));

  // Calculate total pages based on the API response
  const totalPages = data?.totalPages || 1;

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
            toggleJobType={toggleJobType}
            salaryRange={salaryRange}
            handleSalaryRangeChange={handleSalaryRangeChange}
            resetFilters={resetFilters}
          />
          <div className="col-span-6">
            <JobList
              jobs={jobs}
              toggleBookmark={toggleBookmark}
              loading={isLoading}
            />
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
          <div className="col-span-3">
            <SavedJobs jobs={savedJobs} toggleBookmark={toggleBookmark} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainJobs;
