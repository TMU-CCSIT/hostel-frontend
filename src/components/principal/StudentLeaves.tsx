import React, {useState} from 'react'
import InputField from '@/components/common/InputField'
import CTCButton from '../common/CTCButton'
import {principalDD} from '@/constants/buttonConst'
import axios from 'axios';

import { useRecoilValue } from'recoil';

import { userAtom } from '@/app/store/atoms/user';

// interface
interface searchData {
    sortByName: string;
    sortByDate: Date;
    sort: string;
    dateFrom: Date | null;
    dateTo: Date | null;
    name: string| "";
}

const StudentLeaves = () => {

    const user: any = useRecoilValue(userAtom);

    console.log("user data ",user);

    const [data, setData] = useState<searchData>({
        sortByName:"",
        sortByDate:new Date(),
        sort: principalDD[0],
        dateTo:new Date(),
        dateFrom:new Date(),
        name:""

    })

    const handleChange = (e: any) => {

        setData({...data, [e.target.name]: [e.target.value]})

    }


    async function handleClick(){

        console.log(data);

        const response = await axios.get(`/api/Principal?action=getStudentOnLeave&dateFrom=${data.dateFrom[0] as Date}&dateTo=${data.dateTo[0]}&status=Accepted`)

        console.log("res k data",response.data);

        // const response = await axios.get(`/api/Principal?action=fetchCoordinatorDetails&programe=Bachelor of Tecnology&branch=Artificial Intelligence`)

        // fetchStudentDetails

        // const response = await axios.get(`/api/Principal?action=fetchStudentDetails&programe=Bachelor of Tecnology&branch=Artificial Intelligence`)

        // const response = await axios.get(`/api/Principal?action=searchStudentByText&text=${data.name[0]}`);

    }


  return (

    // main div

    <div className='flex flex-col md:flex-row gap-11 '>

        {/* div for search */}

        <div className='flex justify-center items-baseline gap-2'>
            <div>
                <input
                className='shadow border rounded py-3 px-3 text-gray-700 focus:outline-none focus:shadow-outline w-[10rem] sm:w-[15rem] lg:w-[20rem]'
                type='text'
                placeholder='Search By Student'
                name={'name'}
                required={false}
                onChange={handleChange}
                ></input>
            </div>
            
            <div onClick={handleClick}>

                <CTCButton text={'Search'}></CTCButton>

            </div>
        </div>


        {/* div for calendar */}
        <div className='lg:flex-row flex flex-col gap-12 p-4 sm:gap-20'>

            <div className='flex gap-2 flex-col '>
            <label className='font-semibold'> From</label>
            <input
                key="dareFrom"
                type="date"
                placeholder="Date From"
                required={false}
                name="dateFrom"
                onChange={handleChange}
                className='focus:outline-none'
            ></input>
            </div>

            <div className='flex flex-col gap-2 '>
            <label className='font-semibold'>To</label>
            <input
                key="dateTo"
                type="date"
                placeholder="Date From"
                required={false}
                name="dateTo"
                onChange={handleChange}
                className='focus:outline-none'
            ></input>
            </div>
        </div>

        {/* drop down div */}
        <div className='flex flex-col'>
            <label className='font-semibold ml-3'>Sort</label>
            <select required={false} onChange={handleChange} className='shadow-xl p-3 focus:outline-none'>
                {
                    principalDD.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))
                }
            </select>
        </div>

    </div>
  )
}

export default StudentLeaves




