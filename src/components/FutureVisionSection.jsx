const FutureVisionSection = () => {
  return (
    <section className="py-16 px-6 md:px-20 bg-gray-50" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 text-center mb-6">
          رؤيتنا للمستقبل
        </h2>
        <p className="text-lg text-gray-700 text-center mb-12 max-w-4xl mx-auto leading-relaxed">
          AUJI بتطور وتوسع خدماتها باستمرار علشان تواكب احتياجات سوق العمل المتغيرة. هدفنا نفضل دايمًا سابقين بخطوة ونوفر لكل مستخدم أفضل الفرص والأدوات اللي تساعده ينجح.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <img
              src="/images/mena-map.jpg"
              alt="خريطة التوسع الإقليمي"
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>

          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">التوسع الإقليمي</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              هدفنا نوصل لكل الجامعات والمؤسسات التعليمية في مصر والوطن العربي ومنطقة الشرق الأوسط وشمال أفريقيا (MENA). بنسعى نوفّر محتوى مخصص وخدمات تتماشى مع ثقافة ومتطلبات كل منطقة، علشان نساعد الشباب العربي كله ينجح ويلاقي فرصته المثالية في سوق العمل.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureVisionSection;
