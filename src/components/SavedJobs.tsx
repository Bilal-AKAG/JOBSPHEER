import type { Job } from "../types"
import { BookmarkIcon } from "../icons"

interface SavedJobsProps {
  jobs: Job[]
  toggleBookmark: (jobId: string) => void
}

export function SavedJobs({ jobs, toggleBookmark }: SavedJobsProps) {
  const savedJobs = jobs.filter((job) => job.isBookMarked)

  return (
    <div className="col-span-3">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Saved Jobs</h2>
        <div className="space-y-4">
          {savedJobs.map((job) => (
            <div key={job.id} className="border rounded-lg p-4">
              <h3 className="font-medium">{job.title}</h3>
              <p className="text-sm text-gray-600">{job.company}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-600">{job.salary}</span>
                <button onClick={() => toggleBookmark(job.id)} className="text-blue-600">
                  <BookmarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

