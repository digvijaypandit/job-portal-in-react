import React from 'react';
import { BsCalendarEvent } from "react-icons/bs";

const ImportantDates = ({job}) =>{
  function formatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) return 'Invalid date';
  
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }  
  return (
  <div className="p-4 bg-white rounded-lg shadow mb-4">
    <h2 className="text-xl font-semibold border-l-4 border-blue-600 pl-2 mb-2">Important Dates & Deadlines</h2>
    <div className="flex items-center gap-2 px-2">
      <div className='p-3 border rounded-lg border-gray-400'><BsCalendarEvent/></div>
      <p className='text-gray-700'>Application Deadline:<br/> <strong className='text-gray-800'>{formatDate(job.updatedAt)}</strong></p>
    </div>
  </div>
);}

export default ImportantDates;
