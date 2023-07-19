import React, { useState } from 'react';
import moment from 'moment';

function DateRangePicker() {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <div className='flex flex-col sm:flex-row justify-center'>
      <div className='p-3'>
        <label htmlFor="start-date">Start date: </label>
        <input
          type="date"
          id="start-date"
          value={startDate.format('YYYY-MM-DD')}
          onChange={(e) => handleStartDateChange(moment(e.target.value))}
          />
      </div>
      <div className='p-3'>
        <label htmlFor="end-date">End date: </label>
        <input
          type="date"
          id="end-date"
          value={endDate.format('YYYY-MM-DD')}
          onChange={(e) => handleEndDateChange(moment(e.target.value))}
          />
      </div>
      <div className='p-3'>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Save Request
        </button>
      </div>
    </div>
  );
}

export default DateRangePicker;
