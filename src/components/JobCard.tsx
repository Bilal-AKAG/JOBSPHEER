import type { Job } from "../types"
import { BookmarkIcon, ShareIcon } from "../icons"

interface JobCardProps {
  job: Job
  toggleBookmark: (jobId: string) => void
}

export function JobCard({ job, toggleBookmark }: JobCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between">
        <div className="flex space-x-4">
          <img src={job.logo || "/placeholder.svg"} alt={job.company} className="h-12 w-12 rounded" />
          <div>
            <h3 className="font-semibold text-lg">{job.title}</h3>
            <p className="text-gray-600">{job.company}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => toggleBookmark(job.id)}
            className={`p-2 rounded-full hover:bg-gray-100 ${job.isBookMarked ? "text-blue-600" : "text-gray-400"}`}
          >
            <BookmarkIcon className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 text-gray-400">
            <ShareIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex space-x-4 text-sm text-gray-600">
          <span className="px-3 py-1 bg-gray-100 rounded-full">Remote</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full">{job.type}</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full">{job.salary}</span>
        </div>
        <p className="mt-4 text-gray-600">{job.description}</p>
      </div>
    </div>
  )
}

