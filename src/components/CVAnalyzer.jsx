import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

import Footer from './Footer';

const data = [
  { name: 'مهاراتك', value: 60 },
  { name: 'متوسط السوق', value: 80 },
];

const CVAnalyzer = () => {
  return (
    <div className="bg-white font-montaser">
      <div className="flex flex-col md:flex-row min-h-screen p-8 gap-8">
        <div className="md:w-1/2 order-2 md:order-2 bg-[#f7faff] p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-right">تحليل السيرة الذاتية الذكي</h2>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-right">البيانات المستخرجة تلقائيًا</h3>

            <div className="mb-4">
              <label className="block mb-1 text-right">الاسم</label>
              <input
                className="w-full border rounded-xl p-2 text-right"
                dir="rtl"
                type="text"
                placeholder="يظهر تلقائيًا"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-right">البريد الإلكتروني</label>
              <input
                className="w-full border rounded-xl p-2 text-left"
                dir="ltr"
                type="email"
                placeholder="example@email.com"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-right">المهارات</label>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">القيادة</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">تحليل البيانات</span>
              </div>
            </div>

            <div>
              <input
                className="w-full border rounded-xl p-2 text-right"
                dir="rtl"
                type="text"
                placeholder="أضف مهارة جديدة..."
              />
            </div>
          </div>
        </div>

        <div className="md:w-1/2 order-1 md:order-1 bg-[#f7faff] p-6 rounded-2xl shadow-md">
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-right">تقييم جودة السي في</h3>
            <div className="text-5xl font-bold text-blue-600 mb-2 text-center">85%</div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-blue-500 h-4 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <p className="mt-2 text-right text-sm text-gray-600">
              CV منظم كويس وبيوضح أهم خبراتك...
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-right">تحليل فجوة المهارات</h3>

            <div className="mb-4">
              <label className="block mb-2 text-right">مهارات ناقصة</label>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Git</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">إدارة المشاريع</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-right">كورسات مقترحة</label>
              <ul
                className="list-disc pr-5 text-right text-sm text-gray-700"
                dir="rtl"
                style={{ listStylePosition: 'inside' }}
              >
                <li>Project Management - Coursera</li>
                <li>Git & GitHub - Udemy</li>
              </ul>
            </div>

            <div className="mt-6">
              <h4 className="text-right text-md mb-2">مقارنة المهارات</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontFamily: 'Montaser' }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-6 px-6">
        {/* CV الأصلي */}
        <div className="flex-1 border border-blue-300 bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold text-blue-800 mb-4">Original CV</h3>
          <p className="mb-2">
            <strong>Name:</strong> Mohamed Ahmed
          </p>
          <p className="mb-2">
            <strong>Phone:</strong> 01012345678
          </p>
          <p className="mb-2">
            <strong>Email:</strong> mohamed@email.com
          </p>
          <p className="mb-4">
            <strong>LinkedIn:</strong> linkedin.com/in/mohamed
          </p>
          <p>
            <strong>Summary:</strong>{' '}
            A <span className="line-through text-gray-400">hardworking</span> <span className="text-purple-600 font-semibold">driven</span> and <span className="text-purple-600 font-semibold">motivated</span> student <span className="line-through text-gray-400">seeking an opportunity to</span> <span className="text-purple-600 font-semibold">eager to leverage</span> academic knowledge and gain <span className="text-purple-600 font-semibold">strong hands-on</span> experience in a <span className="line-through text-gray-400">growth-oriented</span> <span className="text-purple-600 font-semibold">dynamic</span> environment.
          </p>
        </div>

        <div className="flex-1 rounded-xl p-6 border-2 border-violet-500 bg-gradient-to-br from-violet-100 via-white to-violet-50 shadow-lg">
          <h3 className="text-xl font-bold text-violet-800 mb-4">AI-Suggested Version</h3>

          <p className="mb-2">
            <strong>Name:</strong> Mohamed Ahmed
          </p>
          <p className="mb-2">
            <strong>Phone:</strong> 01012345678
          </p>
          <p className="mb-2">
            <strong>Email:</strong> mohamed@email.com
          </p>
          <p className="mb-4">
            <strong>LinkedIn:</strong> linkedin.com/in/mohamed
          </p>

          <p>
            <strong>Summary:</strong>{' '}
            A <span className="text-blue-700 font-semibold">driven</span> and{' '}
            <span className="text-blue-700 font-semibold">motivated</span> student eager to{' '}
            <span className="text-blue-700 font-semibold">leverage</span> academic knowledge and gain{' '}
            <span className="text-blue-700 font-semibold">strong hands-on experience</span> in a dynamic environment.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CVAnalyzer;