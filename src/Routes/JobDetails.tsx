

import { useParams } from "react-router";
import { BookmarkIcon, ShareIcon } from "../icons";
import { useQuery } from "@tanstack/react-query";
import { SavedJobs } from "../components/SavedJobs";
import { useState } from "react";

interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  type: string;
  location: string;
  experienceLevel: string;
  description: string;
  isBookMarked?: boolean;
}

const fetchJobById = async (id: string) => {
  const response = await fetch(
    `https://joblisting-3hjv.onrender.com/api/jobs/${id}`
  );
  if (!response.ok) throw new Error("Job not found");
  return response.json();
};

const JobDetails = () => {
  const { id } = useParams();
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Set<string>>(new Set());

  const { data: job, isLoading } = useQuery({
    queryKey: ["jobDetails", id],
    queryFn: () => fetchJobById(id!),
    enabled: !!id,
  });

  // Fetch all jobs for the saved jobs component
  const { data: allJobs } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const response = await fetch(
        "https://joblisting-3hjv.onrender.com/api/jobs"
      );
      if (!response.ok) throw new Error("Failed to fetch jobs");
      const data = await response.json();
      return data.jobs;
    },
  });

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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="animate-pulse space-y-4">
                <div className="flex gap-4">
                  <div className="h-12 w-12 bg-gray-200 rounded" />
                  <div className="space-y-2 flex-1">
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4" />
                <div className="space-y-4">
                  <div className="h-20 bg-gray-200 rounded" />
                  <div className="h-20 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="text-center text-gray-500">No job found.</div>
      </div>
    );
  }

  const savedJobs = allJobs?.filter((j: Job) => bookmarkedJobs.has(j.id)) || [];

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div>
              <div className="flex justify-between gap-4">
                <div className="flex gap-4 items-center p-2">
                  <img
                    src={job.logo || "/placeholder.svg"}
                    alt={job.company}
                    className="h-12 w-12 rounded object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-2xl md:text-4xl">
                      {job.title}
                    </h3>
                    <p className="text-gray-500">{job.company}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 p-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleBookmark(job.id)}
                      className={`p-2 rounded-full hover:bg-gray-100 ${
                        bookmarkedJobs.has(job.id)
                          ? "text-blue-600"
                          : "text-gray-400"
                      }`}
                    >
                      <BookmarkIcon className="h-5 w-5 cursor-pointer" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 text-gray-400">
                      <ShareIcon className="h-5 w-5 cursor-pointer" />
                    </button>
                  </div>
                  <button className="bg-[#0034d1] text-white px-4 py-2 rounded-md hover:bg-[#0034d1]/90 transition-colors">
                    Apply now
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Job type</h4>
                  <p className="text-gray-600">{job.type}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Location</h4>
                  <p className="text-gray-600">{job.location}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Experience</h4>
                  <p className="text-gray-600">{job.experienceLevel}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Job description</h4>
                <p className="text-gray-600 text-justify">{job.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-1">
          <SavedJobs jobs={savedJobs} toggleBookmark={toggleBookmark} />
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
