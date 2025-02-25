import { useFormik } from "formik";
import * as Yup from "yup";

const jobTypes = ["Full-time", "Hybrid", "Internship", "Contract", "Volunteer"];
const experienceLevels = ["Entry Level", "Mid Level", "Senior Level"];
const currencies = ["USD", "EUR", "GBP", "CAD", "AUD"]; // Add other currencies as needed

const validationSchema = Yup.object({
  title: Yup.string().required("Job title is required").min(3).max(100),
  company: Yup.string().required("Company name is required").min(2).max(50),
  location: Yup.string().required("Location is required").min(2).max(50),
  type: Yup.string().required("Job type is required").oneOf(jobTypes),
  salary: Yup.number().required("Salary is required").min(0).max(1000000),
  description: Yup.string()
    .required("Job description is required")
    .min(10)
    .max(5000),
  experienceLevel: Yup.string()
    .required("Experience level is required")
    .oneOf(experienceLevels),
  logo: Yup.string().url("Please enter a valid URL").nullable(),
  currency: Yup.string().required("Currency is required").oneOf(currencies), // Added currency validation
  isBookMarked: Yup.boolean().required("Bookmark status is required"), // Added isBookMarked validation
});

export function Createjob() {
  const formik = useFormik({
    initialValues: {
      title: "",
      company: "",
      location: "",
      type: "Full-time",
      salary: 0,
      description: "",
      experienceLevel: "Entry Level",
      logo: "",
      currency: "USD", // Default currency
      isBookMarked: false, // Default bookmark status
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setStatus }) => {
      try {
        console.log("Submitting job:", values);

        const response = await fetch(
          "https://joblisting-3hjv.onrender.com/api/jobs",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("API Error:", errorData);
          throw new Error(errorData.message || "Failed to create job");
        }

        const data = await response.json();
        console.log("Job created:", data);
        setStatus({ success: true });
        resetForm();
      } catch (err) {
        console.error("Error creating job:", err);
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
          <div className="mb-4 p-4 bg-red-50 text-red-600">
            {formik.status.error}
          </div>
        )}
        {formik.status?.success && (
          <div className="mb-4 p-4 bg-green-50 text-green-600">
            Job created successfully!
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Job Title *
              </label>
              <input
                type="text"
                id="title"
                {...formik.getFieldProps("title")}
                className={`w-full px-3 py-2 border rounded-md ${
                  formik.touched.title && formik.errors.title
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.title && formik.errors.title && (
                <div className="text-sm text-red-600">
                  {formik.errors.title}
                </div>
              )}
            </div>

            {/* Company */}
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700"
              >
                Company Name *
              </label>
              <input
                type="text"
                id="company"
                {...formik.getFieldProps("company")}
                className={`w-full px-3 py-2 border rounded-md ${
                  formik.touched.company && formik.errors.company
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.company && formik.errors.company && (
                <div className="text-sm text-red-600">
                  {formik.errors.company}
                </div>
              )}
            </div>

            {/* Job Type */}
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Job Type *
              </label>
              <select
                id="type"
                {...formik.getFieldProps("type")}
                className={`w-full px-3 py-2 border rounded-md ${
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
            </div>

            {/* Experience Level */}
            <div>
              <label
                htmlFor="experienceLevel"
                className="block text-sm font-medium text-gray-700"
              >
                Experience Level *
              </label>
              <select
                id="experienceLevel"
                {...formik.getFieldProps("experienceLevel")}
                className={`w-full px-3 py-2 border rounded-md ${
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
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location *
              </label>
              <input
                type="text"
                id="location"
                {...formik.getFieldProps("location")}
                className={`w-full px-3 py-2 border rounded-md ${
                  formik.touched.location && formik.errors.location
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
            </div>

            {/* Salary */}
            <div>
              <label
                htmlFor="salary"
                className="block text-sm font-medium text-gray-700"
              >
                Salary *
              </label>
              <input
                type="number"
                id="salary"
                {...formik.getFieldProps("salary")}
                className={`w-full px-3 py-2 border rounded-md ${
                  formik.touched.salary && formik.errors.salary
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
            </div>

            {/* Currency */}
            <div>
              <label
                htmlFor="currency"
                className="block text-sm font-medium text-gray-700"
              >
                Currency *
              </label>
              <select
                id="currency"
                {...formik.getFieldProps("currency")}
                className={`w-full px-3 py-2 border rounded-md ${
                  formik.touched.currency && formik.errors.currency
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>

            {/* isBookMarked */}
            <div>
              <label
                htmlFor="isBookMarked"
                className="block text-sm font-medium text-gray-700"
              >
                Is Bookmarked
              </label>
              <select
                id="isBookMarked"
                {...formik.getFieldProps("isBookMarked")}
                className={`w-full px-3 py-2 border rounded-md ${
                  formik.touched.isBookMarked && formik.errors.isBookMarked
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Job Description *
            </label>
            <textarea
              id="description"
              {...formik.getFieldProps("description")}
              rows={4}
              className={`w-full px-3 py-2 border rounded-md ${
                formik.touched.description && formik.errors.description
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
          </div>

          {/* Logo URL */}
          <div>
            <label
              htmlFor="logo"
              className="block text-sm font-medium text-gray-700"
            >
              Logo URL
            </label>
            <input
              type="url"
              id="logo"
              {...formik.getFieldProps("logo")}
              className={`w-full px-3 py-2 border rounded-md ${
                formik.touched.logo && formik.errors.logo
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.logo && formik.errors.logo && (
              <div className="text-sm text-red-600">{formik.errors.logo}</div>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => formik.resetForm()}
              className="px-4 py-2 border rounded-md"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              {formik.isSubmitting ? "Creating..." : "Create Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
