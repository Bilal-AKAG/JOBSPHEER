import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./Layout";
import MainJobs from "./Routes/MainJobs";
import Login from "./Routes/Login";
import Signin from "./Routes/Signin";
import JobDetails from "./Routes/JobDetails";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
        
          <Route path="/" element={<MainJobs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/jobs/:id" element={<JobDetails/>}/>;
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
