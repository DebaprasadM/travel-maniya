export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-72 md:h-96">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          alt="Travel Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-wide">
            About Us
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8">
          We Craft Journeys, Not Just Trips
        </h2>

        <p className="text-gray-600 leading-relaxed text-lg text-center max-w-3xl mx-auto">
          At WanderScape Travels, we believe travel is not about reaching a
          destination — it is about discovering new stories, cultures, people,
          and emotions along the way. Our mission is to design unique, curated,
          and meaningful experiences that stay with you long after the journey
          ends.
        </p>

        {/* Highlights */}
        <div className="grid md:grid-cols-3 gap-8 mt-14">
          <div className="p-6 rounded-2xl shadow-lg bg-gray-50 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">Curated Tours</h3>
            <p className="text-gray-600">
              Every trip is hand-crafted by local experts who understand the
              true essence of each destination.
            </p>
          </div>

          <div className="p-6 rounded-2xl shadow-lg bg-gray-50 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">Trusted Service</h3>
            <p className="text-gray-600">
              From travel planning to support during your trip — we ensure
              worry-free journeys.
            </p>
          </div>

          <div className="p-6 rounded-2xl shadow-lg bg-gray-50 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">Local Experiences</h3>
            <p className="text-gray-600">
              Explore hidden gems, local cuisines, culture, and immersive
              activities beyond the typical tourist circuit.
            </p>
          </div>
        </div>

        {/* Founders Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Our Journey
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto text-center">
            Founded by passionate explorers, WanderScape started with a single
            dream — to make travel simple, meaningful, and accessible. Today, we
            serve thousands of travelers across India and abroad, helping them
            create unforgettable memories.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
