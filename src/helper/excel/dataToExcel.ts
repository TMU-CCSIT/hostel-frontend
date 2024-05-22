

import * as XLSX from 'xlsx';

import { formatDate } from "../formatDate";

// export async function downloadExcel() {

//     const worksheetData = studentData?.map((item:any) => ({

//       Name: item.user.fullName,
//       Email: item.user.email,
//       ContactNo: item.user.contactNo,
//       Address: item.user.address,
//       Branch: item.user.refId.branch,
//       EnrollmentNo: item.user.refId.enrollmentNo,
//       FingerNo: item.user.refId.fingerNo,
//       Hostel: item.user.refId.hostel,
//       RoomNo: item.user.refId.roomNo,
//       AddressDuringLeave: item.addressDuringLeave,
//       DateFrom: formatDate(item.dateFrom), // Original Date object
//       DateTo: formatDate(item.dateTo), // Original Date object
//       ReasonForLeave: item.reasonForLeave,

//     }));

//     const worksheet = XLSX.utils.json_to_sheet(worksheetData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
//     XLSX.writeFile(workbook, "DataSheet.xlsx");

//   }




