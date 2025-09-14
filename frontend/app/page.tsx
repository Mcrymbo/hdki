import Link from "next/link";
import Layout from "@/components/Layout";
import TrainingSessions from "@/components/TrainingHolder";
import { ArrowRight, MapPin, Users, Trophy, Star } from "lucide-react";

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-black/70 to-black/50 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <div className="w-20 h-20 bg-hdki-red border-4 border-hdki-red flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-2xl tracking-tight leading-none">
                HD<br />KI
              </span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-light tracking-wide mb-6">
            HDKI KENYA
          </h1>
          
          <div className="text-lg md:text-xl font-light tracking-wider mb-8 space-x-4">
            <span>Tradition</span>
            <span className="text-hdki-red">•</span>
            <span>Adventure</span>
            <span className="text-hdki-red">•</span>
            <span>Culture</span>
            <span className="text-hdki-red">•</span>
            <span>Excellence</span>
          </div>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-light">
            Experience the perfect fusion of traditional martial arts and Kenya's breathtaking adventure tourism
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/content/karate-adventures"
              className="bg-hdki-red hover:bg-hdki-red-dark text-white px-8 py-4 text-lg font-semibold transition-colors duration-300 flex items-center justify-center group"
            >
              Explore Karate Adventures
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/content/about"
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              Learn About HDKI Kenya
            </Link>
          </div>
        </div>
      </section>

      {/* Karate Adventures Highlight */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Karate Adventures in Kenya
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The world's first martial arts sports tourism experience. Train with world-class instructors 
              while exploring Kenya's incredible landscapes, wildlife, and culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-hdki-red rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">World-Class Training</h3>
              <p className="text-gray-600">
                Train with certified HDKI instructors in stunning locations from Mombasa beaches to Maasai Mara camps.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-hdki-red rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Cultural Immersion</h3>
              <p className="text-gray-600">
                Experience authentic Kenyan culture, cuisine, music, and traditions alongside your martial arts journey.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-hdki-red rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Adventure Tourism</h3>
              <p className="text-gray-600">
                Safari excursions, mountain climbing, beach training, and wildlife experiences integrated with karate camps.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/content/karate-adventures"
              className="bg-hdki-red hover:bg-hdki-red-dark text-white px-8 py-4 text-lg font-semibold transition-colors duration-300 inline-flex items-center group"
            >
              Discover All Adventures
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-8">Our Mission</h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            HDKI Kenya is dedicated to promoting the traditional values and techniques of martial arts 
            while showcasing the natural beauty and rich culture of Kenya. We create transformative 
            experiences that combine physical discipline, mental growth, and cultural appreciation.
          </p>
          <p className="text-lg text-gray-600">
            As an official affiliate of <a href="https://hdki.org/" target="_blank" rel="noopener noreferrer" className="text-hdki-red hover:underline">HDKI International</a>, 
            we uphold the highest standards of martial arts excellence while pioneering the future of sports tourism.
          </p>
        </div>
      </section>

      {/* Training Sessions Grid */}
      <TrainingSessions />

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-16">
            What Our Adventurers Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "Training on the shores of Lake Nakuru while watching flamingos was a once-in-a-lifetime experience. 
                The instructors were phenomenal and the cultural immersion was incredible."
              </p>
              <div className="font-semibold text-gray-900">Sarah Mitchell</div>
              <div className="text-gray-600">Black Belt, Canada</div>
            </div>

            <div className="bg-gray-50 p-8 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "HDKI Kenya's adventure program exceeded all expectations. The combination of serious martial arts 
                training and authentic safari experiences was perfectly balanced."
              </p>
              <div className="font-semibold text-gray-900">Takeshi Yamamoto</div>
              <div className="text-gray-600">Instructor, Japan</div>
            </div>

            <div className="bg-gray-50 p-8 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "The cultural exchange with local Kenyan martial artists and the mountain training camps 
                created memories that will last forever. Highly recommend to any serious practitioner."
              </p>
              <div className="font-semibold text-gray-900">Maria Rodriguez</div>
              <div className="text-gray-600">Tournament Champion, Spain</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-hdki-gray-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light mb-6">Ready to Begin Your Adventure?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Join us for an unforgettable journey that combines martial arts excellence with Kenya's natural wonders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/content/contact"
              className="bg-hdki-red hover:bg-hdki-red-dark text-white px-8 py-4 text-lg font-semibold transition-colors duration-300"
            >
              Contact Us Today
            </Link>
            <Link
              href="/content/events"
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              View Upcoming Events
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
