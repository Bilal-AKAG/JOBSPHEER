
import { useParams } from "react-router";
import { BookmarkIcon, ShareIcon } from "../icons";
import { useQuery } from "@tanstack/react-query";
const fetchJobById = async (id: string) => {
  const response = await fetch(
    `https://joblisting-rd8f.onrender.com/api/jobs/${id}`
  );
  if (!response.ok) throw new Error("Job not found");
  return response.json();
};
const JobDetails = () => {

 const { id } = useParams();

 const {

   data: job,
   isLoading,
 } = useQuery({
   queryKey: ["jobDetails", id],
   queryFn: () => fetchJobById(id!),
   enabled: !!id, // Prevents fetching when id is undefined
 });


  if (isLoading) return <p className="text-center p-2">Loading job details...</p>;
  if (!job) return <p className="text-center p-2">No job found.</p>;
  return (
    <div className=" flex justify-center items-center py-10">
      <div className="flex flex-col items-center justify-center p-2">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div>
            <div className="flex justify-between gap-4">
              <div className="flex gap-4 items-center p-2">
                <img
                  src={job.logo || "/placeholder.svg"}
                  alt={job.company}
                  className="h-12 w-12 rounded"
                />
                <div>
                  <h3 className="font-semibold text-4xl">{job.title}</h3>
                  <p className="text-gray-600">{job.company}</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 p-2">
                <div className="-mt-1.5 gap-1">
                  <button
                    className={`p-2 rounded-full hover:bg-gray-100 ${
                      job.isBookMarked ? "text-blue-600" : "text-gray-400"
                    }`}
                  >
                    <BookmarkIcon className="h-5 w-5 cursor-pointer" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100 text-gray-400">
                    <ShareIcon className="h-5 w-5 cursor-pointer" />
                  </button>
                </div>
                <div>
                  <button className="bg-[#0034d1] cursor-pointer text-white font-semibold px-3 py-1 rounded-[4px]">
                    Apply now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className=" grid grid-cols-2 gap-2">
            <div className="flex flex-col p-2">
              <div className="font-bold">
                Job type:
                <div className="font-normal">{job.type}</div>
              </div>

              <div className="font-bold">
                Location:
                <div className="font-normal">{job.location}</div>
              </div>
              <div className="font-bold">
                Experience:
                <div className="font-normal">{job.experienceLevel}</div>
              </div>
            </div>
            <div className="p-2">
              <h1 className="font-bold">Job description</h1>
              <p className="text-justify">{job.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
