const partners = [
  { name: 'جامعة الاسكندريه', logo: '/partners/partner1.jpg' },
  { name: 'جامعة القاهره', logo: '/partners/partner2.png' },
  { name: 'جامعة دمنهور', logo: '/partners/partner3.png' },
  { name: 'جامعة أسيوط', logo: '/partners/partner4.jpg' },
];

const PartnersSection = () => {
  return (
    <section className="py-16 px-6 md:px-20 bg-white" dir="rtl">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-800 text-center mb-10">
        الشركاء الاستراتيجيين
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
        {partners.map((partner, index) => (
          <div key={index} className="text-center">
            <img
              src={partner.logo}
              alt={partner.name}
              className="w-24 h-24 object-contain mx-auto mb-4"
            />
            <p className="text-lg font-semibold text-gray-700">{partner.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PartnersSection;
