import { useState } from "react";

export default function JobApplicationModal({
  open,
  onClose,
  job,
  profileData = {},
  onSubmit,
}) {
  const [form, setForm] = useState({
    name: profileData.name || "",
    email: profileData.email || "",
    phone: profileData.phone || "",
    dob: profileData.dob || "",
    address: profileData.address || "",
    coverLetter: profileData.coverLetter || "يسعدني التقدم للوظيفة وأعتقد أن خبرتي في المجال مناسبة... (يمكنك التعديل هنا)",
    jobTitle: job?.title || "",
    jobType: job?.type || "",
    targetCompany: job?.company || "",
    currentCompany: profileData.currentCompany || "",
    linkedin: profileData.linkedin || "",
    skills: profileData.skills || [],
  });

  const [skillInput, setSkillInput] = useState("");
  const [coverGenLoading, setCoverGenLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !form.skills.includes(skillInput.trim())) {
      setForm((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const regenerateCover = () => {
    setCoverGenLoading(true);
    setTimeout(() => {
      setForm((prev) => ({
        ...prev,
        coverLetter: "تم توليد خطاب جديد مناسب للوظيفة باستخدام الذكاء الاصطناعي (هنا مكان الخطاب)..."
      }));
      setCoverGenLoading(false);
    }, 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onSubmit && onSubmit(form, job);
      onClose();
    }, 1500);
  };

  const handleDownloadPDF = () => {
    alert("سيتم تنزيل نسخة PDF قريباً (تحتاج دمج مكتبة real pdf)!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 font-[montaser]">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[96vh] overflow-y-auto shadow-xl p-8 relative">
        <button onClick={onClose} className="absolute left-4 top-4 text-gray-400 hover:text-blue-600 text-2xl font-bold">×</button>

        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-2 text-right">مراجعة طلب التقديم قبل الإرسال</h2>
        <p className="text-sm text-gray-600 mb-5 text-right">
          راجع بياناتك كويس قبل ما تبعت طلبك. تقدر تعدّل أي حاجة في البيانات أو الخطاب، وكل اللي هتبعتُه هيكون ظاهر قدامك هنا. لما تتأكد إن كل حاجة صح، اضغط على زر "سلّم الطلب" في آخر الصفحة.
        </p>

        {success ? (
          <div className="text-center my-20">
            <div className="text-3xl mb-4">✅</div>
            <div className="text-lg font-bold text-green-700 mb-2">تم تسليم طلبك بنجاح!</div>
            <div className="text-sm text-gray-600">هتلاقي حالة التقديم محدثة في لوحة التحكم بتاعتك.<br />بالتوفيق يا عسلية!</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-right font-semibold mb-1">الاسم بالكامل</label>
                <input type="text" name="name" value={form.name} onChange={handleChange}
                  className="border rounded-xl p-2 w-full text-right" required />
              </div>
              <div>
                <label className="block text-right font-semibold mb-1">البريد الإلكتروني</label>
                <input type="email" name="email" value={form.email} onChange={handleChange}
                  className="border rounded-xl p-2 w-full text-right" required />
              </div>
              <div>
                <label className="block text-right font-semibold mb-1">رقم التليفون</label>
                <input type="text" name="phone" value={form.phone} onChange={handleChange}
                  className="border rounded-xl p-2 w-full text-right" required />
              </div>
              <div>
                <label className="block text-right font-semibold mb-1">تاريخ الميلاد (اختياري)</label>
                <input type="date" name="dob" value={form.dob} onChange={handleChange}
                  className="border rounded-xl p-2 w-full text-right" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-right font-semibold mb-1">العنوان الحالي</label>
                <input type="text" name="address" value={form.address} onChange={handleChange}
                  className="border rounded-xl p-2 w-full text-right" required />
              </div>
            </div>

            <div>
              <label className="block text-right font-semibold mb-1">ملخص التقديم (Cover Letter)</label>
              <textarea name="coverLetter" rows={5} value={form.coverLetter} onChange={handleChange}
                className="border rounded-xl p-2 w-full text-right" />
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={regenerateCover}
                  className="text-blue-600 font-bold underline" disabled={coverGenLoading}>
                  {coverGenLoading ? "بيولّد الخطاب..." : "ولّد من جديد"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-right font-semibold mb-1">المسمى الوظيفي المتقدّم له</label>
                <input type="text" name="jobTitle" value={form.jobTitle} onChange={handleChange}
                  className="border rounded-xl p-2 w-full text-right" readOnly />
              </div>
              <div>
                <label className="block text-right font-semibold mb-1">نوع الوظيفة</label>
                <input type="text" name="jobType" value={form.jobType} onChange={handleChange}
                  className="border rounded-xl p-2 w-full text-right" readOnly />
              </div>
              <div>
                <label className="block text-right font-semibold mb-1">اسم الشركة/الجهة المتقدّم لها</label>
                <input type="text" name="targetCompany" value={form.targetCompany} onChange={handleChange}
                  className="border rounded-xl p-2 w-full text-right" readOnly />
              </div>
              <div>
                <label className="block text-right font-semibold mb-1">اسم الشركة الحالية (لو موجود)</label>
                <input type="text" name="currentCompany" value={form.currentCompany} onChange={handleChange}
                  className="border rounded-xl p-2 w-full text-right" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-right font-semibold mb-1">رابط لينكدإن (اختياري)</label>
                <input type="text" name="linkedin" value={form.linkedin} onChange={handleChange}
                  className="border rounded-xl p-2 w-full text-right" />
              </div>
            </div>

            <div>
              <label className="block text-right font-semibold mb-1">المهارات الرئيسية (Skills)</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.skills.map((skill, idx) => (
                  <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} className="ml-1 text-red-500 text-lg">×</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                  className="border rounded-xl p-2 w-full text-right"
                  placeholder="أضف مهارة جديدة..." />
                <button type="button" className="bg-blue-600 text-white rounded-xl px-4 py-2 hover:bg-blue-700" onClick={addSkill}>أضف</button>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 my-3 text-right">
              <h4 className="font-bold text-blue-700 mb-2">ملخص الطلب</h4>
              <ul className="text-sm text-blue-900 mb-2">
                <li><strong>الوظيفة:</strong> {form.jobTitle}</li>
                <li><strong>الشركة:</strong> {form.targetCompany}</li>
                <li><strong>نوع الوظيفة:</strong> {form.jobType}</li>
                <li><strong>اسمك:</strong> {form.name}</li>
                <li><strong>الإيميل:</strong> {form.email}</li>
              </ul>
              <button type="button" className="text-blue-700 underline text-sm" onClick={handleDownloadPDF}>تنزيل نسخة PDF</button>
            </div>

            <div className="flex flex-col gap-3">
              <button type="submit" className="bg-blue-700 text-white font-bold py-3 rounded-xl text-lg hover:bg-blue-800 w-full">
                سلّم الطلب دلوقتي
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-200 text-gray-700 font-bold py-3 rounded-xl text-lg hover:bg-gray-300 w-full"
              >
                إلغاء
              </button>
            </div>

            <div className="text-xs text-gray-500 text-center mt-2">
              بالضغط على الزرار، هنبعت بياناتك وخطاب التقديم مباشرة للجهة المختارة.
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
