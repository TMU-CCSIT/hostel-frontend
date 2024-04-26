"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "qrcode";

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

  useEffect(() => {
    if (!qrCodeData) return;

    var canvas = document.getElementById("canvas");
    QRCode.toCanvas(canvas, qrCodeData, function (error) {
      if (error) console.error(error);
      console.log("success!");
    });
  }, [qrCodeData]);

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      {qrCodeData && (
        <div className=" object-cover relative">
          <canvas id="canvas" />
        </div>
      )}
    </div>
  );
};

export default Page;
