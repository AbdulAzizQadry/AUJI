import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { ArrowUp, X } from 'lucide-react';
import { useAuth } from "../AuthContext";
import axios from "axios";

import TestimonialsSection from './TestimonialsSection';
import TrustedBySection from './TrustedBySection';
import WhyAUJISection from './WhyAUJISection';
import handshakeImg from '../assets/Auji.png';
import CoreServices from './CoreServices';
import StepsSection from './StepsSection';
import CTASection from './CTASection';
import Footer from './Footer';

const Landing = () => {
  const [showButton, setShowButton] = useState(false);
  const [cvFile, setCvFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleFileSelect = (e) => {
    setCvFile(e.target.files[0]);
    setUploadStatus(null);
    setUploadProgress(0);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setCvFile(e.dataTransfer.files[0]);
    setUploadStatus(null);
    setUploadProgress(0);
  };

  const handleUpload = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    };

    if (!cvFile) {
      setUploadStatus({ success: false, message: "من فضلك اختر ملف أولًا" });
      return;
    }

    const formData = new FormData();
    formData.append("cv", cvFile);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/upload-cv", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },
      });

      setUploadStatus({ success: res.data.success, message: res.data.message });
      if (res.data.success) {
        setTimeout(() => {
        navigate("/cv-analyzer");
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setUploadStatus({ success: false, message: err.response?.data?.message || "حصل خطأ غير متوقع" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <section className="font-montaser flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-24 bg-[#f7faff] min-h-screen">
        <div className="w-full md:w-1/2 text-center md:pl-6">
          <img
            src={handshakeImg}
            alt="AUJI"
            className="max-w-5xl mx-auto"
            style={{ transform: 'translateY(-20px)' }}
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center items-end text-right space-y-6 md:pr-12">
          <h1 className="text-7xl md:text-8xl font-bold leading-tight text-gray-800 mt-8">
            احنا ندور وانت{' '}
            <span className="relative text-blue-600">
              اتطور
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-yellow-300 rounded"></span>
            </span>
          </h1>

          <p className="text-3xl md:text-4xl text-gray-700 leading-relaxed w-full">
            افتح أبواب مستقبلك مع أوجي – مساعدك الذكي للوظايف والتدريبات في الوطن العربي
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-end mt-12">
            <button
              onClick={() => {if (!isLoggedIn){
                navigate("/login");
                return;
              }
               setShowModal(true)
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-md shadow transition text-xl"
            >
              ارفع السيرة الذاتيه الآن
            </button>

            <button
              onClick={() => {
                if (!isLoggedIn) {
                  navigate("/login");
                  return;
                }
                navigate("/cv-builder");
              }}
              className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 px-10 py-4 rounded-md shadow transition text-xl"
            >
              أنشئ سيرتك الذاتية الآن
            </button>

            <button onClick={goToRegister} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-10 py-4 rounded-md shadow transition text-xl">
              سجل مجانًا
            </button>
          </div>
        </div>
      </section>

      <CoreServices />
      <TestimonialsSection />
      <WhyAUJISection />
      <StepsSection />
      <TrustedBySection />
      <CTASection />
      <Footer />

      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full shadow-xl hover:bg-blue-700 transition z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-[500px] relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center">رفع السيرة الذاتية</h2>

            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-gray-400 rounded-xl p-6 text-center cursor-pointer"
              onClick={() => document.getElementById("cvUpload").click()}
            >
              {cvFile ? (
                <p className="text-gray-700">{cvFile.name}</p>
              ) : (
                <p className="text-gray-500">اسحب الملف هنا أو اضغط لاختيار ملف PDF</p>
              )}
              <input
                id="cvUpload"
                type="file"
                accept="application/pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {uploadProgress > 0 && (
              <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
                <div
                  className="bg-blue-600 h-4 rounded-full text-xs text-white flex items-center justify-center"
                  style={{ width: `${uploadProgress}%` }}
                >
                  {uploadProgress}%
                </div>
              </div>
            )}

            {uploadStatus && (
              <p 
                className={`mt-3 text-center text-lg ${
                  uploadStatus.success ? "text-green-600" : "text-red-600"
                }`}
              >
                {uploadStatus.message}
              </p>
            )}

            <button
              onClick={handleUpload}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md shadow transition"
            >
              ارفع الآن
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Landing;
