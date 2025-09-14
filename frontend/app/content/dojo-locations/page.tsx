import Layout from "@/components/Layout";
import Link from "next/link";
import { MapPin, Phone, Clock, Users, Car, ArrowRight } from "lucide-react";

export default function DojoLocations() {
  const locations = [
    {
      name: "HDKI Kenya Headquarters",
      city: "Nairobi",
      address: "Valley Road, Upper Hill, Nairobi",
      phone: "+254 700 123 456",
      email: "nairobi@hdkikenya.org",
      schedule: [
        { day: "Monday", times: "6:00 PM - 8:00 PM" },
        { day: "Wednesday", times: "6:00 PM - 8:00 PM" },
        { day: "Friday", times: "6:00 PM - 8:00 PM" },
        { day: "Saturday", times: "9:00 AM - 11:00 AM, 2:00 PM - 4:00 PM" },
        { day: "Sunday", times: "9:00 AM - 11:00 AM" }
      ],
      instructor: "Sensei Peter Ombima",
      programs: ["Adult Classes", "Youth Programs", "Women in Karate", "Competition Training"],
      facilities: ["Air-conditioned dojo", "Changing rooms", "Equipment storage", "Parking available"],
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.800592892978!2d36.79493731475393!3d-1.2884573990614468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f11242c8c72d1%3A0x7e58e21b5e40fc26!2sValley%20Rd%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1640000000000!5m2!1sen!2ske"
    },
    {
      name: "Coastal Training Center",
      city: "Mombasa",
      address: "Nyali Road, Near City Mall, Mombasa",
      phone: "+254 700 123 457",
      email: "mombasa@hdkikenya.org",
      schedule: [
        { day: "Tuesday", times: "5:30 PM - 7:30 PM" },
        { day: "Thursday", times: "5:30 PM - 7:30 PM" },
        { day: "Saturday", times: "8:00 AM - 10:00 AM, 3:00 PM - 5:00 PM" },
        { day: "Sunday", times: "8:00 AM - 10:00 AM" }
      ],
      instructor: "Sensei Mustafa H. Ahmed",
      programs: ["Traditional Shotokan", "Beach Training", "Adventure Programs", "Self-Defense"],
      facilities: ["Ocean-view dojo", "Outdoor training area", "Beach access", "Equipment provided"],
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.2926045542406!2d39.66827331476122!3d-4.043570096970984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x184012bb2b01e889%3A0x9c5b5b5b5b5b5b5b!2sNyali%20Rd%2C%20Mombasa!5e0!3m2!1sen!2ske!4v1640000000000!5m2!1sen!2ske"
    },
    {
      name: "Rift Valley Dojo",
      city: "Nakuru",
      address: "Kenyatta Avenue, Near Nakuru Athletic Club",
      phone: "+254 700 123 458",
      email: "nakuru@hdkikenya.org",
      schedule: [
        { day: "Monday", times: "6:00 PM - 8:00 PM" },
        { day: "Wednesday", times: "6:00 PM - 8:00 PM" },
        { day: "Saturday", times: "9:00 AM - 11:00 AM" },
        { day: "Sunday", times: "2:00 PM - 4:00 PM" }
      ],
      instructor: "Sensei Mary Njoroge",
      programs: ["Children's Classes", "Family Training", "Basic Karate", "Fitness Programs"],
      facilities: ["Modern training hall", "Children's area", "Parent viewing area", "Secure parking"],
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.752542069887!2d36.07007531475313!3d-0.30374299699745937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182851d2f5f5f5f5%3A0x5f5f5f5f5f5f5f5f!2sKenyatta%20Ave%2C%20Nakuru!5e0!3m2!1sen!2ske!4v1640000000000!5m2!1sen!2ske"
    },
    {
      name: "Western Region Center",
      city: "Kisumu",
      address: "Oginga Odinga Street, Near Kisumu Museum",
      phone: "+254 700 123 459",
      email: "kisumu@hdkikenya.org",
      schedule: [
        { day: "Tuesday", times: "6:00 PM - 8:00 PM" },
        { day: "Thursday", times: "6:00 PM - 8:00 PM" },
        { day: "Saturday", times: "10:00 AM - 12:00 PM" },
        { day: "Sunday", times: "2:00 PM - 4:00 PM" }
      ],
      instructor: "Sensei James Mwangi",
      programs: ["Regional Development", "Tournament Training", "Community Outreach", "Kumite Specialization"],
      facilities: ["Community hall dojo", "Outdoor space", "Lake view", "Public transport access"],
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3986.0064641684907!2d34.75963931475758!3d-0.09157839964089865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182aa470a58e8e8e%3A0x8e8e8e8e8e8e8e8e!2sOginga%20Odinga%20St%2C%20Kisumu!5e0!3m2!1sen!2ske!4v1640000000000!5m2!1sen!2ske"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-br from-black/70 to-black/50 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-light tracking-wide mb-6">
            Dojo Locations
          </h1>
          <p className="text-xl md:text-2xl font-light">
            Find a Training Center Near You
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-8">
            Training Centers Across Kenya
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            HDKI Kenya operates multiple training centers across the country, each offering authentic martial arts 
            instruction in welcoming, professionally equipped facilities. Our dojos serve as community hubs where 
            students of all ages and skill levels can pursue excellence in traditional karate.
          </p>
          <p className="text-lg text-gray-600">
            Each location is staffed by certified HDKI instructors and offers a full range of programs 
            from beginner classes to advanced competition training and our unique adventure programs.
          </p>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {locations.map((location, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="lg:flex">
                  {/* Map */}
                  <div className="lg:w-2/5">
                    <iframe
                      src={location.mapEmbed}
                      className="w-full h-64 lg:h-full"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Map for ${location.name}`}
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="lg:w-3/5 p-8">
                    <div className="mb-6">
                      <h3 className="text-3xl font-semibold text-gray-900 mb-2">{location.name}</h3>
                      <p className="text-xl text-hdki-red font-semibold mb-4">{location.city}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 text-hdki-red mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-gray-900">Address</p>
                            <p className="text-gray-600">{location.address}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Phone className="h-5 w-5 text-hdki-red mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-gray-900">Contact</p>
                            <p className="text-gray-600">{location.phone}</p>
                            <p className="text-gray-600">{location.email}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex items-center mb-3">
                          <Users className="h-5 w-5 text-hdki-red mr-2" />
                          <p className="font-semibold text-gray-900">Lead Instructor: {location.instructor}</p>
                        </div>
                      </div>
                    </div>

                    {/* Schedule */}
                    <div className="mb-6">
                      <div className="flex items-center mb-3">
                        <Clock className="h-5 w-5 text-hdki-red mr-2" />
                        <h4 className="font-semibold text-gray-900">Training Schedule</h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {location.schedule.map((session, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded">
                            <span className="font-medium text-gray-900">{session.day}</span>
                            <span className="text-gray-600 text-sm">{session.times}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Programs */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Available Programs</h4>
                      <div className="flex flex-wrap gap-2">
                        {location.programs.map((program, idx) => (
                          <span key={idx} className="bg-hdki-red text-white px-3 py-1 text-sm rounded">
                            {program}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Facilities */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Facilities</h4>
                      <ul className="grid grid-cols-2 gap-1">
                        {location.facilities.map((facility, idx) => (
                          <li key={idx} className="flex items-center text-gray-600 text-sm">
                            <div className="w-2 h-2 bg-hdki-red rounded-full mr-2" />
                            {facility}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href="/content/karate-adventures"
                        className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-3 text-center font-semibold transition-colors duration-300 inline-flex items-center justify-center group"
                      >
                        Join Adventure Programs
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <Link
                        href="/content/contact"
                        className="border-2 border-hdki-red text-hdki-red hover:bg-hdki-red hover:text-white px-6 py-3 text-center font-semibold transition-all duration-300"
                      >
                        Contact This Dojo
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-16">
            Getting Started
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-hdki-red rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Choose Your Location</h3>
              <p className="text-gray-600">
                Select the dojo most convenient for you. All locations offer the same high-quality 
                instruction and welcoming community atmosphere.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-hdki-red rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Contact the Dojo</h3>
              <p className="text-gray-600">
                Reach out to schedule a trial class or facility tour. Our instructors are happy 
                to answer questions and help you find the right program.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-hdki-red rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Begin Training</h3>
              <p className="text-gray-600">
                Start your martial arts journey with us. We provide all necessary equipment 
                for beginners and offer flexible class scheduling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transportation & Accessibility */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-12">
            Transportation & Accessibility
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Car className="h-6 w-6 text-hdki-red mr-3" />
                <h3 className="text-xl font-semibold">Getting There</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  All locations accessible by public transportation
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  Secure parking available at most facilities
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  Matatu and bus stops within walking distance
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  Ride-sharing services readily available
                </li>
              </ul>
            </div>
            
            <div>
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-hdki-red mr-3" />
                <h3 className="text-xl font-semibold">Accessibility Features</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  Wheelchair accessible entrances and facilities
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  Adaptive programs for students with special needs
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  Flexible scheduling for working professionals
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  Family-friendly programs and facilities
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-hdki-gray-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light mb-6">Visit Us Today</h2>
          <p className="text-xl mb-8 text-gray-300">
            Experience our welcoming community and world-class facilities. 
            Contact any of our locations to schedule your first visit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/content/contact"
              className="bg-hdki-red hover:bg-hdki-red-dark text-white px-8 py-4 text-lg font-semibold transition-colors duration-300"
            >
              Schedule a Visit
            </Link>
            <Link
              href="/content/karate-adventures"
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              Learn About Adventures
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
