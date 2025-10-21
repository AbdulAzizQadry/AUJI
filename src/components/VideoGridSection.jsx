const videos = [
  {
    title: 'ازاي تعدي الانترفيو بنجاح',
    subtitle: 'نصايح لسيرة ذاتية مميزة',
    thumbnail: '/videos/video1.png',
  },
  {
    title: 'مع أحمد شاهين كوتش الكارير',
    subtitle: 'خليك جاهز صح',
    thumbnail: '/videos/video2.png',
  },
  {
    title: 'ازاي تضاعف دخلك بدون شغل اضافي',
    subtitle: 'خطوات عملية للمبتدئين',
    thumbnail: '/videos/video3.png',
  },
  {
    title: 'سر الوقت | مالا يخبرك به خبراء الانتاجيه',
    subtitle: 'ازاي تستفيد منه بذكاء',
    thumbnail: '/videos/video4.png',
  },
  {
    title: 'لقاء مع حازم الصديق | مؤسس استبرق واول فلوجر مصري',
    subtitle: 'اللي يشتغلها ابنك بعد 10 سنين',
    thumbnail: '/videos/video5.png',
  },
  {
    title: 'ازاي تنظم وقتك',
    subtitle: 'قصة نجاح أحمد من البحيرة',
    thumbnail: '/videos/video6.png',
  },
];

const VideoGridSection = () => {
  return (
    <section className="py-16 px-6 md:px-20 bg-white text-right" dir="rtl">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-800 text-center mb-4">
        افتح قد راتك مع فيديوهاتنا
      </h2>
      <p className="text-sm md:text-base text-gray-500 text-center mb-10 max-w-2xl mx-auto leading-relaxed">
        اتفرج على فيديوهاتنا المختارة بعناية، فيها نصايح من خبراء، قصص نجاح، وشروحات تساعدك تطور نفسك وتكبر في شغلك.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-2xl overflow-hidden shadow hover:shadow-md transition"
          >
            <div className="relative group">
              <img src={video.thumbnail} alt={video.title} className="w-full h-56 object-cover" />
              <img
                src="/icons/play.png"
                alt="Play"
                className="absolute inset-0 m-auto w-12 h-12 opacity-80 group-hover:scale-110 transition duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="text-md font-bold text-gray-800 mb-1">{video.title}</h3>
              <p className="text-sm text-gray-500">{video.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideoGridSection;
