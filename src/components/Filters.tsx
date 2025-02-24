interface FiltersProps {
  selectedTypes: string[];
  toggleJobType: (type: string) => void;
  salaryRange: [number, number];
  handleSalaryRangeChange: (value: number) => void;
  resetFilters: () => void;
}

// Update job types to match API's expected values
const jobTypes = ["Full-time", "Hybrid", "Internship", "Contract", "Volunteer"];

const jobTypeDisplayNames: Record<string, string> = {
  "Full-time": "Full Time",
  Hybrid: "Hybrid",
  Internship: "Internship",
  Contract: "Contract",
  Volunteer: "Volunteer",
};

export function Filters({
  selectedTypes,
  toggleJobType,
  salaryRange,
  handleSalaryRangeChange,
  resetFilters,
}: FiltersProps) {
  return (
    <div className="col-span-3">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Filter</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Job Type</h3>
            <div className="space-y-2">
              {jobTypes.map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="radio"
                    name="jobType"
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleJobType(type)}
                    className="rounded-full border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">
                    {jobTypeDisplayNames[type] || type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Salary Range</h3>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="200000"
                step="1000"
                value={salaryRange[1]}
                onChange={(e) =>
                  handleSalaryRangeChange(Number(e.target.value))
                }
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${salaryRange[0].toLocaleString()}</span>
                <span>${salaryRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          <button
            onClick={resetFilters}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Reset all filters
          </button>
        </div>
      </div>
    </div>
  );
}
