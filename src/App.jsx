import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Camera, Heart, Award, Users, Play, Mail, Phone, MapPin, 
  Instagram, Facebook, ChevronRight, Star, X, Menu, Video, 
  BookOpen, CheckCircle, Clock, Calendar, ArrowRight, 
  Zap, Shield, CameraOff, Film, Image as ImageIcon,
  MessageCircle, Download, Share2, Filter, Grid, List,
  Sparkles, RotateCcw, Globe, Youtube, Twitter,
  Linkedin, ArrowUp, UserCheck, TrendingUp, Cloud,
  Battery, Headphones, Smartphone, Tablet, Laptop
} from 'lucide-react';

// Import GSAP for advanced animations
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const WeddingMitraWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    weddingDate: '',
    budget: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [bookedDates, setBookedDates] = useState([]);
  const [stats, setStats] = useState({ weddings: 0, cities: 0, years: 0, couples: 0 });

  // Refs for GSAP animations
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const portfolioRef = useRef(null);
  const testimonialsRef = useRef(null);

  // Initialize animations
  useEffect(() => {
    // Initialize counter animations
    const finalStats = {
      weddings: 1250,
      cities: 68,
      years: 12,
      couples: 100
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: statsRef.current,
        start: "top 80%",
        once: true
      }
    });

    tl.to({ weddings: 0 }, {
      weddings: finalStats.weddings,
      duration: 2,
      ease: "power2.out",
      onUpdate: function() {
        setStats(prev => ({ ...prev, weddings: Math.floor(this.targets()[0].weddings) }));
      }
    })
    .to({ cities: 0 }, {
      cities: finalStats.cities,
      duration: 2,
      ease: "power2.out",
      onUpdate: function() {
        setStats(prev => ({ ...prev, cities: Math.floor(this.targets()[0].cities) }));
      }
    }, "-=1.5")
    .to({ years: 0 }, {
      years: finalStats.years,
      duration: 2,
      ease: "power2.out",
      onUpdate: function() {
        setStats(prev => ({ ...prev, years: Math.floor(this.targets()[0].years) }));
      }
    }, "-=1.5")
    .to({ couples: 0 }, {
      couples: finalStats.couples,
      duration: 2,
      ease: "power2.out",
      onUpdate: function() {
        setStats(prev => ({ ...prev, couples: Math.floor(this.targets()[0].couples) }));
      }
    }, "-=1.5");

    // Portfolio animation (safe)
    try {
      const items = document.querySelectorAll(".portfolio-item");
      if (items.length > 0 && portfolioRef.current) {
        gsap.from(items, {
          scrollTrigger: {
            trigger: portfolioRef.current,
            start: "top 85%",
            invalidateOnRefresh: true
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)"
        });
      }
    } catch (e) {
      console.warn("GSAP portfolio animation failed:", e);
    }

    // Testimonials animation (safe)
    try {
      const tItems = document.querySelectorAll(".testimonial-card");
      if (tItems.length > 0 && testimonialsRef.current) {
        gsap.from(tItems, {
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 85%",
            invalidateOnRefresh: true
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out"
        });
      }
    } catch (e) { console.warn("GSAP testimonials animation failed:", e); }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll
      const sections = ['home', 'about', 'portfolio', 'services', 'packages', 'testimonials', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const heroSlides = [
    {
      title: "Where Every Frame Tells Your Love Story",
      subtitle: "Award-Winning Wedding Photography & Cinematography Across India",
      gradient: "linear-gradient(135deg, rgba(225, 29, 72, 0.9) 0%, rgba(190, 24, 93, 0.9) 100%)",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1920"
    },
    {
      title: "Artistic Excellence in Wedding Photography",
      subtitle: "Professional Team Capturing Your Most Precious Moments",
      gradient: "linear-gradient(135deg, rgba(168, 85, 247, 0.9) 0%, rgba(139, 92, 246, 0.9) 100%)",
      image: "https://f5blog.co.uk/wp-content/uploads/2022/01/0021-indian-wedding-hampton-court-palace-photography.jpg"
    },
    {
      title: "Crafting Timeless Wedding Memories",
      subtitle: "From Candid Moments to Grand Celebrations",
      gradient: "linear-gradient(135deg, rgba(251, 146, 60, 0.9) 0%, rgba(234, 88, 12, 0.9) 100%)",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1920"
    }
  ];

  const portfolioCategories = [
    { id: 'all', name: 'All Work' },
    { id: 'wedding', name: 'Wedding', icon: <Heart className="w-4 h-4" /> },
    { id: 'pre-wedding', name: 'Pre-Wedding', icon: <Camera className="w-4 h-4" /> },
    { id: 'candid', name: 'Candid', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'traditional', name: 'Traditional', icon: <Award className="w-4 h-4" /> },
    { id: 'destination', name: 'Destination', icon: <Globe className="w-4 h-4" /> }
  ];

  const portfolioGallery = [
    { 
      id: 1, 
      category: 'wedding', 
      title: 'Royal Palace Wedding', 
      location: 'Udaipur City Palace',
      views: '2.4k',
      likes: '348',
      image: 'https://f5blog.co.uk/wp-content/uploads/2022/01/0021-indian-wedding-hampton-court-palace-photography.jpg'
    },
    { 
      id: 2, 
      category: 'pre-wedding', 
      title: 'Kashmir Love Story', 
      location: 'Dal Lake, Srinagar',
      views: '1.8k',
      likes: '256',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE4fKx7aZhkuWYqU73hOvMPbXa47ThHXyoPQ&s'
    },
    { 
      id: 3, 
      category: 'candid', 
      title: 'Beachside Romance', 
      location: 'Goa Beach Resort',
      views: '3.2k',
      likes: '421',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwStVgKpH5famCP4QhxDV8IRsA-z4Nu9Pv7w&s'
    },
    { 
      id: 4, 
      category: 'traditional', 
      title: 'Traditional Ceremony', 
      location: 'Mumbai Grand Hotel',
      views: '1.5k',
      likes: '198',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHy0cIcfY0-QzTyheSaZeMHgiI09KdZy-Lnw&s'
    },
    { 
      id: 5, 
      category: 'destination', 
      title: 'Himalayan Wedding', 
      location: 'Manali Hills',
      views: '2.1k',
      likes: '312',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbmnCn3UQwvsBtZETVg8xyy9q1dz-T1PA1Qg&s'
    },
    // { 
    //   id: 6, 
    //   category: 'pre-wedding', 
    //   title: 'Urban Love Story', 
    //   location: 'New Delhi',
    //   views: '1.9k',
    //   likes: '267',
    //   image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=1200'
    // },
    // { 
    //   id: 7, 
    //   category: 'candid', 
    //   title: 'Garden Celebration', 
    //   location: 'Bangalore',
    //   views: '2.3k',
    //   likes: '334',
    //   image: 'https://images.pexels.com/photos/855362/pexels-photo-855362.jpeg?auto=compress&cs=tinysrgb&w=1200'
    // },
    // { 
    //   id: 8, 
    //   category: 'wedding', 
    //   title: 'Luxury Resort Wedding', 
    //   location: 'Jaipur',
    //   views: '2.8k',
    //   likes: '389',
    //   image: 'https://images.unsplash.com/photo-1504328344115-45e1212c9b73?auto=format&fit=crop&w=1200'
    // },
    // { 
    //   id: 9, 
    //   category: 'destination', 
    //   title: 'Beach Wedding', 
    //   location: 'Andaman Islands',
    //   views: '3.5k',
    //   likes: '456',
    //   image: 'https://images.pexels.com/photos/210759/pexels-photo-210759.jpeg?auto=compress&cs=tinysrgb&w=1200'
    // }
  ];

  const services = [
    {
      icon: <Camera className="w-14 h-14" />,
      title: "Wedding Photography",
      description: "Complete wedding day coverage with artistic photography capturing every emotion and detail.",
      features: ["Candid & Traditional", "Multiple Photographers", "All-Day Coverage", "Premium Editing"],
      color: "from-rose-500 to-pink-600",
      stats: "800+ Weddings"
    },
    {
      icon: <Film className="w-14 h-14" />,
      title: "Cinematic Films",
      description: "Hollywood-style wedding films with professional cinematography and emotional storytelling.",
      features: ["4K Quality", "Drone Footage", "Same Day Edit", "Feature Films"],
      color: "from-purple-500 to-indigo-600",
      stats: "500+ Films"
    },
    {
      icon: <Heart className="w-14 h-14" />,
      title: "Pre-Wedding Shoots",
      description: "Creative photoshoots at stunning locations to beautifully capture your love story.",
      features: ["Location Scouting", "Concept Planning", "Wardrobe Styling", "Multiple Locations"],
      color: "from-amber-500 to-orange-600",
      stats: "1200+ Shoots"
    },
    {
      icon: <BookOpen className="w-14 h-14" />,
      title: "Premium Albums",
      description: "Luxury handcrafted albums and photo books designed to preserve your memories forever.",
      features: ["Italian Leather", "Custom Designs", "Archival Quality", "Worldwide Delivery"],
      color: "from-emerald-500 to-teal-600",
      stats: "3000+ Albums"
    }
  ];

  const packages = [
    {
      name: "Essentials",
      price: "₹85,000",
      duration: "8 Hours Coverage",
      tagline: "Perfect for intimate weddings",
      features: [
        { text: "1 Lead Photographer", included: true },
        { text: "300+ Edited Photos", included: true },
        { text: "Online Gallery", included: true },
        { text: "Basic Photo Album", included: true },
        { text: "Cinematographer", included: false },
        { text: "Drone Coverage", included: false },
        { text: "Same Day Edit", included: false },
        { text: "Premium Album", included: false }
      ],
      popular: false
    },
    {
      name: "Premium",
      price: "₹1,75,000",
      duration: "2 Days Coverage",
      tagline: "Most Popular Choice",
      features: [
        { text: "2 Lead Photographers", included: true },
        { text: "1 Senior Cinematographer", included: true },
        { text: "800+ Edited Photos", included: true },
        { text: "3-5 Min Highlight Film", included: true },
        { text: "Drone Coverage", included: true },
        { text: "Premium Photo Album", included: true },
        { text: "Same Day Edit", included: true },
        { text: "Pre-Wedding Shoot", included: false }
      ],
      popular: true
    },
    {
      name: "Luxury",
      price: "₹3,50,000",
      duration: "Complete Coverage",
      tagline: "Ultimate wedding experience",
      features: [
        { text: "3 Lead Photographers", included: true },
        { text: "2 Cinematographers", included: true },
        { text: "Unlimited Photos", included: true },
        { text: "10-15 Min Feature Film", included: true },
        { text: "Advanced Drone + Crane", included: true },
        { text: "Luxury Album Collection", included: true },
        { text: "Same Day Edit + Trailer", included: true },
        { text: "Pre-Wedding Shoot", included: true }
      ],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Priya & Rahul Sharma",
      location: "Mumbai • December 2024",
      rating: 5,
      text: "The Wedding Mitra team captured our wedding beautifully! Their attention to detail and ability to capture genuine emotions was incredible. The photos and film bring back all the beautiful memories every time we see them.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150",
      weddingType: "Destination Wedding",
      videoTestimonial: true
    },
    {
      name: "Sneha & Arjun Patel",
      location: "Udaipur • November 2024",
      rating: 5,
      text: "From the pre-wedding shoot to the wedding day, the team was professional, creative, and made us feel completely comfortable. The cinematic film they created left our entire family in tears - in the best way possible!",
      avatar: "https://f5blog.co.uk/wp-content/uploads/2022/01/0021-indian-wedding-hampton-court-palace-photography.jpg",
      weddingType: "Royal Palace Wedding",
      videoTestimonial: true
    },
    {
      name: "Anjali & Vikram Singh",
      location: "Jaipur • October 2024",
      rating: 5,
      text: "Absolutely worth every penny! The team worked tirelessly for two days straight and delivered beyond our expectations. The albums are stunning - our parents can't stop showing them to everyone!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150",
      weddingType: "Traditional Ceremony",
      videoTestimonial: false
    }
  ];

  const featuredVideos = [
    { id: 1, title: "Royal Udaipur Wedding", duration: "3:45", views: "45K" },
    { id: 2, title: "Beach Wedding Goa", duration: "4:20", views: "38K" },
    { id: 3, title: "Traditional Punjabi Wedding", duration: "5:15", views: "52K" },
    { id: 4, title: "Destination Wedding Manali", duration: "4:50", views: "41K" }
  ];

  const equipmentList = [
    { name: "Canon EOS R5", type: "Mirrorless Camera", specs: "45MP, 8K Video" },
    { name: "Sony A7IV", type: "Full Frame Camera", specs: "33MP, 4K 60fps" },
    { name: "DJI Mavic 3 Pro", type: "Drone", specs: "4/3 CMOS, 46 mins" },
    { name: "Profoto B10 Plus", type: "Studio Light", specs: "500Ws, TTL" },
    { name: "Sigma Art Lenses", type: "Lens Collection", specs: "14mm to 85mm" }
  ];

  const filteredPortfolio = useMemo(() => {
    return activeFilter === 'all' ? portfolioGallery : portfolioGallery.filter(item => item.category === activeFilter);
  }, [activeFilter, portfolioGallery]);

  // Refresh GSAP / ScrollTrigger when portfolio items change so animations are reliable when navigating/reloading
  useEffect(() => {
    const refreshPortfolioAnimation = () => {
      try { ScrollTrigger.refresh(); } catch (e) { /* ignore */ }
      try {
        const items = document.querySelectorAll(".portfolio-item");
        if (items.length > 0 && portfolioRef.current) {
          gsap.fromTo(items, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power2.out", scrollTrigger: { trigger: portfolioRef.current, start: "top 90%", invalidateOnRefresh: true } });
        }
      } catch (e) { console.warn("refreshPortfolioAnimation error:", e); }
    };

    refreshPortfolioAnimation();
    window.addEventListener('resize', refreshPortfolioAnimation);
    return () => window.removeEventListener('resize', refreshPortfolioAnimation);
  }, [filteredPortfolio]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In real app, send data to backend
    console.log('Form submitted:', formData);
    setIsLoading(false);
    
    // Show success message
    alert('Thank you! We\'ll contact you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      weddingDate: '',
      budget: '',
      message: ''
    });
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const openLightbox = (item) => {
    setSelectedImage(item);
    setLightboxOpen(true);
    
    // GSAP animation for lightbox
    gsap.fromTo(".lightbox-content",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    );
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="w-16 h-16 bg-black to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <img
                      src="https://image2url.com/r2/default/images/1768410250290-a659b880-b146-45d9-88e7-a1021db4125d.jpg"
                      alt="Pro Equipment"
                      className="w-16 h-16 object-cover"
                    />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  Wedding Mitra
                </h1>
                <p className="text-xs text-gray-600">Photography & Cinematography</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {['Home', 'About', 'Portfolio', 'Services', 'Packages', 'Testimonials', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative font-medium transition-all duration-300"
                >
                  <span className={`inline-block px-3 py-2 rounded-full transition-all text-md leading-none bg-gradient-to-r from-purple-400 to-pink-600 ${
                    activeSection === item.toLowerCase()
                      ? 'bg-gradient-to-r from-red-600 to-green-400 shadow-lg text-white text-bold'
                      : (scrolled ? 'bg-white text-white hover:shadow-md hover:text-black' : 'bg-white/10 text-white hover:bg-white/20')
                  }`}>
                    {item}
                  </span>

                  {activeSection === item.toLowerCase() && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-rose-500 to-pink-500"></span>
                  )}
                </a>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <a href="tel:+919876543210" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-full hover:shadow-lg transition-all hover:scale-105">
                <Phone className="w-4 h-4" />
                <span className="font-semibold">Book Now</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden ${scrolled ? 'text-gray-900' : 'text-white'}`}
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-xl rounded-b-2xl animate-slideDown">
              <div className="p-4 space-y-3">
                {['Home', 'About', 'Portfolio', 'Services', 'Packages', 'Testimonials', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-3 px-4 rounded-lg font-medium ${
                      activeSection === item.toLowerCase() 
                        ? 'bg-gradient-to-r from-rose-50 to-pink-50 text-rose-600' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item}
                  </a>
                ))}
                <a href="tel:+919876543210" className="block py-3 px-4 rounded-lg bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold text-center">
                  <Phone className="inline w-4 h-4 mr-2" />
                  Call to Book
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Slides */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div 
              className="absolute inset-0"
              style={{ background: slide.gradient, mixBlendMode: 'multiply' }}
            />
          </div>
        ))}

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.5 + 0.1
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="animate-fadeIn">
            {/* Badge */}
            {/* <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-8">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Award Winning Photography Studio</span>
            </div> */}

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 mt-20 leading-tight">
              <span className="block bg-gradient-to-r from-white via-rose-100 to-pink-100 bg-clip-text text-transparent">
                {heroSlides[currentSlide].title}
              </span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              {heroSlides[currentSlide].subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#portfolio" 
                className="group bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 text-white px-10 py-5 rounded-full font-semibold hover:shadow-2xl transition-all transform hover:scale-105 hover:shadow-rose-500/30 flex items-center justify-center gap-3 text-lg animate-pulse-glow"
              >
                <span>View Our Portfolio</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <button 
                onClick={() => setVideoModalOpen(true)}
                className="group bg-transparent border-2 border-white text-white px-10 py-5 rounded-full font-semibold hover:bg-white hover:text-rose-600 transition-all transform hover:scale-105 flex items-center justify-center gap-3 text-lg"
              >
                <Play className="w-5 h-5" />
                <span>Watch Showreel</span>
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
              {[
                { icon: <Award />, label: '15+ Awards' },
                { icon: <Globe />, label: 'Pan India' },
                { icon: <Camera />, label: 'Pro Gear' },
                { icon: <Shield />, label: 'Guaranteed' }
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-2 text-white">
                    {stat.icon}
                  </div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-3 mt-12">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all ${
                  currentSlide === index ? 'w-10 bg-white shadow-lg' : 'w-3 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-white rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-600/10 to-pink-600/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(225,29,72,0.1),transparent_50%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { number: stats.weddings, label: 'Weddings Captured', suffix: '+' },
              { number: stats.cities, label: 'Cities Covered', suffix: '+' },
              { number: stats.years, label: 'Years Experience', suffix: '+' },
              { number: stats.couples, label: 'Happy Couples', suffix: '%' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-white to-rose-200 bg-clip-text text-transparent">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-white/80 text-sm md:text-base font-medium">{stat.label}</div>
                <div className="h-0.5 w-20 mx-auto mt-4 bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              {/* Image Stack Effect */}
              <div className="relative z-10">
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200">
                    <img
                      src="https://i.pinimg.com/originals/89/25/88/89258871619917b1b035587e34519ec6.jpg"
                      alt="Pro Equipment"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl -z-10 transform rotate-6"></div>
                <div className="absolute -top-6 -left-6 w-48 h-48 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl -z-10 transform -rotate-12"></div>
              </div>

              {/* Equipment Badge */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                  <img src="https://images.pexels.com/photos/31729520/pexels-photo-31729520/free-photo-of-romantic-couple-strolling-by-the-seaside.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Pro Equipment" className="w-6 h-6 rounded-lg absolute -bottom-1 -right-1 border-2 border-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Pro Equipment</div>
                  <div className="text-xs text-gray-600">Latest Gear Used</div>
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">About Wedding Mitra</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                We Transform <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Moments</span> Into <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Memories</span>
              </h2>
              
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                With over 12 years of expertise, Wedding Mitra has established itself as one of India's premier wedding photography studios. We've captured more than 1,250 weddings across 68+ cities, preserving love stories with artistic excellence.
              </p>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our team of award-winning photographers and cinematographers combines technical mastery with creative vision. We believe in capturing not just events, but emotions - creating timeless imagery that tells your unique love story.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { icon: <Award className="w-7 h-7" />, title: 'Award Winning', desc: '15+ National Awards' },
                  { icon: <Users className="w-7 h-7" />, title: 'Expert Team', desc: '25+ Professionals' },
                  { icon: <Zap className="w-7 h-7" />, title: 'Fast Delivery', desc: 'Photos in 15 Days' },
                  { icon: <Shield className="w-7 h-7" />, title: 'Quality Guarantee', desc: '100% Satisfaction' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white hover:shadow-lg transition-shadow">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${idx === 0 ? 'from-rose-500 to-pink-600' : idx === 1 ? 'from-purple-500 to-indigo-600' : idx === 2 ? 'from-amber-500 to-orange-600' : 'from-emerald-500 to-teal-600'} text-white`}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{item.title}</div>
                      <div className="text-sm text-gray-600">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="#portfolio" className="px-8 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105">
                  View Our Work
                </a>
                <a href="#contact" className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:border-rose-600 hover:text-rose-600 transition-all">
                  Get Free Consultation
                </a>
              </div>
            </div>
          </div>

          {/* Equipment Showcase */}
          <div className="mt-20 pt-12 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Professional Equipment We Use</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {equipmentList.map((equipment, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="text-rose-600 mb-2">
                    <Camera className="w-8 h-8" />
                  </div>
                  <div className="font-semibold text-gray-900">{equipment.name}</div>
                  <div className="text-sm text-gray-600">{equipment.type}</div>
                  <div className="text-xs text-gray-500 mt-1">{equipment.specs}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Our Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Complete <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Photography</span> Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">From pre-wedding shoots to cinematic films, we provide end-to-end wedding photography services</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-rose-500 rounded-full flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-6 border-t border-gray-100">
                    <div className="text-sm text-gray-500">{service.stats}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Services */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              { title: 'Same Day Edit', desc: 'Get wedding highlights on the same day', icon: <Zap /> },
              { title: 'Drone Coverage', desc: 'Aerial shots for breathtaking views', icon: <Cloud /> },
              { title: 'Album Designing', desc: 'Custom designed luxury photo albums', icon: <BookOpen /> }
            ].map((service, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="inline-flex p-3 bg-rose-50 text-rose-600 rounded-xl mb-4">
                  {service.icon}
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{service.title}</h4>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" ref={portfolioRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Our Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Weddings</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Explore our collection of beautifully captured wedding moments</p>
          </div>

          {/* Portfolio Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {portfolioCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all flex items-center gap-2 ${
                  activeFilter === category.id
                    ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.icon && <span>{category.icon}</span>}
                {category.name}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div key={activeFilter} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredPortfolio.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <div className="text-gray-500 mb-4">No items found for "{activeFilter}".</div>
                <button onClick={() => setActiveFilter('all')} className="px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-full">Show All</button>
              </div>
            ) : (
              filteredPortfolio.map((item) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(item)}
                  className="portfolio-item group relative aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-[1.02]"
                >
                  {/* Portfolio Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://via.placeholder.com/1200x900?text=Image+Unavailable'; }}
                    onLoad={(e) => { e.currentTarget.classList.add('opacity-100'); }}
                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-0 transition-opacity duration-500"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h4 className="font-bold text-white text-xl mb-2">{item.title}</h4>
                      <p className="text-white/90 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {item.location}
                      </p>
                      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/20">
                        <span className="text-white/80 text-sm flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {item.views}
                        </span>
                        <span className="text-white/80 text-sm flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {item.likes}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-20 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                    {portfolioCategories.find(c => c.id === item.category)?.name}
                  </div>

                </div>
              ))
            )}

          </div>

          {/* Video Portfolio */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Cinematic Wedding Films</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredVideos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setVideoModalOpen(true)}
                  className="group relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-rose-600 to-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="text-white font-semibold">{video.title}</div>
                    <div className="flex items-center justify-between text-white/70 text-sm mt-2">
                      <span>{video.duration}</span>
                      <span>{video.views} views</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Pricing Packages</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">Perfect</span> Package
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Flexible packages tailored to different wedding styles and budgets</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative rounded-3xl p-8 transition-all duration-500 hover:scale-105 ${
                  pkg.popular
                    ? 'bg-gradient-to-br from-rose-600 via-pink-600 to-rose-600 shadow-2xl shadow-rose-500/30'
                    : 'bg-white/10 backdrop-blur-lg border border-white/10'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-amber-400 to-yellow-400 text-gray-900 px-6 py-2 rounded-full font-bold text-sm">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-3xl font-bold mb-2">{pkg.name}</h3>
                  <div className="flex items-end gap-2 mb-1">
                    <span className="text-5xl font-bold">{pkg.price}</span>
                    <span className="text-white/70 text-lg">starting from</span>
                  </div>
                  <div className="text-white/80 mb-2">{pkg.duration}</div>
                  <div className="text-rose-200/80 text-sm">{pkg.tagline}</div>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                        feature.included
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                          : 'bg-white/10 text-white/30'
                      }`}>
                        {feature.included ? <CheckCircle className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      </div>
                      <span className={feature.included ? '' : 'text-white/50'}>{feature.text}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  pkg.popular
                    ? 'bg-white text-rose-600 hover:shadow-2xl hover:shadow-white/30'
                    : 'bg-gradient-to-r from-rose-600 to-pink-600 text-white hover:shadow-lg'
                }`}>
                  Select Package
                </button>
              </div>
            ))}
          </div>

          {/* Custom Package CTA */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-8 py-6">
              <Sparkles className="w-6 h-6 text-rose-400" />
              <div className="text-left">
                <div className="font-bold text-lg">Need a Custom Package?</div>
                <div className="text-white/70">Contact us for a personalized quote</div>
              </div>
              <a href="#contact" className="ml-6 px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 rounded-full font-semibold hover:shadow-lg transition-all">
                Get Custom Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" ref={testimonialsRef} className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Couples</span> Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Real stories from real couples who trusted us with their special day</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-card bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                    {/* Avatar placeholder */}
                    <div className="w-full h-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.location}</div>
                    <div className="text-rose-600 text-xs font-medium mt-1">{testimonial.weddingType}</div>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>

                {testimonial.videoTestimonial && (
                  <button className="flex items-center gap-2 text-rose-600 font-semibold text-sm">
                    <Play className="w-4 h-4" />
                    Watch Video Testimonial
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: 'Google Reviews', value: '4.9/5', icon: <Star /> },
              { title: 'Wedding Wire', value: 'Brides Choice', icon: <Award /> },
              { title: 'Instagram', value: '100K+', icon: <Instagram /> },
              { title: 'Response Time', value: '< 2 Hours', icon: <Clock /> }
            ].map((badge, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg text-center">
                <div className="inline-flex p-3 bg-rose-50 text-rose-600 rounded-xl mb-3">
                  {badge.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{badge.value}</div>
                <div className="text-gray-600 text-sm">{badge.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">Contact Us</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Let's Create <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Magic</span> Together
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Get in touch with our team to discuss your wedding photography needs. We'll help you create a package that perfectly matches your vision and budget.
              </p>

              <div className="space-y-8">
                {[
                  {
                    icon: <Phone className="w-7 h-7" />,
                    title: "Call Us",
                    details: ["+91 98765 43210", "+91 98765 43211"],
                    action: "Available 9 AM - 9 PM"
                  },
                  {
                    icon: <Mail className="w-7 h-7" />,
                    title: "Email Us",
                    details: ["info@weddingmitra.com", "bookings@weddingmitra.com"],
                    action: "Response within 2 hours"
                  },
                  {
                    icon: <MapPin className="w-7 h-7" />,
                    title: "Visit Us",
                    details: ["Studio 45, Bandra West, Mumbai", "DLF Cyber Park, Gurgaon, Delhi NCR"],
                    action: "By appointment only"
                  }
                ].map((contact, idx) => (
                  <div key={idx} className="flex items-start gap-6 p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white hover:shadow-lg transition-all">
                    <div className="p-4 bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-xl">
                      {contact.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 text-lg mb-2">{contact.title}</div>
                      {contact.details.map((detail, i) => (
                        <div key={i} className="text-gray-700">{detail}</div>
                      ))}
                      <div className="text-sm text-rose-600 font-medium mt-2">{contact.action}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <div className="font-semibold text-gray-900 mb-4">Follow Our Journey</div>
                <div className="flex gap-4">
                  {[
                    { icon: <Instagram />, label: 'Instagram', color: 'from-purple-600 to-pink-600' },
                    { icon: <Facebook />, label: 'Facebook', color: 'from-blue-600 to-blue-700' },
                    { icon: <Youtube />, label: 'YouTube', color: 'from-red-600 to-red-700' },
                    // { icon: <Pinterest />, label: 'Pinterest', color: 'from-red-500 to-pink-600' }
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className={`flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r ${social.color} text-white font-medium hover:shadow-lg transition-all hover:scale-105`}
                    >
                      {social.icon}
                      <span>{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Schedule a Free Consultation</h3>
              <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you within 24 hours</p>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      placeholder="Priya & Rahul"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      placeholder="hello@example.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Wedding Date *</label>
                    <input
                      type="date"
                      name="weddingDate"
                      value={formData.weddingDate}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Approximate Budget</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">Select Budget Range</option>
                    <option value="50k-1l">₹50,000 - ₹1,00,000</option>
                    <option value="1l-2l">₹1,00,000 - ₹2,00,000</option>
                    <option value="2l-3l">₹2,00,000 - ₹3,00,000</option>
                    <option value="3l+">₹3,00,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tell us about your wedding</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Venue, number of guests, specific requirements..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Send Inquiry
                    </>
                  )}
                </button>

                <p className="text-center text-gray-500 text-sm">
                  By submitting, you agree to our Terms and Privacy Policy
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-5 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 via-pink-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <img
                      src="https://image2url.com/r2/default/images/1768410250290-a659b880-b146-45d9-88e7-a1021db4125d.jpg"
                      alt="Pro Equipment"
                      className="w-16 h-16 object-cover"
                    />
                </div>
                <div>
                  <div className="font-bold text-2xl bg-gradient-to-r from-white to-rose-200 bg-clip-text text-transparent">
                    Wedding Mitra
                  </div>
                  <div className="text-sm text-gray-400">Photography & Cinematography</div>
                </div>
              </div>
              <p className="text-gray-400 mb-8 max-w-md">
                Capturing timeless moments and creating beautiful memories for couples across India and beyond since 2012.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: <Instagram />, href: '#' },
                  { icon: <Facebook />, href: '#' },
                  { icon: <Youtube />, href: '#' },
                  { icon: <Twitter />, href: '#' },
                  // { icon: <Pinterest />, href: '#' }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                title: "Quick Links",
                links: ["Home", "About Us", "Portfolio", "Services", "Packages", "Testimonials"]
              },
              {
                title: "Services",
                links: ["Wedding Photography", "Cinematic Films", "Pre-Wedding Shoots", "Custom Albums", "Drone Coverage", "Same Day Edit"]
              },
              {
                title: "Legal",
                links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Refund Policy", "Booking Terms"]
              }
            ].map((column, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-lg mb-6">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-gray-400 text-sm">
                © 2025 Wedding Mitra Photography. All rights reserved.
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <a href="#" className="hover:text-rose-400">Privacy Policy</a>
                <a href="#" className="hover:text-rose-400">Terms of Service</a>
                <a href="#" className="hover:text-rose-400">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-rose-600 to-pink-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-rose-500/50 ${
          scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <ArrowUp className="w-6 h-6" />
      </button>

      {/* WhatsApp Float */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-8 w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      {/* Lightbox Modal */}
      {lightboxOpen && selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-rose-400 z-10"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="lightbox-content max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl aspect-video flex items-center justify-center mb-6 overflow-hidden">
              {selectedImage?.image ? (
                <img src={selectedImage.image} alt={selectedImage.title} className="w-full h-full object-cover" />
              ) : (
                <Camera className="w-32 h-32 text-gray-600" />
              )}
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">{selectedImage.title}</h3>
                  <p className="text-gray-300 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    {selectedImage.location}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{selectedImage.views}</div>
                    <div className="text-gray-400 text-sm">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{selectedImage.likes}</div>
                    <div className="text-gray-400 text-sm">Likes</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 rounded-xl font-semibold hover:shadow-lg">
                  Book Similar Shoot
                </button>
                <button className="px-6 py-3 bg-white/20 rounded-xl font-semibold hover:bg-white/30">
                  Share <Share2 className="inline w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {videoModalOpen && (
        <div 
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setVideoModalOpen(false)}
        >
          <button
            onClick={() => setVideoModalOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-rose-400 z-10"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-rose-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-10 h-10 text-white ml-1" />
                </div>
                <div className="text-white text-xl">Wedding Mitra Showreel 2025</div>
                <div className="text-gray-400 text-sm mt-2">Cinematic Wedding Films Collection</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin"></div>
            <div className="text-gray-900 font-semibold">Processing your request...</div>
          </div>
        </div>
      )}
    </div>
  );
};

// Custom icons for missing ones
const Eye = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

export default WeddingMitraWebsite;