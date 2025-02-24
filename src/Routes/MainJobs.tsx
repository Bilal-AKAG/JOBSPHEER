import type React from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchBar } from "../components/SearchBar";
import { Filters } from "../components/Filters";
import { JobList } from "../components/JobList";
import { SavedJobs } from "../components/SavedJobs";
import { Pagination } from "../components/Pagination";
import type { JobsResponse } from "../types";

const JOBS_PER_PAGE = 3; // We'll keep this the same unless API indicates otherwise

type FetchJobsParams = {
  page: number;
  searchTerm: string;
  selectedTypes: string[];
  salaryRange: [number, number];
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

  // Update search parameter
  if (searchTerm.trim()) {
    queryParams.append("title", searchTerm.trim());
  }

  // Update type parameter - ensure exact match with API values
  if (selectedTypes.length === 1) {
    const typeMap: Record<string, string> = {
      "Full-time": "Full-time",
      Hybrid: "Hybrid",
      Internship: "Internship",
      Contract: "Contract",
      Volunteer: "Volunteer",
    };
    const mappedType = typeMap[selectedTypes[0]];
    if (mappedType) {
      queryParams.append("type", mappedType);
    }
  }

  // Update salary range parameters
  if (salaryRange[1] < 200000) {
    queryParams.append("minSalary", salaryRange[0].toString());
    queryParams.append("maxSalary", salaryRange[1].toString());
    queryParams.append("maxSalary", salaryRange[1].toString());
  }

  const url = `https://joblisting-3hjv.onrender.com/api/jobs?${queryParams}`;
  console.log("Fetching with filters:", url);

  const response = await fetch(url);
  const data = await response.json();

  console.log("API Response:", data);

  // Handle empty results properly
  return {
    jobs: data.jobs || [],
    total: data.total || 0,
    page: data.page || page,
    limit: data.limit || JOBS_PER_PAGE,
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
    console.log("Changing to page:", page);
    setCurrentPage(page);
    refetch();
  };

  const toggleJobType = (type: string) => {
    setSelectedTypes((prev) => {
      const newTypes = prev.includes(type) ? [] : [type];
      setCurrentPage(1);
      return newTypes;
    });
    refetch();
  };

  const handleSalaryRangeChange = (value: number) => {
    setSalaryRange([0, value]);
    setCurrentPage(1);
    refetch();
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

  // Calculate total pages based on total jobs and limit
  const totalPages = data
    ? Math.ceil(data.total / (data.limit || JOBS_PER_PAGE))
    : 1;

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
