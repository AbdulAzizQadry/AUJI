const updates = [
  {
    title: 'إضافة مزايا جديدة',
    description: 'أوجي بتخطط تضيف أدوات عملية زي محاكاة المقابلات، كورسات المهارات الشخصية، وبرامج إرشاد مع خبراء من سوق العمل.',
    image: '/images/features-update.jpg',
  },
  {
    title: 'تطوير قدرات الذكاء الاصطناعي',
    description: 'بنشتغل على تحسين خوارزميات تحليل السير الذاتية، وتقديم توصيات ذكية مبنية على توقعات سوق العمل ونقاط قوتك.',
    image: '/images/ai-brain.png',
  },
  {
    title: 'بناء مجتمع أقوى',
    description: 'هنفعّل برامج إرشاد متبادل، ورش عمل، وشبكات خريجين عشان الطلبة والخريجين يتواصلوا ويستفيدوا من بعض.',
    image: '/images/community-group.jpg',
  },
];

const FutureUpdatesSection = () => {
  return (
    <section className="py-16 px-6 md:px-20 bg-white" dir="rtl">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-800 text-center mb-12">
        التطويرات المستقبلية
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {updates.map((update, index) => (
          <div
            key={index}
            className="bg-[#f7faff] rounded-2xl shadow-md p-6 text-center transition hover:shadow-lg"
          >
            <div className="aspect-square w-full mb-4">
              <img
                src={update.image}
                alt={update.title}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <h3 className="text-xl font-bold text-blue-700 mb-2">{update.title}</h3>
            <p className="text-gray-700 leading-relaxed text-sm">{update.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FutureUpdatesSection;
