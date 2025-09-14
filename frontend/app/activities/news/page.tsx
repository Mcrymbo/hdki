import Layout from "@/components/Layout";
import Link from "next/link";
import { Calendar, User, Tag, ArrowRight, Trophy, Users, Globe } from "lucide-react";

export default function News() {
  const newsArticles = [
    {
      title: "HDKI Kenya Wins Big at East Africa Championships",
      date: "February 15, 2024",
      author: "HDKI Kenya Media Team",
      category: "Tournament Results",
      excerpt: "Our athletes dominated the recent East Africa Karate Championships, bringing home 15 medals including 8 gold across various categories.",
      content: "In an outstanding display of skill and determination, HDKI Kenya's athletes secured their position as the premier martial arts organization in East Africa. The championships, held in Kampala, Uganda, saw over 300 competitors from six countries...",
      image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=600&auto=format&fit=crop",
      featured: true
    },
    {
      title: "New Coastal Adventure Program Launches March 2024",
      date: "February 10, 2024",
      author: "Sensei David Kimani",
      category: "Program Launch",
      excerpt: "Introducing our revolutionary coastal training program that combines traditional karate with marine conservation activities along Kenya's beautiful coastline.",
      content: "HDKI Kenya is proud to announce the launch of our innovative Coastal Adventure Program, a first-of-its-kind initiative that merges martial arts training with environmental conservation...",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=600&auto=format&fit=crop",
      featured: false
    },
    {
      title: "Women in Karate Program Celebrates 100th Graduate",
      date: "February 5, 2024",
      author: "Sensei Grace Wanjiku",
      category: "Milestone Achievement",
      excerpt: "Our Women in Karate program reaches a significant milestone with its 100th graduate, highlighting the growing empowerment of women through martial arts.",
      content: "A momentous celebration took place at HDKI Kenya headquarters as we welcomed our 100th graduate from the Women in Karate program. This achievement represents more than just numbers...",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=600&auto=format&fit=crop",
      featured: false
    },
    {
      title: "International HDKI Masters Visit Kenya",
      date: "January 28, 2024",
      author: "HDKI Kenya Communications",
      category: "International Exchange",
      excerpt: "Distinguished masters from HDKI International conduct special seminars and training sessions across multiple locations in Kenya.",
      content: "HDKI Kenya had the honor of hosting three distinguished masters from HDKI International for a week-long series of seminars and training sessions. The visit included intensive workshops...",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600&auto=format&fit=crop",
      featured: false
    },
    {
      title: "Mount Kenya Expedition: Training at New Heights",
      date: "January 20, 2024",
      author: "Adventure Team HDKI Kenya",
      category: "Adventure Report",
      excerpt: "Participants in our Mount Kenya training expedition share their transformative experiences combining high-altitude conditioning with traditional martial arts.",
      content: "The January Mount Kenya expedition proved to be one of our most challenging and rewarding adventures yet. Twenty-five martial artists from around the world joined us for this unique high-altitude training experience...",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=600&auto=format&fit=crop",
      featured: false
    },
    {
      title: "Youth Development Program Expands to Rural Areas",
      date: "January 15, 2024",
      author: "Community Outreach Team",
      category: "Community Impact",
      excerpt: "HDKI Kenya brings martial arts training to underserved rural communities, promoting discipline, fitness, and leadership among young people.",
      content: "Our commitment to community development takes a significant step forward as we launch youth programs in three rural counties. These initiatives aim to provide young people with access to quality martial arts training...",
      image: "https://images.unsplash.com/photo-1546450840-8756ad7b3f43?q=80&w=600&auto=format&fit=crop",
      featured: false
    },
    {
      title: "HDKI Kenya Partners with Local Schools for PE Programs",
      date: "January 8, 2024",
      author: "Education Partnership Team",
      category: "Educational Initiative",
      excerpt: "New partnership brings certified martial arts instruction to physical education curricula in Nairobi and Mombasa schools.",
      content: "Education and martial arts come together in an innovative partnership that will see HDKI Kenya instructors provide certified karate training as part of physical education programs in select schools...",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop",
      featured: false
    },
    {
      title: "Cultural Exchange Program with Japan Announced",
      date: "December 28, 2023",
      author: "International Relations Team",
      category: "Cultural Exchange",
      excerpt: "HDKI Kenya announces exciting cultural exchange program with traditional dojos in Japan, offering authentic martial arts experiences.",
      content: "We are thrilled to announce a groundbreaking cultural exchange program with traditional karate dojos in Japan. This initiative will allow our most dedicated students to experience authentic Japanese martial arts culture...",
      image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?q=80&w=600&auto=format&fit=crop",
      featured: false
    }
  ];

  const categories = [
    { name: "All News", count: newsArticles.length },
    { name: "Tournament Results", count: newsArticles.filter(a => a.category === "Tournament Results").length },
    { name: "Program Launch", count: newsArticles.filter(a => a.category === "Program Launch").length },
    { name: "Adventure Report", count: newsArticles.filter(a => a.category === "Adventure Report").length },
    { name: "Community Impact", count: newsArticles.filter(a => a.category === "Community Impact").length }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Tournament Results": return Trophy;
      case "Community Impact": return Users;
      case "International Exchange": return Globe;
      case "Cultural Exchange": return Globe;
      default: return Tag;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Tournament Results": return "bg-yellow-500";
      case "Program Launch": return "bg-green-500";
      case "Adventure Report": return "bg-blue-500";
      case "Community Impact": return "bg-purple-500";
      case "International Exchange": return "bg-red-500";
      case "Cultural Exchange": return "bg-indigo-500";
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
            backgroundImage: "url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-light tracking-wide mb-6">
            News & Updates
          </h1>
          <p className="text-xl md:text-2xl font-light">
            Stay Connected with HDKI Kenya Community
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-8">
            Latest from Our Community
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            Stay up-to-date with the latest developments, achievements, and adventures from the HDKI Kenya community. 
            From tournament victories and new program launches to exciting adventure reports and community initiatives, 
            discover what's happening in Kenya's premier martial arts organization.
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className="bg-white hover:bg-hdki-red hover:text-white text-gray-700 px-6 py-3 rounded-lg border border-gray-200 transition-all duration-300 flex items-center"
              >
                <span className="font-semibold">{category.name}</span>
                <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 text-sm rounded">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {newsArticles.find(article => article.featured) && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-light text-center text-gray-900 mb-12">Featured Story</h2>
            
            {(() => {
              const featured = newsArticles.find(article => article.featured)!;
              const CategoryIcon = getCategoryIcon(featured.category);
              
              return (
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="lg:flex">
                    <div className="lg:w-1/2">
                      <div 
                        className="h-64 lg:h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${featured.image})` }}
                      />
                    </div>
                    <div className="lg:w-1/2 p-8">
                      <div className="flex items-center mb-4">
                        <span className={`${getCategoryColor(featured.category)} text-white px-3 py-1 text-sm font-semibold rounded mr-3 flex items-center`}>
                          <CategoryIcon className="h-4 w-4 mr-1" />
                          {featured.category}
                        </span>
                      </div>
                      
                      <h3 className="text-3xl font-semibold text-gray-900 mb-4">{featured.title}</h3>
                      
                      <div className="flex items-center text-gray-500 mb-4">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="mr-4">{featured.date}</span>
                        <User className="h-4 w-4 mr-2" />
                        <span>{featured.author}</span>
                      </div>
                      
                      <p className="text-gray-700 mb-6 leading-relaxed">{featured.excerpt}</p>
                      
                      <button className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-3 font-semibold transition-colors duration-300 inline-flex items-center group">
                        Read Full Story
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* Recent News Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-center text-gray-900 mb-12">Recent Updates</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.filter(article => !article.featured).map((article, index) => {
              const CategoryIcon = getCategoryIcon(article.category);
              
              return (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${article.image})` }}
                  />
                  
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className={`${getCategoryColor(article.category)} text-white px-2 py-1 text-xs font-semibold rounded flex items-center`}>
                        <CategoryIcon className="h-3 w-3 mr-1" />
                        {article.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">{article.title}</h3>
                    
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="mr-3">{article.date}</span>
                      <User className="h-4 w-4 mr-1" />
                      <span className="truncate">{article.author}</span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                    
                    <button className="text-hdki-red hover:text-hdki-red-dark font-semibold text-sm inline-flex items-center group">
                      Read More
                      <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-8">Stay Updated</h2>
          <p className="text-xl text-gray-700 mb-8">
            Subscribe to our newsletter to receive the latest news, event announcements, 
            and adventure opportunities directly in your inbox.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-hdki-red focus:border-transparent"
              />
              <button className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-3 font-semibold rounded-r-lg transition-colors duration-300">
                Subscribe
              </button>
            </div>
            <p className="text-gray-500 text-sm mt-2">
              We respect your privacy and never share your email address.
            </p>
          </div>
        </div>
      </section>

      {/* Social Media & Archives */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-6 text-hdki-red">Follow Us</h3>
              <p className="text-gray-600 mb-6">
                Connect with us on social media for daily updates, training tips, 
                and behind-the-scenes content from our adventures.
              </p>
              <div className="flex justify-center space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                  Facebook
                </button>
                <button className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors">
                  Instagram
                </button>
                <button className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors">
                  Twitter
                </button>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-6 text-hdki-red">News Archives</h3>
              <p className="text-gray-600 mb-6">
                Browse our complete archive of news articles, tournament results, 
                and adventure stories from previous years.
              </p>
              <button className="border-2 border-hdki-red text-hdki-red hover:bg-hdki-red hover:text-white px-6 py-3 font-semibold transition-all duration-300">
                View Archives
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-hdki-gray-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light mb-6">Be Part of Our Story</h2>
          <p className="text-xl mb-8 text-gray-300">
            Join the HDKI Kenya community and become part of the exciting developments, 
            achievements, and adventures that shape our martial arts journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/content/karate-adventures"
              className="bg-hdki-red hover:bg-hdki-red-dark text-white px-8 py-4 text-lg font-semibold transition-colors duration-300 inline-flex items-center justify-center group"
            >
              Join Our Adventures
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/content/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
