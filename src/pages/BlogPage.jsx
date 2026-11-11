import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Search, Share2, MessageCircle, Compass, Check, BookOpen, Tag } from 'lucide-react';
import { blogPosts, BLOG_CATEGORIES } from '../data/blogData';
import SEOHead from '../components/SEOHead';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import { trackWhatsAppClick } from '../utils/analytics';

const BLOG_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Visit Chittorgarh Travel Blog & Mewar Chronicles",
    "description": "Authentic travel guides, historic fortification analysis, Mewari culinary guides, and itinerary insights for Chittorgarh and Rajasthan.",
    "url": "https://visitchittorgarh.in/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Visit Chittorgarh",
      "logo": {
        "@type": "ImageObject",
        "url": "https://visitchittorgarh.in/logo_maharana.png"
      }
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://visitchittorgarh.in/" },
      { "@type": "ListItem", "position": 2, "name": "Travel Blog", "item": "https://visitchittorgarh.in/blog" }
    ]
  }
];

const BlogPage = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  // Sync post slug from URL (/blog/:slug or /blog?post=slug)
  useEffect(() => {
    const postSlug = slug || searchParams.get('post');
    if (postSlug) {
      const match = blogPosts.find(p => p.id === postSlug);
      if (match) {
        setSelectedPost(match);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setSelectedPost(null);
    }
  }, [slug, searchParams]);

  // Filter posts based on category and search
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory || post.tags.includes(activeCategory);
      const matchesSearch = searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const featuredPost = blogPosts[0];

  const handleShare = (post, platform) => {
    const postUrl = typeof window !== 'undefined' ? `${window.location.origin}/blog/${post.id}` : `https://www.visitchittorgarh.in/blog/${post.id}`;
    const text = `Check out this Chittorgarh travel article: "${post.title}"`;

    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + postUrl)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(postUrl)}`, '_blank');
    } else {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(postUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const triggerPlanTrip = () => {
    window.dispatchEvent(new CustomEvent('openTripPlannerModal'));
  };

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#25231F] pt-20 pb-20">
      <SEOHead
        title={selectedPost ? `${selectedPost.title} | Visit Chittorgarh Blog` : "Chittorgarh Travel Blog & Guides | The Mewar Chronicles"}
        description={selectedPost ? selectedPost.summary : "Explore authentic Chittorgarh travel guides, fort history, Mewari cuisine, Sanwariya Seth pilgrimage tips, and curated itineraries."}
        canonical={selectedPost ? `/blog/${selectedPost.id}` : "/blog"}
        ogImage={selectedPost ? `https://www.visitchittorgarh.in${selectedPost.image}` : "https://www.visitchittorgarh.in/Fort.webp"}
        schema={BLOG_SCHEMA}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!selectedPost ? (
            <motion.div
              key="blog-list"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="text-center max-w-3xl mx-auto pt-8 pb-10">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-3">
                  The Mewar Chronicles
                </span>
                <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#25231F] mb-4">
                  Chittorgarh Travel Blog
                </h1>
                <p className="text-sm sm:text-base text-[#25231F]/70 leading-relaxed font-light">
                  Expert itineraries, fort history, temple guides, and local Mewari culinary secrets curated by certified local guides and historians.
                </p>

                {/* Search Input */}
                <div className="mt-8 max-w-xl mx-auto relative">
                  <Search className="w-5 h-5 text-[#25231F]/40 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles, e.g. Fort, Sanwariya Seth, Itinerary..."
                    className="w-full pl-12 pr-4 py-3 bg-white border border-[#EFE7D9] rounded-2xl text-sm text-[#25231F] focus:outline-none focus:border-[#C49A32] shadow-sm transition-colors"
                  />
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                {BLOG_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
                      activeCategory === cat
                        ? 'bg-[#25231F] text-white shadow-md'
                        : 'bg-white text-[#25231F]/70 border border-[#EFE7D9] hover:border-[#C49A32] hover:text-[#25231F]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Featured Article Spotlight (when no active search and category is All) */}
              {!searchQuery && activeCategory === 'All' && (
                <div className="mb-14">
                  <div
                    onClick={() => { setSelectedPost(featuredPost); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="group bg-white rounded-3xl border border-[#EFE7D9] overflow-hidden shadow-heritage hover:border-[#C49A32] transition-all cursor-pointer grid grid-cols-1 lg:grid-cols-12"
                  >
                    <div className="lg:col-span-7 h-64 sm:h-80 lg:h-full relative overflow-hidden">
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-[#C49A32] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                        Featured Guide
                      </div>
                    </div>
                    <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 text-xs text-[#25231F]/60 mb-3">
                          <span className="text-[#A65F3D] font-bold uppercase tracking-wider">{featuredPost.category}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#25231F] group-hover:text-[#A65F3D] transition-colors leading-tight mb-4">
                          {featuredPost.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-[#25231F]/70 leading-relaxed mb-6">
                          {featuredPost.summary}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-[#EFE7D9]">
                        <span className="text-xs font-semibold text-[#25231F]/70">{featuredPost.date}</span>
                        <span className="text-xs font-bold text-[#C49A32] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                          Read Full Guide <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    onClick={() => { setSelectedPost(post); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="group bg-white rounded-3xl border border-[#EFE7D9] overflow-hidden shadow-heritage hover:border-[#C49A32] hover:-translate-y-1 transition-all cursor-pointer flex flex-col h-full"
                  >
                    <div className="h-52 relative overflow-hidden bg-[#EFE7D9]">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <span className="absolute top-3 left-3 bg-[#25231F]/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                        {post.category || 'Guide'}
                      </span>
                    </div>

                    <div className="p-6 flex flex-col flex-1 justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] text-[#25231F]/60 mb-2">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{post.date}</span>
                          <span>•</span>
                          <Clock className="w-3.5 h-3.5" />
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="text-lg font-serif font-bold text-[#25231F] group-hover:text-[#A65F3D] transition-colors leading-snug mb-3">
                          {post.title}
                        </h3>
                        <p className="text-xs text-[#25231F]/70 line-clamp-3 leading-relaxed mb-4">
                          {post.summary}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#EFE7D9] flex items-center justify-between text-xs">
                        <span className="text-[#25231F]/60 font-medium">{post.author}</span>
                        <span className="font-bold text-[#C49A32] group-hover:text-[#A65F3D] transition-colors flex items-center gap-1">
                          Read <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-16 bg-white rounded-3xl border border-[#EFE7D9] p-8 max-w-md mx-auto">
                  <p className="text-sm text-[#25231F]/70 mb-4">No articles found matching "{searchQuery}".</p>
                  <button
                    onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                    className="px-6 py-2.5 bg-[#C49A32] text-white rounded-xl text-xs font-bold uppercase tracking-wider"
                  >
                    Reset Filter
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            /* Single Article Reader View */
            <motion.div
              key="blog-detail"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              {/* Back Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-[#EFE7D9] text-xs font-bold uppercase tracking-wider text-[#25231F] hover:bg-[#EFE7D9] transition-colors mb-6 shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" /> Back to All Articles
              </button>

              <article className="bg-white rounded-3xl border border-[#EFE7D9] p-6 sm:p-12 shadow-heritage overflow-hidden">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#25231F]/60 mb-4">
                  <span className="bg-[#EFE7D9] text-[#A65F3D] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {selectedPost.category || 'Mewar Heritage'}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {selectedPost.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {selectedPost.readTime}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {selectedPost.author}</span>
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black text-[#25231F] leading-tight mb-6">
                  {selectedPost.title}
                </h1>

                {/* Hero Image */}
                <div className="w-full h-64 sm:h-96 rounded-2xl overflow-hidden mb-8 border border-[#EFE7D9]">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Article Body */}
                <div className="prose prose-stone max-w-none text-sm sm:text-base leading-relaxed text-[#25231F]/85 space-y-4">
                  {selectedPost.content.split('\n\n').map((block, idx) => {
                    if (block.startsWith('### ')) {
                      return (
                        <h3 key={idx} className="text-xl sm:text-2xl font-serif font-bold text-[#25231F] mt-8 mb-3">
                          {block.replace('### ', '')}
                        </h3>
                      );
                    }
                    if (block.startsWith('- ') || block.startsWith('1. ')) {
                      return (
                        <div key={idx} className="pl-4 border-l-2 border-[#C49A32] my-4 space-y-1.5 text-xs sm:text-sm">
                          {block.split('\n').map((line, lIdx) => (
                            <p key={lIdx} className="text-[#25231F]/80">
                              {line.replace(/^[0-9]\.\s|\-\s/, '')}
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return (
                      <p key={idx} className="text-[#25231F]/85">
                        {block}
                      </p>
                    );
                  })}
                </div>

                {/* Social Share & Package Promotion Box */}
                <div className="mt-12 pt-8 border-t border-[#EFE7D9] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#25231F]/60 flex items-center gap-1">
                      <Share2 className="w-4 h-4" /> Share Article:
                    </span>
                    <button
                      onClick={() => handleShare(selectedPost, 'whatsapp')}
                      className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                      title="Share on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleShare(selectedPost, 'twitter')}
                      className="p-2 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors text-xs font-bold"
                      title="Share on X / Twitter"
                    >
                      X
                    </button>
                    <button
                      onClick={() => handleShare(selectedPost, 'copy')}
                      className="p-2 rounded-xl bg-[#F8F5EF] text-[#25231F] hover:bg-[#EFE7D9] transition-colors text-xs font-bold"
                      title="Copy Article Link"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : 'Copy'}
                    </button>
                  </div>

                  {/* Plan Trip CTA */}
                  <button
                    onClick={triggerPlanTrip}
                    className="px-6 py-3 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md"
                  >
                    <Compass className="w-4 h-4" />
                    Plan This Tour
                  </button>
                </div>

                {/* Related Tour Package Banner */}
                {selectedPost.relatedPackage && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-[#EFE7D9] via-[#F8F5EF] to-[#EFE7D9] rounded-2xl border border-[#C49A32]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#A65F3D]">Recommended Experience</span>
                      <h4 className="text-base sm:text-lg font-serif font-bold text-[#25231F]">
                        {selectedPost.relatedPackage}
                      </h4>
                      <p className="text-xs text-[#25231F]/70">Explore with verified Mewari guides, private transport & authentic tastings.</p>
                    </div>
                    <NavLink
                      to={selectedPost.relatedPackageLink || '/royal-journeys'}
                      className="px-5 py-2.5 bg-[#25231F] hover:bg-[#A65F3D] text-white rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-colors"
                    >
                      View Package
                    </NavLink>
                  </div>
                )}
              </article>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BlogPage;
