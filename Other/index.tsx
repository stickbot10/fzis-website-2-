import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

// --- Types ---
interface PrayerTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}

interface PrayerResponse {
  data: {
    timings: PrayerTimings;
    meta: {
      timezone: string;
    };
  };
}

// --- Components ---

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-transparent text-white py-6">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-wider">FZIS</div>
        <div className="hidden md:flex space-x-8 text-sm uppercase tracking-widest font-semibold">
          <a href="#" className="hover:text-emerald-400 transition">Home</a>
          <a href="#prayer-times" className="hover:text-emerald-400 transition">Prayer Times</a>
          <a href="#about" className="hover:text-emerald-400 transition">About</a>
          <a href="#contact" className="hover:text-emerald-400 transition">Contact</a>
          <a href="#donate" className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition">Donate</a>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden focus:outline-none">
          <i className="fas fa-bars text-2xl"></i>
        </button>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black bg-opacity-90 absolute top-full w-full left-0 py-4 flex flex-col items-center space-y-4">
          <a href="#" className="hover:text-emerald-400">Home</a>
          <a href="#prayer-times" className="hover:text-emerald-400">Prayer Times</a>
          <a href="#about" className="hover:text-emerald-400">About</a>
          <a href="#contact" className="hover:text-emerald-400">Contact</a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  // NOTE: Replace the URL below with your actual background image URL if different.
  // Using a high-quality placeholder of a mosque/architecture.
  const bgImage = "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=3270&auto=format&fit=crop";

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        {/* Gradient overlay for better text readability at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto mt-16">
        <h2 className="text-emerald-400 text-lg md:text-xl uppercase tracking-[0.3em] mb-4 font-semibold">In the Name of Allah</h2>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Fishers-Zionsville <br /> Islamic Society
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
          Serving the community with faith, knowledge, and compassion. Join us for daily prayers and community events.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <a href="#prayer-times" className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full transition shadow-lg transform hover:scale-105">
            View Prayer Times
          </a>
          <a href="#donate" className="px-8 py-3 bg-white text-emerald-900 hover:bg-gray-100 font-semibold rounded-full transition shadow-lg transform hover:scale-105">
            Support Us
          </a>
        </div>
      </div>
    </div>
  );
}

function PrayerTimes() {
  const [timings, setTimings] = useState<PrayerTimings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [locationName, setLocationName] = useState("Detecting location...");

  useEffect(() => {
    const fetchPrayerTimes = async (lat: number, lng: number) => {
      try {
        setLoading(true);
        // Using Aladhan API - Standard for Prayer Times
        const date = new Date();
        const response = await fetch(
          `https://api.aladhan.com/v1/timings/${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}?latitude=${lat}&longitude=${lng}&method=2`
        );
        const data: PrayerResponse = await response.json();
        
        if (data && data.data) {
          setTimings(data.data.timings);
          setDateStr(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
          setLocationName("Local Time");
        }
      } catch (err) {
        setError("Failed to load prayer times.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchPrayerTimes(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.warn("Geolocation denied or failed, defaulting to London/Generic");
          // Default fallback (e.g., Fishers, IN coordinates approx)
          fetchPrayerTimes(39.9568, -86.0134); 
          setLocationName("Fishers, IN");
        }
      );
    } else {
       // Default fallback
       fetchPrayerTimes(39.9568, -86.0134);
       setLocationName("Fishers, IN");
    }
  }, []);

  const prayerCards = [
    { name: "Fajr", time: timings?.Fajr, icon: "fa-cloud-sun" },
    { name: "Dhuhr", time: timings?.Dhuhr, icon: "fa-sun" },
    { name: "Asr", time: timings?.Asr, icon: "fa-cloud-sun-rain" },
    { name: "Maghrib", time: timings?.Maghrib, icon: "fa-moon" },
    { name: "Isha", time: timings?.Isha, icon: "fa-star" },
  ];

  return (
    <div id="prayer-times" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-emerald-600 font-bold uppercase tracking-widest mb-2">Daily Prayers</h3>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Prayer Times</h2>
          <p className="text-gray-500 mt-2">{dateStr} • {locationName}</p>
        </div>

        {loading ? (
          <div className="flex justify-center p-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {prayerCards.map((prayer) => (
              <div key={prayer.name} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border-b-4 border-emerald-500 text-center group">
                <div className="text-emerald-500 text-2xl mb-3 group-hover:scale-110 transition duration-300">
                  <i className={`fas ${prayer.icon}`}></i>
                </div>
                <h4 className="text-gray-500 font-semibold uppercase text-sm tracking-wide mb-1">{prayer.name}</h4>
                <p className="text-2xl font-bold text-gray-800">{prayer.time}</p>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-10">
          <p className="text-gray-500 text-sm">
            * Prayer times are calculated based on your local position (ISNA method).
            <br />
            Join us for Iqamah 10 minutes after Adhan.
          </p>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h4 className="text-2xl font-bold text-white mb-2">FZIS</h4>
            <p className="text-sm text-gray-400">Fishers-Zionsville Islamic Society</p>
          </div>
          <div className="flex space-x-6 text-2xl">
            <a href="#" className="hover:text-emerald-400 transition"><i className="fab fa-facebook"></i></a>
            <a href="#" className="hover:text-emerald-400 transition"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-emerald-400 transition"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} FZIS. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <Hero />
      <PrayerTimes />
      <Footer />
    </div>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
