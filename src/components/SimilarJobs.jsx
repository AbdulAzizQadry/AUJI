import { Switch } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  Paintbrush,
  FileText,
  BarChart2,
  Briefcase,
  Sparkles
} from 'lucide-react';

import JobApplicationModal from './JobApplicationModal';
import Footer from './Footer';

const getJobIcon = (title) => {
  if (title.includes('تسويق')) return <BarChart2 className="w-5 h-5" />;
  if (title.includes('كاتب') || title.includes('محتوى')) return <FileText className="w-5 h-5" />;
  if (title.includes('مصمم')) return <Paintbrush className="w-5 h-5" />;
  if (title.includes('مدير')) return <Briefcase className="w-5 h-5" />;
  return <Sparkles className="w-5 h-5" />;
};

const SimilarJobs = () => {
  const jobs = [
    {
      title: "مصمم واجهات UI/UX",
      company: "شركة تقانة",
      location: "الرياض، السعودية",
      type: "دوام كامل",
      date: "منذ 3 أيام",
      salary: "SAR 8,000",
      summary: "مطلوب مصمم لديه خبرة في تصميم التطبيقات باستخدام Figma و Adobe XD."
    },
    {
      title: "كاتب محتوى تقني",
      company: "محتوى تك",
      location: "عن بُعد",
      type: "عمل حر",
      date: "منذ 5 أيام",
      salary: "USD 400 / مقالة",
      summary: "كتابة مقالات عن الذكاء الصناعي والتقنيات الحديثة."
    },
    {
      title: "أخصائي تسويق رقمي",
      company: "شركة نمو",
      location: "جدة، السعودية",
      type: "دوام كامل",
      date: "منذ يومين",
      salary: "SAR 6,000",
      summary: "إدارة حملات التسويق عبر الإنترنت وتحليل أداء الحملات."
    },
    {
      title: "مدير حسابات عملاء",
      company: "وكالة إبداع",
      location: "القاهرة، مصر",
      type: "دوام جزئي",
      date: "منذ 4 أيام",
      salary: "EGP 5,500",
      summary: "التواصل مع العملاء والتنسيق بين الفرق الداخلية لضمان جودة الخدمة."
    },
    {
      title: "منسق محتوى سوشيال ميديا",
      company: "تواصل",
      location: "عن بُعد",
      type: "عمل حر",
      date: "منذ أسبوع",
      salary: "USD 300 / شهر",
      summary: "جدولة المنشورات وإنشاء محتوى بصري للمنصات الاجتماعية."
    }
  ];

  const [profiles, setProfiles] = useState([
    { title: "مهندس برمجيات", active: true },
    { title: "محلل بيانات", active: false },
    { title: "تسويق رقمي", active: true }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const profileData = {
    name: "أحمد حسين",
    email: "ahmed@email.com",
    phone: "01012345678",
    address: "القاهرة، مصر",
    coverLetter: "أنا مهتم بالوظيفة دي جدًا وخبرتي هتفيدكم...",
    skills: ["UI/UX", "Figma", "Adobe XD"],
    linkedin: "https://linkedin.com/in/ahmed"
  };

  const toggleProfile = (index) => {
    const updated = [...profiles];
    updated[index].active = !updated[index].active;
    setProfiles(updated);
  };

  return (
    <div className="bg-white font-montaser p-6 md:p-10" dir="rtl">
      <div className="mb-10 text-right">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">الفرص اللي شبهك</h1>
        <p className="text-gray-600">AUJI رشّحلك فرص متفصلة على مقاس مهاراتك واهتماماتك.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-1/4 bg-[#f7faff] border border-blue-100 rounded-xl p-4">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">فلتر الفرص</h2>
          <div className="mb-4">
            <label className="block mb-1">نوع الوظيفة</label>
            <select className="w-full border rounded-md p-2">
              <option>دوام كامل</option>
              <option>دوام جزئي</option>
              <option>تدريب</option>
              <option>عمل حر</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">مستوى الخبرة</label>
            <select className="w-full border rounded-md p-2">
              <option>مبتدئ</option>
              <option>متوسط</option>
              <option>خبير</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">المدينة أو الموقع</label>
            <input type="text" className="w-full border rounded-md p-2" placeholder="اكتب اسم المدينة" />
          </div>
          <button className="bg-blue-600 text-white w-full py-2 mt-2 rounded-md hover:bg-blue-700 transition">طبّق الفلاتر</button>
        </aside>

        <main className="md:w-3/4 flex flex-col gap-10">
          <section>
            <h2 className="text-2xl font-bold text-blue-700 mb-6">فرص شغل جديدة مستنيك</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobs.map((job, index) => (
                <div key={index} className="border border-blue-100 rounded-xl p-5 bg-white shadow-sm relative">
                  <div className="absolute top-0 right-0 w-full h-1 bg-yellow-300 rounded-t-xl"></div>

                  {/* SVG Icon */}
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-blue-600 mb-3">
                    {getJobIcon(job.title)}
                  </div>

                  <h3 className="text-lg font-semibold text-blue-700 mb-1">{job.title}</h3>
                  <p className="text-gray-700 mb-1"><strong>{job.company}</strong> – {job.location}</p>
                  <p className="text-sm text-blue-500 mb-1">{job.type} • {job.date}</p>
                  <p className="text-sm text-green-700 mb-2">{job.salary}</p>
                  <p className="text-gray-600 mb-4 text-sm">{job.summary}</p>
                  <div className="flex gap-2">
                    <Link to="/job-result">
                      <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-300 text-sm">اعرف التفاصيل</button>
                    </Link>
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm"
                      onClick={() => { setSelectedJob(job); setShowModal(true); }}
                    >
                      قدّم دلوقتي
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10 mb-16">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-blue-800">بروفايلاتك</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">أضف بروفايل جديد</button>
            </div>
            <ul className="space-y-3">
              {profiles.map((profile, index) => (
                <li key={index} className="flex items-center justify-between bg-[#f7faff] p-3 rounded-lg border border-blue-100">
                  <span className="text-right w-full">{profile.title}</span>
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <button className="text-sm text-blue-600 hover:underline">تعديل</button>
                    <Switch
                      checked={profile.active}
                      onChange={() => toggleProfile(index)}
                      className={({ checked }) =>
                        `${checked ? 'bg-blue-600' : 'bg-gray-300'} relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-200 ease-in-out`
                      }
                    >
                      <span className="sr-only">تفعيل</span>
                      <span
                        aria-hidden="true"
                        className={`absolute left-[2px] top-[2px] h-5 w-5 rounded-full bg-white transform transition duration-200 ease-in-out ${profile.active ? 'translate-x-6' : 'translate-x-0'}`}
                      />
                    </Switch>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>

      <JobApplicationModal
        open={showModal}
        onClose={() => setShowModal(false)}
        job={selectedJob}
        profileData={profileData}
        onSubmit={(formData, jobData) => {
        }}
      />

      <div dir="ltr">
        <Footer />
      </div>
    </div>
  );
};

export default SimilarJobs;