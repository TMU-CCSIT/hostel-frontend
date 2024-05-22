"use client";

import React, { useState } from 'react';
import InputField from '@/components/common/InputField';
import CTCButton from '../common/CTCButton';
import { principalDD } from '@/constants/buttonConst';
import axios from 'axios';

import { useRecoilValue } from 'recoil';
import { userAtom } from '@/app/store/atoms/user';

import * as XLSX from 'xlsx';
import { formatDate } from '@/helper/formatDate';
import StudentInfo from '../student/StudentInfo';
import Application from '../student/Application';

import Loading from '@/app/loading';

import LeaveApprovalCard from '../faculty/LeaveApprovalCard';

interface searchData {

    name: string | null;
    sortByDate: Date | null;
    dateFrom: Date | null;
    dateTo: Date | null;
    status: string | null;

}

const StudentLeaves = () => {

    const user: any = useRecoilValue(userAtom);

    console.log("user data ", user);

    const [click, setClick] = useState(false);
    const [studentData, setStudentData] = useState<any[]>([]);
    const [individualUserData, setIndividualUserData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState<searchData>({
        name: "",
        sortByDate: new Date(),
        dateTo: new Date(),
        dateFrom: new Date(),
        status: principalDD[0],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: name === 'dateFrom' || name === 'dateTo' ? new Date(value) : value
        }));
    };

    async function downloadExcel() {

        const worksheetData = studentData?.map((item: any) => ({

            Name: item?.user?.fullName,
            Email: item.user.email,
            ContactNo: item.user.contactNo,
            Address: item.user.address,
            Branch: item.user.refId.branch,
            EnrollmentNo: item.user.refId.enrollmentNo,
            FingerNo: item.user.refId.fingerNo,
            Hostel: item.user.refId.hostel,
            RoomNo: item.user.refId.roomNo,
            AddressDuringLeave: item.addressDuringLeave,
            DateFrom: formatDate(item.dateFrom),
            DateTo: formatDate(item.dateTo),
            ReasonForLeave: item.reasonForLeave,
        }));

        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "DataSheet.xlsx");

    }



    async function handleClick() {

        try {

            setLoading(true);

            const response = await axios.get(`/api/Principal?action=getStudentOnLeave&dateFrom=${data.dateFrom?.toISOString()}&dateTo=${data.dateTo?.toISOString()}&status=${data.status}&text=${data.name}`);
            console.log("res k data", response.data);
            setStudentData(response.data.data);

            setLoading(false);

        } catch (error) {

            console.error("Error fetching student data:", error);

        }
    }

    return (

        <div className="relative w-full flex flex-col gap-8">

            <div className={`flex w-full gap-11`}>

                <div className='flex justify-center items-baseline gap-2'>

                    <div>

                        <input
                            className='shadow border rounded py-3 px-3 text-gray-700 focus:outline-none focus:shadow-outline w-[10rem] sm:w-[15rem] lg:w-[20rem]'
                            type='text'
                            placeholder='Search By Student'
                            name='name'
                            required={false}
                            onChange={handleChange}
                        />
                    </div>
                    <div onClick={handleClick}>

                        <CTCButton text='Search' />

                    </div>

                </div>

                <div className='lg:flex-row flex flex-col gap-12 p-4 sm:gap-20'>
                    <div className='flex gap-2 flex-col'>
                        <label className='font-semibold'> From</label>
                        <input
                            key='dateFrom'
                            type='date'
                            placeholder='Date From'
                            required={false}
                            name='dateFrom'
                            onChange={handleChange}
                            className='focus:outline-none'
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold'>To</label>
                        <input
                            key='dateTo'
                            type='date'
                            placeholder='Date From'
                            required={false}
                            name='dateTo'
                            onChange={handleChange}
                            className='focus:outline-none'
                        />
                    </div>
                </div>

                <div className='flex flex-col'>
                    <label className='font-semibold ml-3'>Sort</label>
                    <select
                        required={false}
                        onChange={handleChange}
                        name='status'
                        className='shadow-xl p-3 focus:outline-none'
                    >
                        {principalDD.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div>


            </div>


            <div className='flex flex-col gap-3'>

                {studentData && studentData.map((item: any) => (
                    <div
                        key={item._id}
                        onClick={() => {
                            console.log("user data  ", item);
                            setClick(true);
                            setIndividualUserData(item);
                        }}
                    >
                        {/* <Application key={item._id} userInfo={item} isStudent={false} /> */}

                        <LeaveApprovalCard
                            key={item._id}
                            userInfo={item}
                        />

                    </div>
                ))}
            </div>

            {/* <div className='flex justify-end'>
                <CTCButton text='Download Excel' onClick={downloadExcel} />
            </div> */}

            <div className=' relative w-full  flex '>

                {loading && <Loading></Loading>}

                {click && individualUserData && (

                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">

                        <StudentInfo

                            dateFrom={individualUserData?.dateFrom}
                            dateTo={individualUserData?.dateTo}
                            email={individualUserData?.user?.email}
                            contactNo={individualUserData?.user?.contactNo}
                            reasonForLeave={individualUserData?.reasonForLeave}
                            addressDuringLeave={individualUserData?.addressDuringLeave}
                            name={individualUserData?.user?.fullName}
                            userImage={individualUserData?.user?.profileImage}
                            enrollmentNo={individualUserData?.user?.refId?.enrollmentNo}
                            Branch={individualUserData?.user?.refId?.branch}
                            College={individualUserData?.user?.refId?.college}
                            Hostel={individualUserData?.user?.refId?.hostel}
                            ParentNo={individualUserData?.user?.refId?.parentContactNo}
                            parentName={individualUserData?.user?.refId?.parentName}
                            setClick={setClick}
                        />

                    </div>
                )}

            </div>

        </div>
    );
};

export default StudentLeaves;
