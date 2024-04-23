
"use client"

import React from "react"

import { useRouter } from "next/navigation"

import FacultyPage from "@/app/(navbar)/faculty/page";

import StudentPage from "@/app/(navbar)/student/page";


export default function Dashboard() {

    const router = useRouter();

    const role = location.pathname.split("/")[2];


    switch (role) {

        case "Student":

            // Render Student dashboard content

            return (

                <div>

                    {/* Your Student dashboard content */}

                    <StudentPage/>

                </div>
            );
        case "Principal":

            // Render Principal dashboard content
            
            return (

                <div>

                    {/* Your Principal dashboard content */}

                    <h1>Principal Dashboard</h1>

                </div>
            );
        case "Coordinator":
            // Render Coordinator dashboard content
            return (
                <div>
                    {/* Your Coordinator dashboard content */}
                    <h1>Coordinator Dashboard</h1>

                    <FacultyPage/>

                </div>
            );
        default:
            // For other roles or unknown roles, render default content or handle accordingly
            return (
                <div>
                    {/* Default content for other roles */}
                    <h1>Default Dashboard</h1>
                </div>
            );
    }

}


