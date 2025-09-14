import Layout from "@/components/Layout";
import Link from "next/link";
import { Calendar, MapPin, Users, Trophy, Clock, Star, ArrowRight, Ticket } from "lucide-react";

export default function Events() {
  const upcomingEvents = [
    {
      title: "Kenya National Karate Championship",
      date: "March 15-17, 2024",
      location: "Kenyatta International Conference Centre, Nairobi",
      type: "Tournament",
      category: "Major Event",
      description: "Annual national championship featuring competitors from across Kenya and East Africa. Open to all HDKI affiliated schools.",
      participants: "200+ Athletes",
      registrationDeadline: "February 28, 2024",
      fee: "KSh 2,500",
      highlights: ["Individual Kata Competition", "Team Kumite Events", "Youth Categories", "Awards Ceremony"],
      image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Coastal Adventure Camp",
      date: "April 5-12, 2024",
      location: "Diani Beach & Shimba Hills, Mombasa",
      type: "Adventure",
      category: "Karate Adventure",
      description: "7-day intensive training camp combining beach karate sessions with wildlife safari experiences in Shimba Hills National Reserve.",
      participants: "Limited to 25",
      registrationDeadline: "March 20, 2024",
      fee: "KSh 45,000 (All inclusive)",
      highlights: ["Beach training sessions", "Safari excursion", "Cultural immersion", "International instructors"],
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Women in Karate Seminar",
      date: "April 20, 2024",
      location: "HDKI Kenya Headquarters, Nairobi",
      type: "Seminar",
      category: "Special Program",
      description: "Empowerment seminar focusing on self-defense techniques, confidence building, and leadership development for women and girls.",
      participants: "50+ Participants",
      registrationDeadline: "April 15, 2024",
      fee: "KSh 1,500",
      highlights: ["Self-defense workshops", "Leadership training", "Guest speakers", "Networking opportunities"],
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Mount Kenya Training Expedition",
      date: "May 10-14, 2024",
      location: "Mount Kenya National Park",
      type: "Adventure",
      category: "Karate Adventure",
      description: "High-altitude training camp at the base of Mount Kenya, combining martial arts conditioning with mountain hiking and cultural experiences.",
      participants: "Limited to 20",
      registrationDeadline: "April 25, 2024",
      fee: "KSh 35,000 (All inclusive)",
      highlights: ["High-altitude conditioning", "Mountain hiking", "Traditional kata practice", "Local community visit"],
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "International HDKI Seminar",
      date: "June 8-9, 2024",
      location: "Various Locations, Nairobi",
      type: "Seminar",
      category: "International Event",
      description: "Two-day intensive seminar featuring master instructors from HDKI International, covering advanced techniques and traditional philosophy.",
      participants: "100+ International Attendees",
      registrationDeadline: "May 20, 2024",
      fee: "KSh 8,000",
      highlights: ["Master instructor sessions", "Advanced technique workshops", "Philosophy discussions", "International networking"],
      image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Maasai Mara Karate Safari",
      date: "July 15-21, 2024",
      location: "Maasai Mara National Reserve",
      type: "Adventure",
      category: "Karate Adventure",
      description: "Ultimate adventure combining wildlife safari with martial arts training in one of the world's most famous game reserves.",
      participants: "Limited to 30",
      registrationDeadline: "June 30, 2024",
      fee: "KSh 65,000 (All inclusive)",
      highlights: ["Big Five safari drives", "Bush camp training", "Maasai cultural exchange", "Photography workshops"],
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=600&auto=format&fit=crop"
    }
  ];

  const eventTypes = [
    {
      type: "Tournaments",
      icon: Trophy,
      description: "Competitive events for all skill levels, from local championships to international competitions.",
      color: "bg-yellow-500"
    },
    {
      type: "Karate Adventures",
      icon: MapPin,
      description: "Unique sports tourism experiences combining martial arts training with Kenya's natural wonders.",
      color: "bg-green-500"
    },
    {
      type: "Seminars & Workshops",
      icon: Star,
      description: "Educational events featuring guest instructors, specialized techniques, and philosophical discussions.",
      color: "bg-blue-500"
    },
    {
      type: "Community Events",
      icon: Users,
      description: "Local gatherings, demonstrations, and outreach programs connecting with the broader community.",
      color: "bg-purple-500"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Major Event": return "bg-yellow-500";
      case "Karate Adventure": return "bg-green-500";
      case "Special Program": return "bg-purple-500";
      case "International Event": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-br from-black/70 to-black/50 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-light tracking-wide mb-6">
            Events & Tournaments
          </h1>
          <p className="text-xl md:text-2xl font-light">
            Compete, Learn, and Adventure with HDKI Kenya
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-8">
            Year-Round Events & Adventures
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            HDKI Kenya hosts a diverse calendar of events throughout the year, from competitive tournaments 
            and educational seminars to our signature Karate Adventures that combine martial arts training 
            with Kenya's incredible tourism opportunities.
          </p>
          <p className="text-lg text-gray-600">
            Whether you're seeking competition, education, or adventure, our events provide opportunities 
            to grow as a martial artist while connecting with practitioners from around the world.
          </p>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-16">
            Types of Events
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {eventTypes.map((eventType, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-lg shadow-lg">
                <div className={`w-16 h-16 ${eventType.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <eventType.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{eventType.type}</h3>
                <p className="text-gray-600">{eventType.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-16">
            Upcoming Events
          </h2>
          
          <div className="space-y-8">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="lg:flex">
                  {/* Event Image */}
                  <div className="lg:w-1/3">
                    <div 
                      className="h-64 lg:h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${event.image})` }}
                    />
                  </div>
                  
                  {/* Event Details */}
                  <div className="lg:w-2/3 p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <span className={`${getCategoryColor(event.category)} text-white px-3 py-1 text-sm font-semibold rounded mr-3`}>
                            {event.category}
                          </span>
                          <span className="bg-gray-100 text-gray-700 px-3 py-1 text-sm font-semibold rounded">
                            {event.type}
                          </span>
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-hdki-red mr-3" />
                        <div>
                          <p className="font-semibold text-gray-900">Date</p>
                          <p className="text-gray-600">{event.date}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-hdki-red mr-3" />
                        <div>
                          <p className="font-semibold text-gray-900">Location</p>
                          <p className="text-gray-600">{event.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-hdki-red mr-3" />
                        <div>
                          <p className="font-semibold text-gray-900">Participants</p>
                          <p className="text-gray-600">{event.participants}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Ticket className="h-5 w-5 text-hdki-red mr-3" />
                        <div>
                          <p className="font-semibold text-gray-900">Registration Fee</p>
                          <p className="text-gray-600">{event.fee}</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-6">{event.description}</p>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Event Highlights:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {event.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center">
                            <Star className="h-4 w-4 text-hdki-red mr-2" />
                            <span className="text-gray-600 text-sm">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="text-sm">Registration closes: {event.registrationDeadline}</span>
                      </div>
                      
                      <div className="flex gap-3">
                        <Link
                          href="/content/contact"
                          className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-3 font-semibold transition-colors duration-300 inline-flex items-center group"
                        >
                          Register Now
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button className="border-2 border-hdki-red text-hdki-red hover:bg-hdki-red hover:text-white px-6 py-3 font-semibold transition-all duration-300">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Information */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-16">
            Registration Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-hdki-red">How to Register</h3>
              <ol className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-hdki-red text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">1</span>
                  <div>
                    <p className="font-semibold">Choose Your Event</p>
                    <p className="text-gray-600 text-sm">Browse our event calendar and select the events that interest you.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-hdki-red text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">2</span>
                  <div>
                    <p className="font-semibold">Contact Us</p>
                    <p className="text-gray-600 text-sm">Reach out via phone, email, or our contact form to register.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-hdki-red text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">3</span>
                  <div>
                    <p className="font-semibold">Complete Payment</p>
                    <p className="text-gray-600 text-sm">Secure your spot with payment confirmation before the deadline.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-hdki-red text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">4</span>
                  <div>
                    <p className="font-semibold">Prepare & Attend</p>
                    <p className="text-gray-600 text-sm">Receive detailed information and prepare for your event experience.</p>
                  </div>
                </li>
              </ol>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-hdki-red">Important Notes</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Early registration often includes discounts and better accommodation options</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Adventure programs include accommodation, meals, and transportation</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">All participants must have current insurance coverage</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Refund policies vary by event type and timing</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">International participants receive visa assistance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-hdki-gray-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light mb-6">Ready to Join Us?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Don't miss out on these incredible opportunities to grow as a martial artist 
            while experiencing the best of Kenya's culture and natural beauty.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/content/contact"
              className="bg-hdki-red hover:bg-hdki-red-dark text-white px-8 py-4 text-lg font-semibold transition-colors duration-300"
            >
              Register for Events
            </Link>
            <Link
              href="/content/karate-adventures"
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              Explore Adventures
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
