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
              light={true}
            />
            <DetailRow
              label="Visa Type"
              value="Private Sector Work Visa"
              arabicValue="سمة دخول عمل اهلى"
              arabicLabel="نوع التأشيرة"
              light={true}
            />
            <DetailRow
              label={"Visa Purpose"}
              value={"Work"}
              arabicValue={"ﻞﻤﻋ"}
              arabicLabel={"ضﺮﻐﻟا"}
              light={true}
            />
            <DetailRow
            label="Date of Issue"
            value={visaData.dateOfIssue}
            arabicValue={""}
            arabicLabel={"راﺪﺻﻹا ﺦﻳرﺎﺗ"}
            light={true}/>
            <DetailRow
                label="Date of Expiry"
                value={visaData.dateOfExpiry}
                arabicValue={""}
                arabicLabel={"ءﺎﻬﺘﻧﻹا ﺦﻳرﺎﺗ\n"}
                light={true}/>
            <DetailRow
                label="Place of Issue"
                value=""
                arabicValue=" ﺔﻈﻓﺎﺤﻣ ﻞﻤﻋ ةراداراﺪﺻﻹا نﺎﻜﻣ"
                arabicLabel={"ىﺪﻤﺣﻻا"}
                light={true}/>
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
            <DetailRow
                label="Full Name"
                value="ROSHAN - SHRESTHA"
                arabicValue="ﻞﻣﺎﻜﻟا ﻢﺳﻻا"
                arabicLabel={"ﺎﺜﺸﻳﺮﺷ - نﺎﺷور"}
                light={true}/>
            <DetailRow
                label="MOI Reference"
                value="368415244"
                arabicValue=""
                arabicLabel={"ﺔﻴﻠﺧاﺪﻟا ةرازو ﻊﺟﺮﻣ"}
                light={true}/>
            <DetailRow
                label="Nationality"
                value="NEPAL"
                arabicValue="ﻴﺴﻨﺠﻟا"
                arabicLabel={"لﺎﺒﻴﻨﻟاﺔ"}
                light={true}/>
            <DetailRow
                label="Gender"
                value="Male"
                arabicValue="ﺮﻛذﺲﻨﺠﻟا"
                arabicLabel={""}
                light={true}/>
            <DetailRow
                label="Occupation"
                value="DRIVER"
                arabicValue="ﺔﻳرﺎﻧ ﺔﺟارد/ﻖﺋﺎﺳﺔﻨﻬﻤﻟا"
                arabicLabel={""}
                light={true}/>
            <DetailRow
                label="Date of Birth"
                value="1996-02-27"
                arabicValue=""
                arabicLabel={"دﻼﻴﻤﻟا ﺦﻳرﺎﺗ"}
                light={true}/>
            <DetailRow
                label="Passport No."
                value="PA1788841"
                arabicValue=""
                arabicLabel={"ﺮﻔﺴﻟا زاﻮﺟ ﻢﻗر"}
                light={true}/>
            <DetailRow
                label="Passport No."
                value="PA1788841"
                arabicValue=""
                arabicLabel={"ﺮﻔﺴﻟا زاﻮﺟ ﻢﻗر"}
                light={true}/>
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
    <div className="p-3 text-center text-[#1a237e] flex flex-col items-center">
      {value}
      {arabicValue && <div className="text-right">{arabicValue}</div>}
    </div>
    <div className="p-3 text-right text-[#1a237e]">{arabicLabel}</div>
  </div>
);

export default VisaDetailsSection;