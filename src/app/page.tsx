"use client"
import React, { useState } from 'react';

const VisaDetailsSection = () => {
  const [visaData, setVisaData] = useState({
    visaNumber: '266288804',
    dateOfIssue: '2024-10-27',
    dateOfExpiry: '2025-01-26',
    fullName: 'ROSHAN - SHRESTHA',
    moiReference: '368415244',
    occupation: 'DRIVER',
    passportNo: 'PA1788841',
    dateOfBirth: '1996-02-27',
    passportExpiry: '2033-06-12'
  });

  return (
    <div className="max-w-4xl mx-auto bg-white font-sans">

      <div className="p-8">

        {/* Visa Details Section */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <div className="text-[#1a237e] text-lg font-bold">Visa Details</div>
            <div className="text-[#1a237e] text-lg text-right font-bold">بيانات التأشيرة</div>
          </div>
          <div className="border border-gray-200 rounded-lg shadow-sm">
            <DetailRow
              label="Visa Number"
              value={visaData.visaNumber}
              arabicLabel="رقم التأشيرة"
              light={false}
            />
            <DetailRow
              label="Visa Type"
              value="Private Sector Work Visa"
              arabicValue="سمة دخول عمل اهلى"
              arabicLabel="نوع التأشيرة"
              light={true}
            />
            {/* ... rest of the visa details rows ... */}
          </div>
        </div>

        {/* Visa Holder Details */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <div className="text-[#1a237e] text-lg font-bold">Visa Holder Details</div>
            <div className="text-[#1a237e] text-lg text-right font-bold">بيانات صاحب التأشيرة</div>
          </div>
          <div className="border border-gray-200 rounded-lg shadow-sm">
            {/* ... visa holder detail rows ... */}
          </div>
        </div>

        {/* Employer Details */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <div className="text-[#1a237e] text-lg font-bold">Employer/Family</div>
            <div className="text-[#1a237e] text-lg text-right font-bold">بيانات صاحب العمل/العائل</div>
          </div>
          <div className="border border-gray-200 rounded-lg shadow-sm">
            {/* ... employer detail rows ... */}
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value, arabicLabel, arabicValue, light }) => (
  <div className={`grid grid-cols-3 ${light ? 'bg-gray-50' : 'bg-white'} border-b last:border-b-0`}>
    <div className="p-3 text-[#1a237e]">{label}</div>
    <div className="p-3 text-center text-[#1a237e]">
      {value}
      {arabicValue && <div className="text-right">{arabicValue}</div>}
    </div>
    <div className="p-3 text-right text-[#1a237e]">{arabicLabel}</div>
  </div>
);

export default VisaDetailsSection;