import {Link} from "react-router"

export function Header() {


  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/">
              <span className="ml-7 text-xl font-bold bg-blue-600 rounded-[7px] p-2 text-white">
                JOBSPHERE
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className=" text-gray-600 hover:text-gray-900 transition-all duration-200 hover:border-b-2 hover:border-b-blue-600 font-medium"
            >
              Job Search
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition-all duration-200 hover:border-b-2 hover:border-b-blue-600 font-medium"
            >
              My Applications
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition-all duration-200 hover:border-b-2 hover:border-b-blue-600 font-medium"
            >
              Companies
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition-all duration-200 hover:border-b-2 hover:border-b-blue-600 font-medium"
            >
              Contact Us
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/Login">
              <button className="bg-[#0044F2] cursor-pointer  text-white px-6 py-2 rounded-md hover:bg-blue-700">
                Login
              </button>
            </Link>
            <Link to="/signin">
              <button className="text-gray-700 cursor-pointer  border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-50">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}