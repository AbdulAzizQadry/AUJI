import { Lightbulb, Target, Users, TrendingUp, ShieldCheck, Smile } from 'lucide-react';

const coreValues = [
  {
    icon: <Lightbulb size={40} />,
    title: 'الابتكار دايمًا',
    desc: 'إحنا دايمًا بنجرب كل جديد في الذكاء الاصطناعي عشان نقدّم حلول حديثة تساعدك تطوّر مستقبلك المهني وتبقى دايمًا سابق بخطوة.',
  },
  {
    icon: <Target size={40} />,
    title: 'تمكين الشباب',
    desc: 'منصتنا معمولة مخصوص عشان تدي الطلاب والخريجين الأدوات والفرص اللي تساعدهم يوصلوا لطموحاتهم.',
  },
  {
    icon: <Users size={40} />,
    title: 'مجتمع داعم',
    desc: 'إحنا مجتمع بيدعم بعضه. تقدر تتواصل وتشارك خبراتك وتتعلم مع ناس زيك، ونعدّي الطريق سوا.',
  },
  {
    icon: <TrendingUp size={40} />,
    title: 'تطوير مستمر',
    desc: 'هدفنا دايمًا نطوّر نفسنا ونضيف مميزات جديدة حسب احتياجات المستخدمين وسوق العمل — عشان نفضل دايمًا في الصورة.',
  },
  {
    icon: <ShieldCheck size={40} />,
    title: 'الشفافية والأمانة',
    desc: 'بنشتغل بأعلى معايير الشفافية والأمانة. ثقتك فينا وفي بياناتك أولوية عندنا.',
  },
  {
    icon: <Smile size={40} />,
    title: 'سهولة الاستخدام',
    desc: 'منصتنا سهلة وبسيطة ومصممة لكل شباب الوطن العربي. بنؤمن إن الفرص لازم تكون متاحة للجميع.',
  },
];

const CoreValuesSection = () => {
  return (
    <section className="py-16 px-6 md:px-20 bg-gray-50" dir="rtl">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-800 text-center mb-12">
        قيمنا اللي بنعيش بيها
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {coreValues.map((value, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-8 text-center">
            <div className="text-blue-600 bg-blue-50 p-4 rounded-full w-fit mx-auto mb-4">
              {value.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
            <p className="text-sm text-gray-600">{value.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoreValuesSection;
