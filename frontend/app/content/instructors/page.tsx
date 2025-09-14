import Layout from "@/components/Layout";
import Link from "next/link";
import { Award, Users, Globe, Star, ArrowRight } from "lucide-react";

export default function Instructors() {
  const instructors = [
    {
      name: "Sensei Mustafa H. Ahmed",
      rank: "5th Dan Black Belt",
      title: "Chief Instructor & Director",
      location: "Mombasa",
      specialties: ["Traditional Shotokan", "Competition Training", "Women's Self-Defense"],
      experience: "25+ years",
      bio: "Sensei Mustafa is a founding member of HDKI Kenya and serves as Vice President of KWF East & Central Africa. His dedication to traditional Shotokan values combined with innovative teaching methods has made him one of Kenya's most respected martial arts instructors.",
      achievements: [
        "Vice President, KWF East & Central Africa",
        "Certified HDKI International Instructor",
        "25+ years teaching experience",
        "Tournament champion and coach"
      ],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400&auto=format&fit=crop"
    },
    {
      name: "Sensei Peter Ombima",
      rank: "4th Dan Black Belt",
      title: "Senior Instructor",
      location: "Nairobi",
      specialties: ["Youth Development", "Kata Specialization", "Leadership Training"],
      experience: "18+ years",
      bio: "Leading the JKS Kenya branch, Sensei Peter brings exceptional technical knowledge and a passion for developing young martial artists. His innovative approach to teaching traditional forms has earned recognition throughout East Africa.",
      achievements: [
        "JKS Kenya Branch Leader",
        "Youth Development Specialist",
        "Regional Kata Champion",
        "Certified Referee and Judge"
      ],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
    },
    {
      name: "Sensei Grace Wanjiku",
      rank: "3rd Dan Black Belt",
      title: "Women's Program Director",
      location: "Nairobi",
      specialties: ["Women in Karate", "Self-Defense", "Youth Programs"],
      experience: "15+ years",
      bio: "Sensei Grace leads our groundbreaking Women in Karate program, empowering women and girls across Kenya through martial arts. Her commitment to inclusivity and community outreach has transformed countless lives.",
      achievements: [
        "Women in Karate Program Founder",
        "Community Outreach Champion",
        "Self-Defense Instructor Certification",
        "Youth Empowerment Advocate"
      ],
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=400&auto=format&fit=crop"
    },
    {
      name: "Sensei David Kimani",
      rank: "3rd Dan Black Belt",
      title: "Adventure Programs Coordinator",
      location: "Nairobi & Field Locations",
      specialties: ["Adventure Training", "Outdoor Martial Arts", "Cultural Integration"],
      experience: "12+ years",
      bio: "Sensei David pioneered our Karate Adventures program, combining his love for Kenya's natural beauty with traditional martial arts. His unique approach has attracted international students seeking authentic cultural experiences.",
      achievements: [
        "Karate Adventures Program Creator",
        "Safari Guide Certification",
        "Cultural Ambassador",
        "Adventure Tourism Specialist"
      ],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop"
    },
    {
      name: "Sensei Mary Njoroge",
      rank: "2nd Dan Black Belt",
      title: "Assistant Instructor",
      location: "Nakuru",
      specialties: ["Children's Programs", "Basic Training", "Competition Preparation"],
      experience: "8+ years",
      bio: "Sensei Mary specializes in working with children and beginners, creating a welcoming environment where students can build confidence while learning traditional martial arts values.",
      achievements: [
        "Children's Program Developer",
        "Regional Competition Coach",
        "First Aid Certified",
        "Youth Mentorship Leader"
      ],
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop"
    },
    {
      name: "Sensei James Mwangi",
      rank: "2nd Dan Black Belt",
      title: "Regional Coordinator",
      location: "Kisumu",
      specialties: ["Regional Development", "Kumite Training", "Tournament Organization"],
      experience: "10+ years",
      bio: "Sensei James oversees the expansion of HDKI Kenya into western regions, establishing new dojos and training programs while maintaining our high standards of instruction.",
      achievements: [
        "Regional Expansion Leader",
        "Tournament Director",
        "Kumite Specialist",
        "Community Builder"
      ],
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop"
    }
  ];

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
            Our Instructors
          </h1>
          <p className="text-xl md:text-2xl font-light">
            World-Class Masters Dedicated to Excellence
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-8">
            Excellence in Martial Arts Education
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            Our team of certified HDKI instructors brings decades of experience, international recognition, 
            and unwavering commitment to traditional martial arts values. Each instructor has been carefully 
            selected not only for their technical expertise but also for their ability to inspire and develop character.
          </p>
          <p className="text-lg text-gray-600">
            From youth development to advanced competition training, our instructors provide personalized guidance 
            that helps every student reach their full potential while preserving the authentic spirit of martial arts.
          </p>
        </div>
      </section>

      {/* Instructors Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {instructors.map((instructor, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div 
                      className="h-64 md:h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${instructor.image})` }}
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="mb-4">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">{instructor.name}</h3>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="bg-hdki-red text-white px-3 py-1 text-sm font-semibold rounded">
                          {instructor.rank}
                        </span>
                        <span className="text-hdki-red font-semibold">{instructor.title}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Globe className="h-4 w-4 mr-2" />
                        <span className="text-sm">{instructor.location}</span>
                        <Award className="h-4 w-4 ml-4 mr-2" />
                        <span className="text-sm">{instructor.experience}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                      {instructor.bio}
                    </p>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Specialties:</h4>
                      <div className="flex flex-wrap gap-2">
                        {instructor.specialties.map((specialty, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Achievements:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {instructor.achievements.slice(0, 3).map((achievement, idx) => (
                          <li key={idx} className="flex items-start">
                            <Star className="h-3 w-3 text-hdki-red mt-1 mr-2 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor Qualifications */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-16">
            Instructor Qualifications
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-hdki-red">Technical Requirements</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span>Minimum 2nd Dan black belt certification</span>
                </li>
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span>HDKI International instructor certification</span>
                </li>
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span>Ongoing continuing education requirements</span>
                </li>
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span>Competition and tournament experience</span>
                </li>
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span>First aid and safety certification</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-hdki-red">Character Development</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span>Commitment to traditional martial arts values</span>
                </li>
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span>Leadership and mentorship experience</span>
                </li>
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span>Cultural sensitivity and appreciation</span>
                </li>
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span>Community engagement and service</span>
                </li>
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span>Dedication to student development</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Training Approach */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-8">Our Training Approach</h2>
          
          <p className="text-xl text-gray-700 leading-relaxed mb-12">
            Our instructors employ a holistic teaching methodology that combines traditional martial arts techniques 
            with modern educational principles. Every student receives personalized attention and guidance tailored 
            to their individual goals and learning style.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-hdki-red rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Individual Focus</h3>
              <p className="text-gray-600">
                Each student's journey is unique, and our instructors provide personalized guidance 
                to help every practitioner reach their full potential.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-hdki-red rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Excellence Standards</h3>
              <p className="text-gray-600">
                We maintain the highest standards of technical precision and character development, 
                ensuring authentic martial arts education.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-hdki-red rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Cultural Integration</h3>
              <p className="text-gray-600">
                Our unique approach incorporates Kenya's rich culture and natural beauty 
                into the martial arts learning experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-hdki-gray-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light mb-6">Train with the Best</h2>
          <p className="text-xl mb-8 text-gray-300">
            Join our world-class instructors for an authentic martial arts experience that combines 
            traditional excellence with Kenya's unique adventure opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/content/karate-adventures"
              className="bg-hdki-red hover:bg-hdki-red-dark text-white px-8 py-4 text-lg font-semibold transition-colors duration-300 inline-flex items-center justify-center group"
            >
              Join Our Adventure Programs
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/content/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              Contact Our Instructors
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
