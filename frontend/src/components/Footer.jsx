export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Column 1: Brand */}
        <div>
          <h2 className="text-2xl font-semibold text-white">WorldEye</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Explore offbeat destinations, curated stays, and immersive local experiences.
            Travel beyond the ordinary.
          </p>
        </div>

        {/* Column 2: Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/tours" className="hover:text-white">Tours</a></li>
            <li><a href="/blogs" className="hover:text-white">Blogs</a></li>
            <li><a href="/Contact" className="hover:text-white">Contact Us</a></li>
            <li><a href="/AboutUs" className="hover:text-white">About Us</a></li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">

            <li>
              📧 Email:{" "}
              <a
                href="mailto:travelmaniyaofficial@gmail.com"
                className="hover:text-white transition"
              >
                travelmaniyaofficial@gmail.com
              </a>
            </li>

            <li>
              📞 Phone:{" "}
              <a
                href="tel:+919330608859"
                className="hover:text-white transition"
              >
                +91 93306 08859
              </a>
            </li>

            <li>
              📍 Address:{" "}
              <a
                href="https://www.google.com/maps/search/?api=1&query=Nishikunja,+Dakshin+Ghospara+Road,+Milan+Pally,+Rajpur+Sonarpur,+700150"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                Nishikunja, Dakshin Ghospara Road, Milan Pally,  
                Rajpur Sonarpur – 700150
              </a>
            </li>
          </ul>

          {/* Embedded Google Map */}
          <div className="mt-4 w-full h-48 md:h-40 overflow-hidden rounded-lg shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d236021.61967510695!2d88.12670769453126!3d22.4351297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0272656985bb55%3A0x25cff34082d9daab!2sSONARPUR%20PALLY%20UNNAYAN%20SAMITY!5e0!3m2!1sen!2sin!4v1766766451343!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Social Links */}
          <div className="mt-4 flex gap-4">
            <a
              href="https://www.facebook.com/travelmaniyaofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition shadow-md text-white font-semibold"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/travelmaniyaofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 transition shadow-md text-white font-semibold"
            >
              Instagram
            </a>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-700 mt-8 py-4 text-center text-sm">
        © {new Date().getFullYear()} Travel Maniya. All Rights Reserved.
      </div>
    </footer>
  );
}
