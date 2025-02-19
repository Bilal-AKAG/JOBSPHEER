
import type { Job } from "../types";
import { JobCard } from "./JobCard";

interface JobListProps {
  jobs: Job[];
  loading: boolean;
  hasMore: boolean;
  loadMoreJobs: () => void;
  toggleBookmark: (jobId: string) => void;
}

export function JobList({
  jobs,
  loading,
  hasMore,
  loadMoreJobs,
  toggleBookmark,
}: JobListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm text-center">
        <div className="text-gray-500 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto mb-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No matching jobs found
          </h3>
          <p className="text-gray-500">
            Try adjusting your filters or salary range to see more results.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-6">
      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} toggleBookmark={toggleBookmark} />
        ))}
      </div>
      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={loadMoreJobs}
            className="bg-blue-600 text-white px-6 py-2 rounded-md"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
