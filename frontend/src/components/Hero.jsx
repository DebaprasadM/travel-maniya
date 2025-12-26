export default function Hero() {
  return (
    <section className="relative h-[72vh] md:h-[78vh]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://avada.website/tour-operator/wp-content/uploads/sites/169/2022/06/tour-operator-hero-1.jpg)`,

        }}
      />
      <div className="absolute inset-0 hero-overlay"></div>

      <div className="relative max-w-6xl mx-auto px-6 h-full flex items-center">
        <div className="text-white max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Offbeat escapes, curated homestays
          </h1>
          <p className="mt-4 text-lg md:text-xl opacity-90">
            Handpicked stays & local experiences across North Bengal —
            sustainable, local, and unforgettable.
          </p>

          <div className="mt-6 flex gap-3">
            <a
              href="#tours"
              className="px-5 py-3 bg-emerald-600 rounded text-white font-medium"
            >
              Explore Tours
            </a>
            <a
              href="/contact"
              className="px-5 py-3 bg-white/20 rounded border text-white"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
