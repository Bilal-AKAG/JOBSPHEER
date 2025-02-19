import type { Job } from "../types"
import { BookmarkIcon, ShareIcon } from "../icons"
import {useNavigate } from "react-router";

interface JobCardProps {
  job: Job
  toggleBookmark: (jobId: string) => void
}

export function JobCard({ job, toggleBookmark }: JobCardProps) {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if the click is inside a button
    if ((e.target as HTMLElement).closest("button")) {
      e.stopPropagation();
      return;
    }
    navigate(`/jobs/${job.id}`);
  };
  return (
    <div
      className="bg-white p-6 rounded-lg cursor-pointer shadow-sm"
      onClick={handleCardClick}

    >
      <div className="flex justify-between">
        <div className="flex space-x-4">
          <img
            src={job.logo || "/placeholder.svg"}
            alt={job.company}
            className="h-12 w-12 rounded"
          />
          <div>
            
              <h1>{job.title}</h1>
          
            <p className="text-gray-600">{job.company}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevents click from triggering <Link>
              toggleBookmark(job.id);
            }}
            className={`p-2 rounded-full hover:bg-gray-100 ${
              job.isBookMarked ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <BookmarkIcon className="h-5 w-5 cursor-pointer" />
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400"
            onClick={(e) => e.stopPropagation()}
          >
            <ShareIcon className="h-5 w-5 cursor-pointer" />
          </button>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex space-x-4 text-sm text-gray-600">
          <span className="px-3 py-1 bg-gray-100 rounded-full">Remote</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full">{job.type}</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full">
            {job.salary}
          </span>
        </div>
        <p className="mt-4 text-gray-600">{job.description}</p>
      </div>
    </div>
  );
}

