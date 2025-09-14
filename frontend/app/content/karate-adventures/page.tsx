import Layout from "@/components/Layout";
import { MapPin, Calendar, Users, Camera, Mountain, Waves, TreePine, Heart } from "lucide-react";

export default function KarateAdventures() {
  const adventures = [
    {
      title: "Coastal Training Camp",
      location: "Mombasa & Diani Beach",
      duration: "7 Days",
      description: "Train on pristine beaches at sunrise, learn traditional kata by the Indian Ocean, and experience Swahili culture.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2000&auto=format&fit=crop",
      highlights: ["Beach training sessions", "Dhow sailing experience", "Swahili cooking classes", "Marine park visits"]
    },
    {
      title: "Safari & Mountain Training",
      location: "Maasai Mara & Mount Kenya",
      duration: "10 Days",
      description: "Combine serious martial arts training with Big Five safari adventures and high-altitude mountain conditioning.",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2000&auto=format&fit=crop",
      highlights: ["Safari game drives", "Mountain dojo training", "Maasai cultural exchange", "Wildlife photography"]
    },
    {
      title: "Lake & Rift Valley Adventure",
      location: "Lake Nakuru & Great Rift Valley",
      duration: "5 Days",
      description: "Train amidst flamingo colonies and volcanic landscapes while exploring Kenya's geological wonders.",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=2000&auto=format&fit=crop",
      highlights: ["Lakeside kata practice", "Hot springs training", "Flamingo watching", "Geological exploration"]
    }
  ];

  const experiences = [
    {
      icon: Mountain,
      title: "Mountain Dojo Training",
      description: "Train at high altitude in custom-built mountain dojos with panoramic views of Kenya's peaks."
    },
    {
      icon: Waves,
      title: "Beach Martial Arts",
      description: "Practice traditional forms on pristine beaches during magical sunrise and sunset sessions."
    },
    {
      icon: TreePine,
      title: "Bush Camp Training",
      description: "Immersive training camps in Kenya's national parks where wildlife serves as your backdrop."
    },
    {
      icon: Heart,
      title: "Cultural Integration",
      description: "Deep cultural exchange with local Kenyan martial artists and traditional communities."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-br from-black/70 to-black/50 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-light tracking-wide mb-6">
            Karate Adventures
          </h1>
          <p className="text-xl md:text-2xl font-light">
            The World's First Martial Arts Sports Tourism Experience
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-8">
            Where Martial Arts Meets Adventure
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            HDKI Kenya pioneered the concept of martial arts sports tourism by combining serious karate training 
            with Kenya's incredible natural beauty and rich cultural heritage. Our programs offer authentic 
            martial arts instruction in some of the world's most spectacular settings.
          </p>
          <p className="text-lg text-gray-600">
            From training on Indian Ocean beaches to practicing kata in the shadow of Mount Kenya, 
            every adventure is designed to challenge your martial arts skills while creating unforgettable memories.
          </p>
        </div>
      </section>

      {/* Adventure Packages */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-16">
            Featured Adventure Packages
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {adventures.map((adventure, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${adventure.image})` }} />
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <MapPin className="h-5 w-5 text-hdki-red mr-2" />
                    <span className="text-gray-600">{adventure.location}</span>
                    <Calendar className="h-5 w-5 text-hdki-red ml-4 mr-2" />
                    <span className="text-gray-600">{adventure.duration}</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{adventure.title}</h3>
                  <p className="text-gray-700 mb-4">{adventure.description}</p>
                  <ul className="space-y-2 mb-6">
                    {adventure.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-hdki-red rounded-full mr-3" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-hdki-red hover:bg-hdki-red-dark text-white py-3 font-semibold transition-colors duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Experiences */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-16">
            Unique Training Experiences
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {experiences.map((experience, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-hdki-red rounded-full flex items-center justify-center mx-auto mb-4">
                  <experience.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{experience.title}</h3>
                <p className="text-gray-600">{experience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-16">
            What's Included in Every Adventure
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-hdki-red">Martial Arts Training</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-hdki-red rounded-full mt-2 mr-4 flex-shrink-0" />
                  <span>Daily training sessions with certified HDKI instructors</span>
                </li>
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-hdki-red rounded-full mt-2 mr-4 flex-shrink-0" />
                  <span>Traditional kata and kumite practice</span>
                </li>
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-hdki-red rounded-full mt-2 mr-4 flex-shrink-0" />
                  <span>Weapons training (when applicable)</span>
                </li>
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-hdki-red rounded-full mt-2 mr-4 flex-shrink-0" />
                  <span>Meditation and mental training</span>
                </li>
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-hdki-red rounded-full mt-2 mr-4 flex-shrink-0" />
                  <span>Rank testing opportunities</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6 text-hdki-red">Adventure Tourism</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-hdki-red rounded-full mt-2 mr-4 flex-shrink-0" />
                  <span>Professional safari guides and wildlife experiences</span>
                </li>
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-hdki-red rounded-full mt-2 mr-4 flex-shrink-0" />
                  <span>Cultural immersion with local communities</span>
                </li>
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-hdki-red rounded-full mt-2 mr-4 flex-shrink-0" />
                  <span>Accommodation in eco-lodges and camps</span>
                </li>
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-hdki-red rounded-full mt-2 mr-4 flex-shrink-0" />
                  <span>All meals featuring local cuisine</span>
                </li>
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-hdki-red rounded-full mt-2 mr-4 flex-shrink-0" />
                  <span>Airport transfers and ground transportation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Guest Instructors & Global Exchanges */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-16">Guest Instructors & Global Exchanges</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Hosting in Kenya */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="h-56 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1568495248636-6432b97bd949?q=80&w=1600&auto=format&fit=crop')" }} />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Hosting in Nairobi</h3>
                <p className="text-gray-700 mb-4">We welcome guest instructors from around the world to teach in our dojos and explore Kenya's unique attractions like the Giraffe Centre and Nairobi National Park.</p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center text-gray-600"><div className="w-2 h-2 bg-hdki-red rounded-full mr-3" />Dojo training with local black belts</li>
                  <li className="flex items-center text-gray-600"><div className="w-2 h-2 bg-hdki-red rounded-full mr-3" />Visit the Giraffe Centre and cultural museums</li>
                  <li className="flex items-center text-gray-600"><div className="w-2 h-2 bg-hdki-red rounded-full mr-3" />Wildlife experiences in city and beyond</li>
                </ul>
                <button className="w-full border-2 border-hdki-red text-hdki-red hover:bg-hdki-red hover:text-white py-3 font-semibold transition-all">Host with HDKI Kenya</button>
              </div>
            </div>

            {/* Dublin Exchange */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="h-56 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop')" }} />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Training in Dublin</h3>
                <p className="text-gray-700 mb-4">Our students and instructors travel to Ireland to train with HDKI dojos in Dublin, deepening technical skills and international friendships.</p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center text-gray-600"><div className="w-2 h-2 bg-hdki-red rounded-full mr-3" />Joint seminars with Irish instructors</li>
                  <li className="flex items-center text-gray-600"><div className="w-2 h-2 bg-hdki-red rounded-full mr-3" />City cultural tours and historic sites</li>
                  <li className="flex items-center text-gray-600"><div className="w-2 h-2 bg-hdki-red rounded-full mr-3" />Community building across continents</li>
                </ul>
                <button className="w-full border-2 border-hdki-red text-hdki-red hover:bg-hdki-red hover:text-white py-3 font-semibold transition-all">Join a Dublin Exchange</button>
              </div>
            </div>

            {/* Japan Immersion */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="h-56 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1495064252300-6634bc29ab89?q=80&w=1600&auto=format&fit=crop')" }} />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Immersion in Japan</h3>
                <p className="text-gray-700 mb-4">Experience karate at its source with intensive training in Japan, visiting traditional dojos and cultural landmarks in Tokyo and beyond.</p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center text-gray-600"><div className="w-2 h-2 bg-hdki-red rounded-full mr-3" />Train in traditional Japanese dojos</li>
                  <li className="flex items-center text-gray-600"><div className="w-2 h-2 bg-hdki-red rounded-full mr-3" />Cultural exchange and etiquette</li>
                  <li className="flex items-center text-gray-600"><div className="w-2 h-2 bg-hdki-red rounded-full mr-3" />Guided visits to historic sites</li>
                </ul>
                <button className="w-full border-2 border-hdki-red text-hdki-red hover:bg-hdki-red hover:text-white py-3 font-semibold transition-all">Apply for Japan Program</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-hdki-gray-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light mb-6">Ready for Your Karate Adventure?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Join martial artists from around the world for an experience that will transform your practice and create lifelong memories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-hdki-red hover:bg-hdki-red-dark text-white px-8 py-4 text-lg font-semibold transition-colors duration-300">
              View Upcoming Adventures
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold transition-all duration-300">
              Request Custom Adventure
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
