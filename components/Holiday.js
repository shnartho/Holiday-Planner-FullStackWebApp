import * as React from 'react';
import moment  from 'moment';
import { TrashIcon } from '@heroicons/react/24/solid';
import { BOOKING_URL } from '../commons/constants';
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';

export default function Holiday(){
    const user = useSelector((state)=> state?.authentication?.user);
    const [startDate, setStartDate] = React.useState(moment());
    const [endDate, setEndDate] = React.useState(moment());
  
    const [bookings, setBookings] = React.useState([]);

    const [ deleteSaveSuccess, setDeleteSaveSuccess ] = React.useState(false);
  
    const handleStartDateChange = (date) => {
      setStartDate(date);
    };

    const handleEndDateChange = (date) => {
      setEndDate(date);
    };

    React.useEffect(()=>{
        getAllBooking();
    },[deleteSaveSuccess]);

    const getAllBooking = async ()=>{
        const res = await fetch(`${BOOKING_URL}?wp=true`,
            {
              method: 'get',
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            }
        );
        const data = await res.json();
        if (res.status === 200) {
            setBookings(data)
        }
    }


    const saveBooking = async ()=>{
        let body = {
            user: user.id, 
            start_date: moment(startDate).format('YYYY-MM-DD'), 
            end_date: moment(endDate).format('YYYY-MM-DD')
        }
        const res = await fetch(BOOKING_URL,
            {
              method: 'post',
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(body),
            }
        );
        const data = await res.json()
        console.log(`booking save res: `, res);
        if (res.status === 201) {
            setDeleteSaveSuccess(!deleteSaveSuccess);
            toast.success("Booking saved successfully!")
        }
        else {
            toast.warn(data?.message)
        }
    }


    const deleteBooking = async (id)=>{
        const res = await fetch(`${BOOKING_URL}${id}`,
            {
              method: 'delete',
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            }
        );
        console.log(`booking delete res: `, res);
        if (res.status === 200) {
            setDeleteSaveSuccess(!deleteSaveSuccess);
            toast.success("Booking deleted!")
        }
        else {
            toast.warn("Booking deletion failed!")
        }
    }


    function getDaysCount(startDate, endDate) {
        // Convert start and end dates to Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);
      
        // Calculate the difference in time between the two dates
        const diffTime = end.getTime() - start.getTime();
      
        // Calculate the number of days between the two dates
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
        // Return the number of days
        return diffDays + 1;
      }

    return (
        <div>
            <div className="my-5 mb-10">
                <div className='flex flex-col sm:flex-row justify-center'>
                    <div className='p-3'>
                        <button className="bg-blue-200 rounded-md shadow-md flex items-center justify-between p-3">
                            <span className="text-gray-700 font-bold mr-4">Start Date</span>
                        <input
                        type="date"
                        id="start-date"
                        value={startDate.format('YYYY-MM-DD')}
                        onChange={(e) => handleStartDateChange(moment(e.target.value))}
                        className="border-2 rounded-md py-1 px-2"
                        />
                        </button>
                    </div>
                    <div className='p-3'>
                        <button className="bg-blue-200 rounded-md shadow-md flex items-center justify-between p-3">
                            <span className="text-gray-700 font-bold mr-4">End Date</span>
                        <input
                        type="date"
                        id="end-date"
                        value={endDate.format('YYYY-MM-DD')}
                        onChange={(e) => handleEndDateChange(moment(e.target.value))}
                        className="border-2 rounded-md py-1 px-2"
                        />
                        </button>
                    </div>
                    <div className='p-3'>
                        <button onClick={saveBooking} className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Select Holiday Dates
                        </button>
                    </div>
                </div>
            </div>
            <div className="shadow-md rounded my-6">

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Start Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    End Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total(days)
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                           {
                                bookings.map((booking) => (
                                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {booking?.user?.name}
                                        </th>
                                        <th scope="row" className="px-2">
                                            {booking?.user?.email}
                                        </th>
                                        <td className="px-6 py-4">
                                            {moment(booking?.start_date).format('LL')}
                                        </td>
                                        <td className="px-6 py-4">
                                            {moment(booking?.end_date).format('LL')}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getDaysCount(moment(booking?.start_date), moment(booking?.end_date))}
                                        </td>
                                        {
                                            booking?.user?.id === user?.id ? 
                                            <td className="px-6 py-4">
                                                <button onClick={()=> deleteBooking(booking.id)} className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-500 hover:bg-red-600">
                                                    <TrashIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                                    Delete
                                                </button>
                                            </td>
                                            
                                            : 
                                            <td className="px-6 py-4">
                                                <button disabled className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-300">
                                                    <TrashIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                                    Delete
                                                </button>
                                            </td>
                                        }
                                    </tr>
                                ))
                           }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}