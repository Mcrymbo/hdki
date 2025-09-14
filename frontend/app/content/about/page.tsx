import Layout from "@/components/Layout";
import Link from "next/link";
import { Calendar, Users, Trophy, Target, Heart, Globe, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-br from-black/70 to-black/50 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-light tracking-wide mb-6">
            About HDKI Kenya
          </h1>
          <p className="text-xl md:text-2xl font-light">
            Preserving Tradition, Pioneering Adventure
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-16">Our Story</h2>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-xl leading-relaxed mb-8">
              HDKI Kenya represents the evolution of Kenya's rich martial arts heritage, building upon a foundation 
              established when karate was first introduced to the country on August 20, 1971. Four Japanese experts 
              arrived in Nairobi, brought by the Kenya Defense Forces and Japanese Overseas Cooperation Volunteers, 
              marking the beginning of a transformative journey.
            </p>
            
            <p className="text-lg leading-relaxed mb-8">
              As an official affiliate of <a href="https://hdki.org/" target="_blank" rel="noopener noreferrer" className="text-hdki-red hover:underline">HDKI International</a>, 
              we honor the traditional values of martial arts while pioneering innovative approaches to training and cultural exchange. 
              Our unique position allows us to combine serious martial arts education with Kenya's incredible natural beauty and tourism potential.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-16">Mission & Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-hdki-red rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To promote traditional martial arts excellence while showcasing Kenya's natural beauty and rich culture 
                through innovative sports tourism experiences that transform both body and spirit.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-hdki-red rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Our Values</h3>
              <ul className="text-gray-600 space-y-2 text-left">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-hdki-red rounded-full mr-3" />
                  Respect and humility
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-hdki-red rounded-full mr-3" />
                  Discipline and patience
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-hdki-red rounded-full mr-3" />
                  Cultural appreciation
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-hdki-red rounded-full mr-3" />
                  Leadership development
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-hdki-red rounded-full mr-3" />
                  Community engagement
                </li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-hdki-red rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become the world's leading destination for martial arts sports tourism, 
                creating transformative experiences that connect practitioners with Kenya's incredible 
                landscapes and vibrant culture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Training Philosophy */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-16">Training Philosophy</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 text-hdki-red">Kihon (Basics)</h3>
              <p className="text-gray-600">
                Fundamental techniques practiced with precision and power, 
                building the foundation for all advanced training.
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 text-hdki-red">Kata (Forms)</h3>
              <p className="text-gray-600">
                Traditional sequences that preserve ancient wisdom and 
                develop perfect technique, timing, and spiritual focus.
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 text-hdki-red">Kumite (Sparring)</h3>
              <p className="text-gray-600">
                Controlled combat practice that develops timing, distance, 
                and the practical application of martial arts principles.
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Our holistic approach encompasses physical, mental, and spiritual growth. We believe martial arts 
              training should develop not just fighting ability, but character, confidence, and leadership skills 
              that serve practitioners throughout their lives.
            </p>
          </div>
        </div>
      </section>

      {/* HDKI Affiliation */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-8">HDKI International Affiliation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                As an official affiliate of HDKI International, we are part of a global network of martial arts 
                schools committed to preserving traditional values while embracing innovation. This affiliation 
                ensures our training standards meet the highest international criteria.
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Trophy className="h-5 w-5 text-hdki-red mr-3" />
                  <span>Internationally recognized ranking system</span>
                </li>
                <li className="flex items-center">
                  <Users className="h-5 w-5 text-hdki-red mr-3" />
                  <span>Access to global seminars and events</span>
                </li>
                <li className="flex items-center">
                  <Globe className="h-5 w-5 text-hdki-red mr-3" />
                  <span>Connection to worldwide HDKI community</span>
                </li>
                <li className="flex items-center">
                  <Calendar className="h-5 w-5 text-hdki-red mr-3" />
                  <span>Ongoing instructor development programs</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-hdki-red border-2 border-hdki-red flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg tracking-tight leading-none">
                    HD<br />KI
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Global Network</h3>
                <p className="text-gray-600 mb-6">
                  Connect with HDKI schools worldwide and participate in international 
                  training camps, competitions, and cultural exchange programs.
                </p>
                <a 
                  href="https://hdki.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-hdki-red hover:underline font-semibold"
                >
                  Visit HDKI International →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Women in Karate Program */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-12">Women in Karate Program</h2>
          
          <div className="text-center mb-8">
            <p className="text-xl text-gray-700 leading-relaxed">
              HDKI Kenya is proud to continue the tradition of empowering women through martial arts. 
              Our dedicated "Women in Karate" program provides a supportive environment for women and girls 
              to develop confidence, self-defense skills, and leadership abilities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-hdki-red">Program Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span>Self-defense and personal safety training</span>
                </li>
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span>Confidence building and leadership development</span>
                </li>
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span>Physical fitness and mental wellness</span>
                </li>
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span>Supportive community of women practitioners</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-hdki-red">Special Programs</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span>Youth development programs for girls</span>
                </li>
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span>Women-only training sessions</span>
                </li>
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span>Female instructor development track</span>
                </li>
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span>Adventure camps designed for women</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-hdki-gray-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light mb-6">Ready to Begin Your Journey?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Join our community of martial artists and experience the unique combination of traditional training 
            and Kenya's incredible adventure opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/content/karate-adventures"
              className="bg-hdki-red hover:bg-hdki-red-dark text-white px-8 py-4 text-lg font-semibold transition-colors duration-300 inline-flex items-center justify-center group"
            >
              Explore Karate Adventures
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/content/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
