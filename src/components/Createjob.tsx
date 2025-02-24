import { useFormik } from "formik";
import * as Yup from "yup";

interface CreateJobFormData {
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  experienceLevel: string;
  logo?: string;
}

const jobTypes = ["Full-time", "Hybrid", "Internship", "Contract", "Volunteer"];
const experienceLevels = ["Entry Level", "Mid Level", "Senior Level"];

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Job title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  company: Yup.string()
    .required("Company name is required")
    .min(2, "Company name must be at least 2 characters")
    .max(50, "Company name must be less than 50 characters"),
  location: Yup.string()
    .required("Location is required")
    .min(2, "Location must be at least 2 characters")
    .max(50, "Location must be less than 50 characters"),
  type: Yup.string()
    .required("Job type is required")
    .oneOf(jobTypes, "Please select a valid job type"),
  salary: Yup.number()
    .required("Salary is required")
    .min(0, "Salary must be greater than or equal to 0")
    .max(1000000, "Salary must be less than 1,000,000"),
  description: Yup.string()
    .required("Job description is required")
    .min(50, "Description must be at least 50 characters")
    .max(5000, "Description must be less than 5000 characters"),
  experienceLevel: Yup.string()
    .required("Experience level is required")
    .oneOf(experienceLevels, "Please select a valid experience level"),
  logo: Yup.string().url("Please enter a valid URL").nullable(),
});

export function Createjob() {
  const formik = useFormik<CreateJobFormData>({
    initialValues: {
      title: "",
      company: "",
      location: "",
      type: "Full-time",
      salary: "",
      description: "",
      experienceLevel: "Entry Level",
      logo: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setStatus }) => {
      try {
        const response = await fetch(
          "https://joblisting-3hjv.onrender.com/api/jobs",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...values,
              salary: values.salary.toString(),
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to create job");
        }

        const data = await response.json();
        console.log("Job created:", data);
        setStatus({ success: true });
        resetForm();
      } catch (err) {
        setStatus({
          error: err instanceof Error ? err.message : "Failed to create job",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-6">Create New Job</h2>

        {formik.status?.error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
            {formik.status.error}
          </div>
        )}

        {formik.status?.success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-600 rounded-md">
            Job created successfully!
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Job Title *
              </label>
              <input
                type="text"
                id="title"
                {...formik.getFieldProps("title")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formik.touched.title && formik.errors.title
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.title && formik.errors.title && (
                <div className="mt-1 text-sm text-red-600">
                  {formik.errors.title}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Company Name *
              </label>
              <input
                type="text"
                id="company"
                {...formik.getFieldProps("company")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formik.touched.company && formik.errors.company
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.company && formik.errors.company && (
                <div className="mt-1 text-sm text-red-600">
                  {formik.errors.company}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Job Type *
              </label>
              <select
                id="type"
                {...formik.getFieldProps("type")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formik.touched.type && formik.errors.type
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                {jobTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {formik.touched.type && formik.errors.type && (
                <div className="mt-1 text-sm text-red-600">
                  {formik.errors.type}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="experienceLevel"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Experience Level *
              </label>
              <select
                id="experienceLevel"
                {...formik.getFieldProps("experienceLevel")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formik.touched.experienceLevel &&
                  formik.errors.experienceLevel
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                {experienceLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              {formik.touched.experienceLevel &&
                formik.errors.experienceLevel && (
                  <div className="mt-1 text-sm text-red-600">
                    {formik.errors.experienceLevel}
                  </div>
                )}
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Location *
              </label>
              <input
                type="text"
                id="location"
                {...formik.getFieldProps("location")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formik.touched.location && formik.errors.location
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.location && formik.errors.location && (
                <div className="mt-1 text-sm text-red-600">
                  {formik.errors.location}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="salary"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Salary *
              </label>
              <input
                type="number"
                id="salary"
                {...formik.getFieldProps("salary")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formik.touched.salary && formik.errors.salary
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.salary && formik.errors.salary && (
                <div className="mt-1 text-sm text-red-600">
                  {formik.errors.salary}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="logo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Company Logo URL
              </label>
              <input
                type="url"
                id="logo"
                {...formik.getFieldProps("logo")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formik.touched.logo && formik.errors.logo
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="https://example.com/logo.png"
              />
              {formik.touched.logo && formik.errors.logo && (
                <div className="mt-1 text-sm text-red-600">
                  {formik.errors.logo}
                </div>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Job Description *
            </label>
            <textarea
              id="description"
              {...formik.getFieldProps("description")}
              rows={4}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.description && formik.errors.description
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="mt-1 text-sm text-red-600">
                {formik.errors.description}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => formik.resetForm()}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formik.isSubmitting ? "Creating..." : "Create Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
