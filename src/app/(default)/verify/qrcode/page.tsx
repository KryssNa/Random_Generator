"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
interface VerificationData {
  status: string;
  visaNumber: string;
  nationality: string;
  passportNumber: string;
  arabicName: string;
  latinName: string;
  expiryDate: string;
}

// Create a separate component for the verification content
const VerificationContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verificationData, setVerificationData] = useState<VerificationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const qrParam = searchParams.get("hDwjuscv");
        console.log("qrParam", qrParam);

        if (!qrParam) {
          router.push("/");
          return;
        }

        const response = await fetch(`/api/verify?hDwjuscv=${qrParam}`);

        if (!response.ok) {
          throw new Error("Verification failed");
        }

        const data = await response.json();
        setVerificationData(data);
      } catch (error) {
        console.error("Error fetching verification data:", error);
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router, searchParams]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#1b47a1]'></div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-CA", options);
  };

  const dataItems = verificationData
    ? [
        { label: "Visa Status حالة التأشيرة", value: verificationData.status },
        { label: "Visa Number رقم التأشيرة", value: verificationData.visaNumber },
        { label: "Nationality الجنسية", value: verificationData.nationality },
        { label: "Passport Number رقم الجواز", value: verificationData.passportNumber },
        { label: "Arabic Name الاسم العربي", value: verificationData.arabicName },
        { label: "Latin Name الاسم اللاتيني", value: verificationData.latinName },
        { label: "Expiry Date تاريخ الإنتهاء", value: formatDate(verificationData.expiryDate) },
      ]
    : [];

  return (
    <>
      <div className='container mx-auto px-3 md:px-4'>
        <div className='text-center mb-4'>
          <div className='inline-flex items-center justify-center'>
            <img src='/verify.png' alt='Alert' className='w-[75px] h-auto md:w[50px]' />
          </div>
          <p className='text-[#F78A17] font-bold text-[3.5vw] md:text-sm mb-1'>
            تم إصدار التأشيرة، على العامل مراجعة السفارة لاعتمادها
          </p>
          <p className='text-[#F78A17] font-bold text-[3.5vw] md:text-sm'>
            The visa has been issued, the worker must visit the embassy to approve it
          </p>
        </div>

        <div className='flex max-md:flex-col md:flex-wrap md:gap-6 justify-center items-center max-w-2xl mx-auto space-y-4'>
          {dataItems.map((item) => (
            <div
              key={item.label}
              className='bg-[#FFFFFF] w-full h-[72px] flex flex-col items-center justify-center rounded-md border border-[#0000002d] p-4'
            >
              <div className='text-[#212529] text-[15px] md:text-base font-extrabold md:mb-2'>
                {item.label}
              </div>
              <div className='text-[#6C757D] leading-tight text-[15px] md:text-base font-extrabold'>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// Main Page Component
const Page: React.FC = () => {
  return (
    <div
      className='flex justify-center flex-col min-h-screen'
      style={{ fontFamily: "Almarai, sans-serif" }}
    >
      <header className='py-[10px] max-md:pt-2 max-md:pb-3 flex justify-center'>
        <div className='container md:px-12 lg:px-24 pb-2'>
          {/* Header content */}
          <div className='flex justify-around items-center'>
            <div className='w-1/2 flex flex-col justify-center items-center text-center md:text-left  md:mb-0'>
              <p className='text-[#44546A] text-[17px] md:text-xl pt-2'>
                State of Kuwait
              </p>
              <p className='text-[#8497b0] text-[17px] md:text-xl font-bold'>
                Ministry of Interior
              </p>
            </div>
            <div className='flex-shrink-0 mb-0 md:mb-0'>
              <Image
                src='/logo.png'
                alt='MOI Logo'
                width={94}
                height={94}
                className='w-[70.89px] h-auto'
              />
            </div>
            <div className='w-1/2 text-center md:text-right'>
              <p className='text-[#44546A] text-[15px] md:text-xl tracking-wide mb-1'>
                دولة الكويت
              </p>
              <p className='text-[#8497b0] text-[15px] md:text-xl tracking-tight font-extrabold'>
                وزارة الداخلية
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className='flex-grow'>
        <div
          className='bg-[#F3F5F7] p-[10px] text-center mb-4 border-b-[3px]'
          style={{ borderColor: "rgb(214, 220, 229)" }}
        >
          <p className='text-[#1b47a1] text-[3.5vw] md:text-xs'>
            الموقع الرسمي للتحقق من الوثائق والشهادات الصادرة من وزارة الداخلية
            <br />
            The official website to verify documents and certificates issued by
            Ministry of Interior
          </p>
        </div>

        <Suspense 
          fallback={
            <div className='flex items-center justify-center min-h-screen'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#1b47a1]'></div>
            </div>
          }
        >
          <VerificationContent />
        </Suspense>
      </main>

      <footer className='bg-[#F3F5F7] py-4 mt-8 border-[#D6DCE5] border-b-4'>
        {/* Footer content remains the same */}
        <div className='container mx-auto px-4 text-center'>
          <p className='text-[#1b47a1] text-[12px] md:text-xs'>
            جميع الحقوق محفوظة لوزارة الداخلية – دولة الكويت © 2022
            <br />
            All Rights Reserved for Ministry of Interior – State of Kuwait © 2022
          </p>
          <div className='flex justify-center space-x-4 pt-2'>
            <Link
              href='https://www.instagram.com/moi_kuw/?hl=en'
              className='text-[#8497b0]'
            >
              <svg
                width='20'
                height='20'
                fill='currentColor'
                viewBox='0 0 16 16'
              >
                <path d='M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z' />
              </svg>
            </Link>
            <Link
              href='https://twitter.com/moi_kuw?lang=en'
              className='text-[#8497b0]'
            >
              <svg
                width='20'
                height='20'
                fill='currentColor'
                viewBox='0 0 16 16'
              >
                <path d='M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0.0 0 5.026 15z' />
              </svg>
            </Link>
            <Link
              href='https://www.facebook.com/MOIKuwait'
              className='text-[#8497b0]'
            >
              <svg
                width='20'
                height='20'
                fill='currentColor'
                viewBox='0 0 16 16'
              >
                <path d='M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z' />
              </svg>
            </Link>
            <Link
              href='https://www.youtube.com/user/SecurityMediaQ8'
              className='text-[#8497b0]'
            >
              <svg
                width='20'
                height='20'
                fill='currentColor'
                viewBox='0 0 16 16'
              >
                <path d='M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z' />
              </svg>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;