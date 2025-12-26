import ContactForm from "../components/ContactForm";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9fd796] via-[#a9d55e] to-[#dc9d29] text-white">
      
      {/* Hero Section (NO GREEN OVER IMAGE) */}
      <section className="relative w-full h-64 md:h-96">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
          alt="Contact Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide">
              Contact Us
            </h1>
            <p className="mt-3 text-green-200">
              Fresh • Trusted • Premium Travel Support
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-green-200">
          Let’s Grow Your Journey Together
        </h2>

        <div className="grid md:grid-cols-2 gap-14">
          
          {/* Contact Form */}
          <div className="relative bg-gradient-to-br from-[#32dc29] to-[#29bedc]
          border border-green-500/30 shadow-2xl rounded-3xl p-8 md:p-10">
            
            <div className="absolute -top-10 -right-10 w-32 h-32 
            bg-green-500/30 blur-3xl rounded-full"></div>

            <ContactForm />
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-9">
            
            <InfoBlock
              icon="📍"
              title="Our Office"
              text={`Nishikunja, Dakshin Ghospara Road, Milan Pally,
Rajpur, Sonarpur – 700150`}
            />
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
            <InfoBlock
              icon="📞"
              title="Call Us"
              text="+91 93306 08859"
              link="tel:+919330608859"
            />

            <InfoBlock
              icon="📧"
              title="Email"
              text="travelmaniyaofficial@gmail.com"
              link="mailto:travelmaniyaofficial@gmail.com"
            />

            <InfoBlock
              icon="⏰"
              title="Working Hours"
              text={`Monday – Saturday: 9AM – 7PM
Sunday: Closed`}
            />

            {/* Social */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-200">
                🌐 Follow Us
              </h3>

              <div className="flex gap-5">
                <a
                  href="https://www.facebook.com/travelmaniyaofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl font-semibold
                  bg-gradient-to-r from-green-500 to-emerald-500
                  hover:scale-105 transition shadow-lg"
                >
                  Facebook
                </a>

                <a
                  href="https://www.instagram.com/travelmaniyaofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl font-semibold
                  bg-gradient-to-r from-pink-500 to-rose-500
                  hover:scale-105 transition shadow-lg"
                >
                  Instagram
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

/* Info Card */
function InfoBlock({ icon, title, text, link }) {
  return (
    <div className="bg-gradient-to-br from-[#2988dc] to-[#a823e1]
    border border-green-500/30 rounded-2xl p-6 shadow-xl">
      
      <h3 className="text-lg font-semibold text-green-200 flex items-center gap-2">
        {icon} {title}
      </h3>

      {link ? (
        <a
          href={link}
          className="block mt-3 text-green-300 hover:text-green-100 transition"
        >
          {text}
        </a>
      ) : (
        <p className="mt-3 text-gray-200 whitespace-pre-line leading-relaxed">
          {text}
        </p>
      )}
    </div>
  );
}
