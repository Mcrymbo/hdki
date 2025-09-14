// Mock data types for HDKI Kenya backend-ready development

export interface Event {
    id: string;
    title: string;
    date: string;
    endDate?: string;
    location: string;
    type: "Tournament" | "Adventure" | "Seminar" | "Workshop" | "Cultural";
    category: "Major Event" | "Karate Adventure" | "Special Program" | "International Event" | "Community Event";
    description: string;
    fullContent: string;
    participants: string;
    registrationDeadline: string;
    fee: string;
    highlights: string[];
    image: string;
    gallery?: string[];
    instructor?: string;
    maxParticipants?: number;
    currentRegistrations?: number;
    status: "upcoming" | "ongoing" | "completed" | "cancelled";
    tags: string[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface NewsArticle {
    id: string;
    title: string;
    date: string;
    author: string;
    category: "Tournament Results" | "Program Launch" | "Adventure Report" | "Community Impact" | "International Exchange" | "Cultural Exchange" | "Achievement" | "Announcement";
    excerpt: string;
    content: string;
    image: string;
    gallery?: string[];
    featured: boolean;
    tags: string[];
    views: number;
    status: "published" | "draft" | "archived";
    createdAt: string;
    updatedAt: string;
  }
  
  export interface GalleryItem {
    id: string;
    title: string;
    category: "Training" | "Adventures" | "Competitions" | "Culture" | "Events";
    type: "image" | "video";
    url: string;
    thumbnail: string;
    description: string;
    date: string;
    photographer?: string;
    event?: string;
    tags: string[];
    featured: boolean;
    createdAt: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: "admin" | "instructor" | "student" | "member";
    status: "active" | "inactive" | "pending";
    avatar?: string;
    bio?: string;
    rank?: string;
    joinDate: string;
    lastLogin?: string;
    permissions: string[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface EventRegistration {
    id: string;
    eventId: string;
    userId?: string;
    name: string;
    email: string;
    phone: string;
    additionalNotes?: string;
    registrationDate: string;
    status: "confirmed" | "pending" | "cancelled";
    paymentStatus: "paid" | "pending" | "refunded";
  }
  
  // Mock Events Data
  export const mockEvents: Event[] = [
    {
      id: "event-1",
      title: "Kenya National Karate Championship",
      date: "2024-03-15",
      endDate: "2024-03-17",
      location: "Kenyatta International Conference Centre, Nairobi",
      type: "Tournament",
      category: "Major Event",
      description: "Annual national championship featuring competitors from across Kenya and East Africa. Open to all HDKI affiliated schools.",
      fullContent: `<div class="prose max-w-none">
        <h2>Kenya National Karate Championship 2024</h2>
        <p>Join us for the most prestigious karate tournament in East Africa. This three-day championship brings together the finest martial artists from Kenya and neighboring countries to compete in traditional Shotokan karate disciplines.</p>
        
        <h3>Competition Categories</h3>
        <ul>
          <li><strong>Individual Kata:</strong> Men's and Women's divisions across all belt levels</li>
          <li><strong>Team Kata:</strong> Three-person teams demonstrating synchronized forms</li>
          <li><strong>Individual Kumite:</strong> Sparring competitions in weight and age categories</li>
          <li><strong>Team Kumite:</strong> Five-person team competitions</li>
          <li><strong>Youth Categories:</strong> Special divisions for competitors under 18</li>
        </ul>
        
        <h3>Schedule</h3>
        <p><strong>Day 1 (March 15):</strong> Registration, weigh-ins, and opening ceremony</p>
        <p><strong>Day 2 (March 16):</strong> Individual competitions (Kata and Kumite preliminaries)</p>
        <p><strong>Day 3 (March 17):</strong> Team competitions and finals, awards ceremony</p>
        
        <h3>Prizes and Recognition</h3>
        <p>Winners will receive medals, certificates, and the opportunity to represent Kenya at international competitions. Top performers may be invited to join the national team training camps.</p>
        
        <h3>Requirements</h3>
        <ul>
          <li>Current HDKI or affiliated organization membership</li>
          <li>Minimum 6 months training experience</li>
          <li>Valid medical certificate (not older than 6 months)</li>
          <li>Appropriate karate gi and protective equipment</li>
        </ul>
      </div>`,
      participants: "200+ Athletes",
      registrationDeadline: "2024-02-28",
      fee: "KSh 2,500",
      highlights: ["Individual Kata Competition", "Team Kumite Events", "Youth Categories", "Awards Ceremony"],
      image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=600&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?q=80&w=800&auto=format&fit=crop"
      ],
      maxParticipants: 250,
      currentRegistrations: 187,
      status: "upcoming",
      tags: ["tournament", "national", "championship", "kata", "kumite"],
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-02-10T14:30:00Z"
    },
    {
      id: "event-2",
      title: "Coastal Adventure Camp",
      date: "2024-04-05",
      endDate: "2024-04-12",
      location: "Diani Beach & Shimba Hills, Mombasa",
      type: "Adventure",
      category: "Karate Adventure",
      description: "7-day intensive training camp combining beach karate sessions with wildlife safari experiences in Shimba Hills National Reserve.",
      fullContent: `<div class="prose max-w-none">
        <h2>Coastal Adventure Camp - The Ultimate Martial Arts Experience</h2>
        <p>Experience the perfect fusion of traditional karate training and Kenya's stunning coastal beauty. This unique 7-day program combines serious martial arts instruction with unforgettable safari adventures and cultural immersion.</p>
        
        <h3>Training Program</h3>
        <ul>
          <li><strong>Beach Training Sessions:</strong> Daily sunrise and sunset kata practice on pristine beaches</li>
          <li><strong>Traditional Dojo Work:</strong> Indoor sessions focusing on technical precision and kumite</li>
          <li><strong>Weapons Training:</strong> Introduction to traditional karate weapons in scenic outdoor settings</li>
          <li><strong>Meditation & Philosophy:</strong> Evening sessions on martial arts philosophy and meditation</li>
        </ul>
        
        <h3>Adventure Activities</h3>
        <ul>
          <li><strong>Shimba Hills Safari:</strong> Full-day wildlife viewing including elephants, leopards, and rare species</li>
          <li><strong>Dhow Sailing:</strong> Traditional sailing experience on the Indian Ocean</li>
          <li><strong>Coral Reef Snorkeling:</strong> Explore marine life in protected coral gardens</li>
          <li><strong>Cultural Village Visit:</strong> Authentic interaction with local Mijikenda communities</li>
        </ul>
        
        <h3>Accommodation & Meals</h3>
        <p>Stay in eco-friendly beachfront lodges with full board including traditional Swahili cuisine and fresh seafood. All dietary requirements can be accommodated with advance notice.</p>
        
        <h3>What's Included</h3>
        <ul>
          <li>7 nights accommodation</li>
          <li>All meals and refreshments</li>
          <li>Airport transfers from Nairobi</li>
          <li>All training equipment</li>
          <li>Safari and cultural activities</li>
          <li>Professional photography of your experience</li>
        </ul>
      </div>`,
      participants: "Limited to 25",
      registrationDeadline: "2024-03-20",
      fee: "KSh 45,000 (All inclusive)",
      highlights: ["Beach training sessions", "Safari excursion", "Cultural immersion", "International instructors"],
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=600&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800&auto=format&fit=crop"
      ],
      instructor: "Sensei Mustafa H. Ahmed",
      maxParticipants: 25,
      currentRegistrations: 18,
      status: "upcoming",
      tags: ["adventure", "beach", "safari", "cultural", "intensive"],
      createdAt: "2024-01-20T09:00:00Z",
      updatedAt: "2024-02-15T16:45:00Z"
    }
  ];
  
  // Mock News Data
  export const mockNews: NewsArticle[] = [
    {
      id: "news-1",
      title: "HDKI Kenya Wins Big at East Africa Championships",
      date: "2024-02-15",
      author: "HDKI Kenya Media Team",
      category: "Tournament Results",
      excerpt: "Our athletes dominated the recent East Africa Karate Championships, bringing home 15 medals including 8 gold across various categories.",
      content: `<div class="prose max-w-none">
        <h2>Historic Victory at East Africa Championships</h2>
        <p>In an outstanding display of skill and determination, HDKI Kenya's athletes secured their position as the premier martial arts organization in East Africa. The championships, held in Kampala, Uganda, saw over 300 competitors from six countries competing in traditional Shotokan karate disciplines.</p>
  
        <h3>Medal Breakdown</h3>
        <ul>
          <li><strong>Gold Medals (8):</strong> Individual Kata (3), Team Kata (1), Individual Kumite (3), Team Kumite (1)</li>
          <li><strong>Silver Medals (4):</strong> Individual Kata (2), Individual Kumite (2)</li>
          <li><strong>Bronze Medals (3):</strong> Individual Kata (1), Individual Kumite (2)</li>
        </ul>
  
        <h3>Outstanding Performers</h3>
        <p><strong>Sarah Wanjiku</strong> dominated the women's kata division, earning gold with a flawless performance of Empi kata. Her precision and power impressed judges and spectators alike.</p>
  
        <p><strong>James Mwangi</strong> showed exceptional technique in the men's kumite heavyweight division, defeating opponents from three different countries to claim gold.</p>
  
        <p>The <strong>HDKI Kenya Team Kata</strong> group, consisting of Peter Ombima, Grace Wanjiku, and David Kimani, delivered a synchronized performance of Sochin that earned perfect scores from all five judges.</p>
  
        <h3>Coach Comments</h3>
        <p>"This victory represents years of dedicated training and our commitment to excellence," said Head Coach Sensei Mustafa Ahmed. "Our athletes didn't just compete; they demonstrated the true spirit of karate - respect, discipline, and continuous improvement."</p>
  
        <h3>Looking Forward</h3>
        <p>These results have qualified several of our athletes for the African Continental Championships later this year. Training camps are already underway to prepare for this next challenge.</p>
      </div>`,
      image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=600&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop"
      ],
      featured: true,
      tags: ["tournament", "victory", "east-africa", "championship", "medals"],
      views: 1247,
      status: "published",
      createdAt: "2024-02-15T08:00:00Z",
      updatedAt: "2024-02-15T08:00:00Z"
    },
    {
      id: "news-2",
      title: "International Exchange: HDKI Kenya Trains in Dublin",
      date: "2024-02-12",
      author: "International Relations Team",
      category: "International Exchange",
      excerpt: "HDKI Kenya instructors and senior students completed a week-long exchange with HDKI dojos in Dublin, Ireland, focusing on advanced kata and teaching methodology.",
      content: `<div class="prose max-w-none">
        <h2>Deepening Ties with HDKI Ireland</h2>
        <p>Our delegation participated in joint seminars led by HDKI Ireland instructors, with special emphasis on Sochin, Kanku Dai, and teaching pedagogy for youth programs.</p>
        <h3>Cultural Highlights</h3>
        <ul>
          <li>City tours of historic Dublin and coastal training in Howth</li>
          <li>Community dinners that strengthened international bonds</li>
          <li>Planning for 2024–2025 return exchanges</li>
        </ul>
      </div>`,
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop",
      featured: false,
      tags: ["international", "exchange", "dublin", "seminar"],
      views: 642,
      status: "published",
      createdAt: "2024-02-12T09:00:00Z",
      updatedAt: "2024-02-12T09:00:00Z"
    },
    {
      id: "news-3",
      title: "Guest Instructors Tour Nairobi: Dojo Training & Giraffe Centre",
      date: "2024-02-01",
      author: "HDKI Kenya Media Team",
      category: "Cultural Exchange",
      excerpt: "We hosted guest instructors in Nairobi for a balanced program of dojo training, cultural museums, and a special visit to the Giraffe Centre.",
      content: `<div class="prose max-w-none">
        <h2>Karate Adventures in the City</h2>
        <p>Guests taught focused workshops on fundamentals and kumite strategy, followed by cultural immersion including the National Museum and the famous Giraffe Centre.</p>
        <h3>Program Outcomes</h3>
        <ul>
          <li>Technical exchange sessions with local black belts</li>
          <li>Community outreach with youth programs</li>
          <li>Planning future advanced seminars in Nairobi and Mombasa</li>
        </ul>
      </div>`,
      image: "https://images.unsplash.com/photo-1568495248636-6432b97bd949?q=80&w=1200&auto=format&fit=crop",
      featured: false,
      tags: ["guest-instructors", "nairobi", "giraffe-centre", "culture"],
      views: 533,
      status: "published",
      createdAt: "2024-02-01T10:00:00Z",
      updatedAt: "2024-02-01T10:00:00Z"
    }
  ];
  
  // Mock Gallery Data
  export const mockGalleryItems: GalleryItem[] = [
    {
      id: "gallery-1",
      title: "Beach Training Session",
      category: "Training",
      type: "image",
      url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=400&auto=format&fit=crop",
      description: "Morning kata practice on Diani Beach during our Coastal Adventure Camp",
      date: "2024-02-10",
      photographer: "Adventure Team HDKI Kenya",
      event: "Coastal Adventure Camp",
      tags: ["beach", "kata", "training", "sunrise"],
      featured: true,
      createdAt: "2024-02-10T06:30:00Z"
    },
    {
      id: "gallery-2",
      title: "Mount Kenya Expedition",
      category: "Adventures",
      type: "image",
      url: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200&auto=format&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=400&auto=format&fit=crop",
      description: "High-altitude training with Mount Kenya's peaks as backdrop",
      date: "2024-01-20",
      photographer: "Mountain Adventure Team",
      event: "Mount Kenya Training Expedition",
      tags: ["mountain", "training", "altitude", "landscape"],
      featured: true,
      createdAt: "2024-01-20T12:00:00Z"
    }
  ];
  
  // Mock Users Data
  export const mockUsers: User[] = [
    {
      id: "user-1",
      name: "Admin User",
      email: "admin@hdkikenya.org",
      phone: "+254 700 123 456",
      role: "admin",
      status: "active",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
      bio: "System administrator for HDKI Kenya website",
      joinDate: "2024-01-01",
      lastLogin: "2024-02-16T09:30:00Z",
      permissions: ["all"],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-02-16T09:30:00Z"
    },
    {
      id: "user-2",
      name: "Sensei Mustafa H. Ahmed",
      email: "mustafa@hdkikenya.org",
      phone: "+254 700 123 457",
      role: "instructor",
      status: "active",
      avatar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=150&auto=format&fit=crop",
      bio: "Chief Instructor & Director, 5th Dan Black Belt",
      rank: "5th Dan",
      joinDate: "2024-01-01",
      lastLogin: "2024-02-15T18:45:00Z",
      permissions: ["events", "news", "gallery"],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-02-15T18:45:00Z"
    }
  ];
  