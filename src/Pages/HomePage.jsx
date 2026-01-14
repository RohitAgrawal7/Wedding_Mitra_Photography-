import React from 'react'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
// import Hero from './components/Hero';
// import Homecards from './components/Homecards';
// import JobListning from './components/jobListning';
// import ViewAllJobs from './components/ViewAllJobs';
const HomePage = () => {
  return (
    <>
    {/* <Hero /> */}
     <div>
    <Navbar/>
    <Hero/>
    {/* <Homecards/>
    <JobListning/>
    <ViewAllJobs/> */}
  </div>
    </>
  );
};

export default HomePage