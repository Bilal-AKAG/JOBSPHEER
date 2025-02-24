import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./Layout";
import MainJobs from "./Routes/MainJobs";
import Login from "./Routes/Login";
import Signin from "./Routes/Signin";
import JobDetails from "./Routes/JobDetails";
import { Createjob } from "./components/Createjob";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainJobs />} />
          <Route path="/jobs/:id" element={<JobDetails/>}/>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/newjob" element={<Createjob/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
