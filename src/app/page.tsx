"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface DetailRowProps {
  label: string
  value: string
  arabicLabel: string
  arabicValue?: string
  light?: boolean
}

interface SectionProps {
  title: string
  arabicTitle: string
  children: React.ReactNode
}

const DetailRow = ({ label, value, arabicLabel, arabicValue, light }: DetailRowProps) => (
  <div className={`grid grid-cols-3 bg-[#EEEFF1] border-b last:border-b-0`}>
    <div className="p-3 text-[#1a237e]">{label}</div>
    <div className="p-3 text-center font-bold text-[#1a237e]">
      {value}
      {arabicValue && <div className="text-center">{arabicValue}</div>}
    </div>
    <div className="p-3 text-right text-[#1a237e]">{arabicLabel}</div>
  </div>
)

const Section = ({ title, arabicTitle, children }: SectionProps) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center mb-2 hover:bg-[#EEEFF1] rounded-lg p-2"
      >
        <div className="text-[#1a237e] text-lg font-bold">{title}</div>
        <div className="flex items-center">
          <div className="text-[#1a237e] text-lg text-right font-bold ml-4">{arabicTitle}</div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="ml-2"
          >
            {/* <ChevronDown className="h-5 w-5 text-[#1a237e]" /> */}
          </motion.div>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border border-[#EEEFF1] rounded-lg shadow-sm">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function VisaDetailsSection() {
  const visaData = {
    visaNumber: '266288804',
    dateOfIssue: '2024-10-27',
    dateOfExpiry: '2025-01-26',
    fullName: 'ROSHAN - SHRESTHA',
    moiReference: '368415244',
    occupation: 'DRIVER',
    passportNo: 'PA1788841',
    dateOfBirth: '1996-02-27',
    passportExpiry: '2033-06-12',
    nationality: 'NEPAL',
    gender: 'Male',
    placeOfIssue: 'ادارة عمل محافظة الاحمدي',
    employerName: 'شركة المحا لتوصيل الطلبات الاستهلاكيه',
    employerReference: '491088',
    mobileNumber: '0'
  }

  return (
    <div className="max-w-5xl mx-auto bg-white font-sans">
      <div className="p-8">
        <div className='pt-4'></div>
        <Section title="Visa Details" arabicTitle="بيانات التأشيرة">
          <DetailRow
            label="Visa Number"
            value={visaData.visaNumber}
            arabicLabel="رقم التأشيرة"
          />
          <DetailRow
            label="Visa Type"
            value="Private Sector Work Visa"
            arabicValue="سمة دخول عمل اهلى"
            arabicLabel="نوع التأشيرة"
            light
          />
          <DetailRow
            label="Visa Purpose"
            value="Work"
            arabicValue="عمل"
            arabicLabel="الغرض"
          />
          <DetailRow
            label="Date of Issue"
            value={visaData.dateOfIssue}
            arabicLabel="تاريخ الإصدار"
            light
          />
          <DetailRow
            label="Date Of Expiry"
            value={visaData.dateOfExpiry}
            arabicLabel="تاريخ الإنتهاء"
          />
          <DetailRow
            label="Place of Issue"
            value={visaData.placeOfIssue}
            arabicLabel="مكان الإصدار"
            light
          />
        </Section>
        <div className='border-t-2 pt-5'></div>
        <Section title="Visa Holder Details" arabicTitle="بيانات صاحب التأشيرة">
          <DetailRow
            label="Full Name"
            value={visaData.fullName}
            arabicValue="روشان - شريشثا"
            arabicLabel="الاسم الكامل"
          />
          <DetailRow
            label="MOI Reference"
            value={visaData.moiReference}
            arabicLabel="مرجع وزارة الداخلية"
            light
          />
          <DetailRow
            label="Nationality"
            value={visaData.nationality}
            arabicValue="النيبال"
            arabicLabel="الجنسية"
          />
          <DetailRow
            label="Gender"
            value={visaData.gender}
            arabicValue="ذكر"
            arabicLabel="الجنس"
            light
          />
          <DetailRow
            label="Occupation"
            value={visaData.occupation}
            arabicValue="سائق/دراجة نارية"
            arabicLabel="المهنة"
          />
          <DetailRow
            label="Date Of Birth"
            value={visaData.dateOfBirth}
            arabicLabel="تاريخ الميلاد"
            light
          />
          <DetailRow
            label="Passport No."
            value={visaData.passportNo}
            arabicLabel="رقم جواز السفر"
          />
          <DetailRow
            label="Place Of Issue"
            value="نيبال"
            arabicLabel="مكان الإصدار"
            light
          />
          <DetailRow
            label="Passport Type"
            value="Normal"
            arabicValue="عادي"
            arabicLabel="نوع الجواز"
          />
          <DetailRow
            label="Expiry Date"
            value={visaData.passportExpiry}
            arabicLabel="تاريخ انتهاء الجواز"
            light
          />
        </Section>
        <div className='border-t-2 pt-5'></div> 
        <Section title="Employer/Family" arabicTitle="بيانات صاحب العمل/العائل">
          <DetailRow
            label="Full Name"
            value={visaData.employerName}
            arabicLabel="الاسم الكامل"
          />
          <DetailRow
            label="MOI Reference"
            value={visaData.employerReference}
            arabicLabel="مرجع وزارة الداخلية"
            light
          />
          <DetailRow
            label="Mobile Number"
            value={visaData.mobileNumber}
            arabicLabel="رقم الهاتف"
          />
        </Section>
      </div>
    </div>
  )
}

