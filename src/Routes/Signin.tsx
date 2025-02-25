import { Formik, Form, Field, ErrorMessage } from "formik";
import { signupSchema, type SignupFormValues } from "../Validation-schemas";
import signin from "../assets/signin.svg"
import { Link } from "react-router";
export default function Signin() {
  const initialValues: SignupFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values: SignupFormValues) => {
    // Handle form submission
    console.log("Form submitted:", values);
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-gray-50">
      <div className="flex w-full max-w-6xl mx-4">
        {/* Left side - Form */}
        <div className="w-full lg:w-1/2 p-8">
          <div className="max-w-md mx-auto">
            {/* Logo */}
            <div className="mb-8">
              <div className="bg-[#0034D1] text-white px-4 py-2 rounded-lg inline-block">
                <span className="font-bold">JOBSPHERE</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-8">Create your account</h1>

            <Formik
              initialValues={initialValues}
              validationSchema={signupSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="space-y-4">
                  <div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </span>
                      <Field
                        type="text"
                        name="firstName"
                        className={`w-full pl-12 pr-4 py-3 border rounded-lg outline-none transition-colors
                          ${
                            errors.firstName && touched.firstName
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-300 focus:border-[#0034D1]"
                          }`}
                        placeholder="First name"
                      />
                    </div>
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </span>
                      <Field
                        type="text"
                        name="lastName"
                        className={`w-full pl-12 pr-4 py-3 border rounded-lg outline-none transition-colors
                          ${
                            errors.lastName && touched.lastName
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-300 focus:border-[#0034D1]"
                          }`}
                        placeholder="Last name"
                      />
                    </div>
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </span>
                      <Field
                        type="email"
                        name="email"
                        className={`w-full pl-12 pr-4 py-3 border rounded-lg outline-none transition-colors
                          ${
                            errors.email && touched.email
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-300 focus:border-[#0034D1]"
                          }`}
                        placeholder="Email"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </span>
                      <Field
                        type="password"
                        name="password"
                        className={`w-full pl-12 pr-4 py-3 border rounded-lg outline-none transition-colors
                          ${
                            errors.password && touched.password
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-300 focus:border-[#0034D1]"
                          }`}
                        placeholder="Password"
                      />
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </span>
                      <Field
                        type="password"
                        name="confirmPassword"
                        className={`w-full pl-12 pr-4 py-3 border rounded-lg outline-none transition-colors
                          ${
                            errors.confirmPassword && touched.confirmPassword
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-300 focus:border-[#0034D1]"
                          }`}
                        placeholder="Confirm Password"
                      />
                    </div>
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0034D1] text-white py-3 rounded-lg hover:bg-[#0034D1]/90 transition-colors"
                  >
                    Create account
                  </button>
                </Form>
              )}
            </Formik>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-4 gap-4">
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5 h-5 mx-auto"
                />
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <img
                  src="https://www.apple.com/favicon.ico"
                  alt="Apple"
                  className="w-5 h-5 mx-auto"
                />
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <img
                  src="https://www.facebook.com/favicon.ico"
                  alt="Facebook"
                  className="w-5 h-5 mx-auto"
                />
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <img
                  src="https://www.linkedin.com/favicon.ico"
                  alt="LinkedIn"
                  className="w-5 h-5 mx-auto"
                />
              </button>
            </div>

            {/* Login link */}
            <p className="mt-8 text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/Login">
                {" "}
                <a href="#" className="text-[#0034D1] hover:underline">
                  Login
                </a>
              </Link>
            </p>
          </div>
        </div>

        {/* Right side - Illustration */}
        <div className="hidden lg:flex lg:w-1/2 bg-gray-100 items-center justify-center p-12">
          <img
            src={signin}
            alt="Team collaboration illustration"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
