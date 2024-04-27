"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";

const Page = () => {
  const [qrCodeData, setQRCodeData] = useState(null);

  const fetchQRCodeData = async () => {
    try {
      const res = await axios.get("/api/student");
      setQRCodeData(res.data?.data?.student?.qrCode?.qrString);
    } catch (error: any) {
      console.log("Error fetching QR code data: " + error.message);
    }
  };

  useEffect(() => {
    fetchQRCodeData();
  }, []);

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      {qrCodeData && (
        <div className=" object-cover relative">
          <QRCodeSVG value={qrCodeData} />,
        </div>
      )}
    </div>
  );
};

export default Page;
