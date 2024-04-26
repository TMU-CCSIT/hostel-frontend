"use client";
import React from "react";

export default function parentMail() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
        <h1 className="text-2xl font-bold mb-4"></h1>
        <p className="text-gray-700 mb-6">Dear Recipient Name</p>
        <p className="text-gray-700 mb-4">
          I hope this email finds you well. I am writing to [provide an
          update/share information/request assistance/etc.] regarding [briefly
          explain the purpose or topic of the email].
        </p>
        <p className="text-gray-700 mb-4">
          [Provide detailed information, explanation, or request in a clear and
          concise manner.]
        </p>
        {/* You can add more content here */}
        <p className="text-gray-700 mb-4">
          Thank you for your attention to this matter. Please feel free to reach
          out if you have any questions or require further clarification.
        </p>
        <p className="text-gray-700">Best regards,</p>
        <p className="text-gray-700">
          [Your Name]
          <br />
          [Your Position/Title]
          <br />
          [Your Contact Information]
        </p>
      </div>
    </div>
  );
}
