"use client";
import React, { useState } from 'react';

const VisaPage = () => {
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
    <div className="min-h-screen bg-gray-50">
      {/* Top Border Pattern */}
      <div className="h-8 bg-gradient-to-r from-blue-600 via-blue-800 to-blue-600" />

      <div className="max-w-4xl mx-auto bg-white shadow-lg">
        {/* Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#003399] opacity-10 pattern-grid" />
          <div className="relative px-6 py-4 flex justify-between items-center">
            <div className="w-20">
              <img src="/api/placeholder/80/80" alt="Kuwait Emblem" className="w-full" />
            </div>
            <div className="text-center flex-1">
              <h1 className="text-[#003399] text-3xl font-sans mb-2">تأشيرة إلكترونية</h1>
              <h1 className="text-[#003399] text-3xl font-sans">ELECTRONIC VISA</h1>
            </div>
            <div className="w-20">
              <img src="/api/placeholder/80/80" alt="State of Kuwait" className="w-full" />
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="flex justify-between px-8 py-6">
          <div className="w-32">
            <img src="/api/placeholder/128/128" alt="QR Code Left" className="w-full" />
          </div>
          <div className="w-32">
            <img src="/api/placeholder/128/128" alt="QR Code Right" className="w-full" />
          </div>
        </div>

        <div className="px-8 pb-8">
          {/* Visa Details */}
          <SectionContainer
            title="Visa Details"
            arabicTitle="بيانات التأشيرة"
          >
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
            <DetailRow
              label="Date of Issue"
              value={visaData.dateOfIssue}
              arabicLabel="تاريخ الإصدار"
              light={false}
            />
            <DetailRow
              label="Date Of Expiry"
              value={visaData.dateOfExpiry}
              arabicLabel="تاريخ الإنتهاء"
              light={true}
            />
          </SectionContainer>

          {/* Personal Details */}
          <SectionContainer
            title="Visa Holder Details"
            arabicTitle="بيانات صاحب التأشيرة"
          >
            <DetailRow
              label="Full Name"
              value={visaData.fullName}
              arabicValue="روشان - شريشثا"
              arabicLabel="الاسم الكامل"
              light={false}
            />
            <DetailRow
              label="MOI Reference"
              value={visaData.moiReference}
              arabicLabel="مرجع وزارة الداخلية"
              light={true}
            />
            <DetailRow
              label="Nationality"
              value="NEPAL"
              arabicValue="النيبال"
              arabicLabel="الجنسية"
              light={false}
            />
            <DetailRow
              label="Occupation"
              value={visaData.occupation}
              arabicValue="سائق"
              arabicLabel="المهنة"
              light={true}
            />
            <DetailRow
              label="Date Of Birth"
              value={visaData.dateOfBirth}
              arabicLabel="تاريخ الميلاد"
              light={false}
            />
            <DetailRow
              label="Passport No."
              value={visaData.passportNo}
              arabicLabel="رقم جواز السفر"
              light={true}
            />
          </SectionContainer>

          {/* Employer Details */}
          <SectionContainer
            title="Employer/Family"
            arabicTitle="بيانات صاحب العمل/العائل"
          >
            <DetailRow
              label="Full Name"
              value="شركه المها لتوصيل الطلبات الاستهلاكيه"
              arabicLabel="الاسم الكامل"
              light={false}
            />
            <DetailRow
              label="MOI Reference"
              value="491088"
              arabicLabel="مرجع وزارة الداخلية"
              light={true}
            />
            <DetailRow
              label="Mobile Number"
              value="0"
              arabicLabel="رقم الهاتف"
              light={false}
            />
          </SectionContainer>
        </div>

        {/* Bottom Border Pattern */}
        <div className="h-8 bg-gradient-to-r from-blue-600 via-blue-800 to-blue-600" />
      </div>
    </div>
  );
};

const SectionContainer = ({ title, arabicTitle, children }) => (
  <div className="mb-6">
    <div className="flex justify-between mb-2">
      <div className="text-[#003399] text-lg font-sans font-bold">{title}</div>
      <div className="text-[#003399] text-lg font-sans text-right font-bold">{arabicTitle}</div>
    </div>
    <div className="border border-gray-200 rounded-lg">{children}</div>
  </div>
);

const DetailRow = ({ label, value, arabicLabel, arabicValue, light }) => (
  <div className={`grid grid-cols-3 ${light ? 'bg-gray-50' : 'bg-white'} border-b last:border-b-0`}>
    <div className="p-3 text-[#003399] font-sans">{label}</div>
    <div className="p-3 text-center text-[#003399] font-sans">
      {value}
      {arabicValue && <div className="text-right">{arabicValue}</div>}
    </div>
    <div className="p-3 text-right text-[#003399] font-sans">{arabicLabel}</div>
  </div>
);

export default VisaPage;