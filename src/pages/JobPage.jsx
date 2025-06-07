import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import Navbar from '../components/comman/Navbar';
import FilterBar from '../components/job/FilterBar';
import JobList from '../components/job/jobList';
import Job from '../components/job/jobPage';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '../store/searchSlice';
import { useLocation } from 'react-router-dom';

const JobPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const reduxSearchQuery = useSelector((state) => state.search.query);

  const [jobs, setJobs] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filters, setFilters] = useState({
    tag: '',
    location: '',
    workType: '',
    salary: '',
    postDate: '',
  });

  // Read query param from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      dispatch(setSearchQuery(searchParam));
    }
  }, [location.search, dispatch]);

  useEffect(() => {
    setSearchInput(reduxSearchQuery);
  }, [reduxSearchQuery]);

  const debouncedSetSearchQuery = useCallback(
    debounce((value) => {
      dispatch(setSearchQuery(value));
    }, 300),
    [dispatch]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSetSearchQuery(value);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (reduxSearchQuery) queryParams.append('jobName', reduxSearchQuery);
        if (filters.tag) queryParams.append('category', filters.tag);
        const response = await axios.get(`http://localhost:5000/api/job/?${queryParams.toString()}`);
        let filteredJobs = response.data.jobs || [];

        if (filters.postDate) {
          const now = new Date();
          filteredJobs = filteredJobs.filter((job) => {
            const createdAt = new Date(job.createdAt);
            const diffInHours = (now - createdAt) / (1000 * 60 * 60);
            if (filters.postDate === '24 Hours') return diffInHours <= 24;
            if (filters.postDate === 'Past Week') return diffInHours <= 24 * 7;
            if (filters.postDate === 'Past Month') return diffInHours <= 24 * 30;
            return true;
          });
        }

        if (filters.salary === 'Low to High') {
          filteredJobs.sort((a, b) => Number(a.salary) - Number(b.salary));
        } else if (filters.salary === 'High to Low') {
          filteredJobs.sort((a, b) => Number(b.salary) - Number(a.salary));
        }

        setJobs(filteredJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [reduxSearchQuery, filters]);

  const locations = [...new Set(jobs.map(job => job.location))];
  const workTypes = [...new Set(jobs.map(job => job.workType))];
  const tags = [
    ...new Set(
      jobs.flatMap(job => {
        try {
          const parsed = JSON.parse(job.tags[0]);
          return Array.isArray(parsed) ? parsed : [];
        } catch {
          return [];
        }
      })
    )
  ];

  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <div className="pt-20">
        <FilterBar
          searchQuery={searchInput}
          onSearchChange={handleSearchChange}
          setFilters={setFilters}
          locations={locations}
          workTypes={workTypes}
          tags={tags}
        />
        <div className="flex h-screen overflow-hidden">
          <div className="w-1/3 border-r overflow-y-auto">
            <JobList jobs={jobs} />
          </div>
          <div className="w-2/3 overflow-y-auto">
            <Job />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPage;
