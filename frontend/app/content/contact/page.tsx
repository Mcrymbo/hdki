"use client";

import { useState } from "react";
import { useMutation } from '@apollo/client';
import { CREATE_CONTACT_MESSAGE } from '@/lib/graphql/mutations';
import Layout from "@/components/Layout";
import HeroSection from "@/components/ui/HeroSection";
import SectionHeading from "@/components/ui/SectionHeading";
import IconCircle from "@/components/ui/IconCircle";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import CTABand from "@/components/ui/CTABand";
import { useToast } from "@/components/admin/ui/Toast";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    interest: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [createContactMessage] = useMutation(CREATE_CONTACT_MESSAGE);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data } = await createContactMessage({
        variables: {
          name: formData.name,
          email: formData.email,
          message: `${formData.subject ? `Subject: ${formData.subject}\n\n` : ''}${formData.message}${formData.interest ? `\n\nInterest: ${formData.interest}` : ''}${formData.phone ? `\nPhone: ${formData.phone}` : ''}`
        }
      });

      if (data?.createContactMessage?.success) {
        toast("Thank you! Your message has been sent successfully. We'll get back to you soon.", "success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          interest: ""
        });
      } else {
        toast(data?.createContactMessage?.message || 'Failed to send message', "error");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send message. Please try again.';
      toast(message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin />,
      title: "Headquarters",
      details: [
        "Valley Road, Upper Hill",
        "Nairobi, Kenya",
        "P.O. Box 12345-00100"
      ]
    },
    {
      icon: <Phone />,
      title: "Phone Numbers",
      details: [
        "+254 700 123 456 (Main)",
        "+254 700 123 457 (Mombasa)",
        "+254 700 123 458 (Nakuru)"
      ]
    },
    {
      icon: <Mail />,
      title: "Email Addresses",
      details: [
        "info@hdkikenya.org",
        "adventures@hdkikenya.org",
        "events@hdkikenya.org"
      ]
    },
    {
      icon: <Clock />,
      title: "Office Hours",
      details: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 9:00 AM - 2:00 PM",
        "Sunday: Closed"
      ]
    }
  ];

  return (
    <Layout>
      <HeroSection
        image="https://images.unsplash.com/photo-1603210185246-b1662978ea37?q=80&w=2000&auto=format&fit=crop"
        eyebrow="Get In Touch"
        title="Contact Us"
        subtitle="Start Your Martial Arts Journey Today"
        height="sm"
      />

      {/* Contact Information */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Reach Out" title="Get in Touch" />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, i) => (
              <Reveal key={info.title} delay={i * 0.1} className="text-center">
                <IconCircle icon={info.icon} size="lg" className="mx-auto mb-5" />
                <h3 className="mb-3 font-display text-lg font-medium text-hdki-ink">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail) => (
                    <p key={detail} className="text-sm text-hdki-gray-mid">{detail}</p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="bg-hdki-gray-light py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* Contact Form */}
            <Reveal direction="right">
              <div className="rounded-sm border border-hdki-border bg-white p-8">
                <h3 className="mb-8 font-display text-2xl font-medium text-hdki-ink">Send Us a Message</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Input
                      label="Full Name *"
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your full name"
                    />
                    <Input
                      label="Email Address *"
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Input
                      label="Phone Number"
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+254 xxx xxx xxx"
                    />
                    <div>
                      <label htmlFor="interest" className="mb-1.5 block text-sm font-medium text-hdki-ink">
                        I&apos;m Interested In
                      </label>
                      <select
                        id="interest"
                        name="interest"
                        value={formData.interest}
                        onChange={handleInputChange}
                        className="block w-full rounded-sm border border-hdki-border px-3 py-2.5 text-sm text-hdki-ink transition-colors focus:border-hdki-red focus:outline-none focus:ring-2 focus:ring-hdki-red/20"
                      >
                        <option value="">Select an option</option>
                        <option value="classes">Regular Classes</option>
                        <option value="adventures">Karate Adventures</option>
                        <option value="events">Events & Tournaments</option>
                        <option value="women-program">Women in Karate</option>
                        <option value="youth-program">Youth Programs</option>
                        <option value="instructor-training">Instructor Training</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <Input
                    label="Subject *"
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="Brief subject of your message"
                  />

                  <Textarea
                    label="Message *"
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    placeholder="Tell us about your martial arts goals, questions, or how we can help you..."
                  />

                  <Button type="submit" variant="primary" size="lg" loading={isSubmitting} icon={!isSubmitting ? <Send /> : undefined} className="w-full">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </Reveal>

            {/* Map */}
            <Reveal direction="left">
              <div className="overflow-hidden rounded-sm border border-hdki-border bg-white">
                <div className="bg-hdki-red p-6 text-white">
                  <h3 className="mb-2 font-display text-xl font-medium">Visit Our Headquarters</h3>
                  <p className="text-red-100">
                    Located in the heart of Nairobi, our headquarters welcomes visitors and offers trial classes for
                    new students.
                  </p>
                </div>

                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.800592892978!2d36.79493731475393!3d-1.2884573990614468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f11242c8c72d1%3A0x7e58e21b5e40fc26!2sValley%20Rd%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1640000000000!5m2!1sen!2ske"
                  className="h-96 w-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="HDKI Kenya Headquarters Location"
                />

                <div className="p-6">
                  <h4 className="mb-3 font-medium text-hdki-ink">Getting Here</h4>
                  <ul className="space-y-2 text-hdki-gray-mid">
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-hdki-red" />
                      <span>5 minutes walk from Valley Road bus stop</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-hdki-red" />
                      <span>Parking available on-site</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-hdki-red" />
                      <span>Accessible by matatu and taxi</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" />

          <div className="space-y-6">
            {[
              {
                q: "How do I get started with HDKI Kenya?",
                a: "Getting started is easy! Contact us to schedule a trial class at any of our locations. We provide all necessary equipment for beginners and offer programs for all ages and skill levels.",
              },
              {
                q: "What makes Karate Adventures unique?",
                a: "Our Karate Adventures combine serious martial arts training with Kenya's incredible tourism opportunities. It's the world's first martial arts sports tourism program, offering training in scenic locations with cultural immersion and adventure activities.",
              },
              {
                q: "Do you offer programs for beginners?",
                a: "Absolutely! We welcome complete beginners and have specialized programs designed for those new to martial arts. Our instructors provide patient, comprehensive instruction to help you build a strong foundation.",
              },
              {
                q: "What is the Women in Karate program?",
                a: "Our Women in Karate program is designed specifically to empower women and girls through martial arts. It focuses on self-defense, confidence building, leadership development, and creating a supportive community of female practitioners.",
              },
              {
                q: "How can international students participate?",
                a: "We welcome international students for both regular training and our adventure programs. We can assist with visa requirements, accommodation recommendations, and provide cultural orientation to help make your experience in Kenya memorable and enriching.",
              },
            ].map((faq, i) => (
              <Reveal key={faq.q} delay={i * 0.05} className="border-b border-hdki-border pb-6 last:border-b-0">
                <h3 className="mb-2 font-display text-lg font-medium text-hdki-ink">{faq.q}</h3>
                <p className="text-hdki-gray-mid">{faq.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Get Started"
        title="Ready to Begin Your Journey?"
        subtitle="Take the first step toward martial arts excellence and adventure. Contact us today to learn more about our programs and schedule your visit."
        primaryCta={{ label: "Explore Adventures", href: "/adventures" }}
        secondaryCta={{ label: "Find a Dojo Near You", href: "/dojos" }}
      />
    </Layout>
  );
}
