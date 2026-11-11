import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Calendar, Clock, User, ArrowLeft, ArrowRight, Tag, HelpCircle } from 'lucide-react';
import { blogPosts } from '../data/blogData';
import Section from '../components/Section';
import SEOHead from '../components/SEOHead';
import QuickInquiryModal from '../components/QuickInquiryModal';

const BLOG_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Visit Chittorgarh Travel Blog",
    "description": "Read local travel stories, historic guides, itinerary tips, and cultural information about Chittorgarh Fort and local attractions.",
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
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://visitchittorgarh.in/blog" }
    ]
  }
];

const BlogPage = ({ t }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeTag, setActiveTag] = useState('All');
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquirySubject, setInquirySubject] = useState('');

  // Collect all unique tags
  const allTags = ['All', ...new Set(blogPosts.flatMap(post => post.tags))];

  // Filter posts
  const filteredPosts = activeTag === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.tags.includes(activeTag));

  const handleOpenInquiry = (subject) => {
    setInquirySubject(subject);
    setIsInquiryOpen(true);
  };

  return (
    <div className="min-h-screen text-white bg-royal-black">
      <SEOHead
        title={selectedPost ? `${selectedPost.title} | Visit Chittorgarh Blog` : "Chittorgarh Travel Blog | Guides, History & Itineraries"}
        description={selectedPost ? selectedPost.summary : "Discover the history, top attractions, food and local guides of Chittorgarh. Read expert recommendations and itineraries."}
        canonical={selectedPost ? `/blog?post=${selectedPost.id}` : "/blog"}
        keywords="Chittorgarh blog, Chittorgarh travel guide, Chittorgarh fort history, visit Chittorgarh, Mewar history, Rajputana valor"
        ogImage={selectedPost ? selectedPost.image : "https://visitchittorgarh.in/Fort.png"}
        schema={BLOG_SCHEMA}
      />

      {/* Header / Hero */}
      <AnimatePresence mode="wait">
        {!selectedPost ? (
          <motion.div
            key="list-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pt-24 pb-12 text-center px-4"
          >
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-4 tracking-wider">
              {lang => lang === 'hi' ? 'चित्तौड़गढ़ ब्लॉग' : 'The Mewar Chronicles'}
            </h1>
            <p className="max-w-2xl mx-auto text-gray-400 font-light italic text-lg mb-8">
              "Discover local legends, travel guides, and heritage insights straight from the heart of Rajasthan."
            </p>

            {/* Tag Filters */}
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto px-4 mt-6">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                    activeTag === tag
                      ? 'bg-royal-gold text-royal-black border-royal-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                      : 'bg-heritage-charcoal/40 text-white/70 border-white/10 hover:border-royal-gold/40 hover:text-white'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="detail-header"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-24 pb-6 px-4 max-w-4xl mx-auto"
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="flex items-center gap-2 text-royal-gold hover:text-white transition-colors duration-300 font-bold uppercase tracking-widest text-xs mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to all stories
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pb-24">
        <AnimatePresence mode="wait">
          {!selectedPost ? (
            <motion.div
              key="post-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  layoutId={`card-${post.id}`}
                  whileHover={{ y: -10 }}
                  className="group bg-heritage-charcoal/40 rounded-[2rem] overflow-hidden border border-white/5 hover:border-royal-gold/30 transition-all duration-500 shadow-2xl flex flex-col h-full"
                >
                  {/* Image wrapper */}
                  <div className="h-56 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-heritage-charcoal to-transparent opacity-60 z-10" />
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 z-20 flex gap-2">
                      {post.tags.map(t => (
                        <span key={t} className="px-3 py-1 bg-royal-black/80 backdrop-blur-md text-royal-gold text-[9px] font-black uppercase tracking-widest rounded-full border border-royal-gold/20">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-white/50 text-[10px] uppercase font-bold tracking-wider mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-royal-gold" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-royal-gold" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-xl font-serif text-white mb-3 group-hover:text-royal-gold transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-sm font-light leading-relaxed mb-6">
                        {post.summary}
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedPost(post)}
                      className="w-full py-3.5 bg-royal-gold/5 border border-royal-gold/20 hover:bg-royal-gold hover:text-royal-black text-royal-gold text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                    >
                      Read full article
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.article
              key="post-detail"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto bg-heritage-charcoal/20 border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl"
            >
              {/* Header */}
              <div className="flex flex-wrap gap-4 items-center text-white/50 text-xs font-bold uppercase tracking-wider mb-6">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-royal-gold" />
                  By {selectedPost.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-royal-gold" />
                  {selectedPost.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-royal-gold" />
                  {selectedPost.readTime}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-serif text-white mb-8 tracking-wide leading-tight">
                {selectedPost.title}
              </h1>

              {/* Main Image */}
              <div className="rounded-2xl overflow-hidden mb-10 border border-white/10 shadow-2xl">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full object-cover max-h-[400px]"
                />
              </div>

              {/* Article Content */}
              <div className="prose prose-invert max-w-none text-gray-300 font-light leading-relaxed space-y-6 text-base md:text-lg">
                {selectedPost.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('###')) {
                    return (
                      <h3 key={index} className="text-xl md:text-2xl font-serif text-royal-gold font-bold pt-4 mb-2">
                        {paragraph.replace('###', '').trim()}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('1.') || paragraph.startsWith('-')) {
                    return (
                      <ul key={index} className="list-disc pl-6 space-y-2 text-gray-300">
                        {paragraph.split('\n').map((line, i) => (
                          <li key={i}>{line.replace(/^-\s*|^[0-9]+\.\s*/, '').trim()}</li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={index} className="whitespace-pre-line">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Inquiry Action Box */}
              <div className="mt-16 p-8 bg-royal-gold/5 rounded-[2rem] border border-royal-gold/20 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="text-lg font-serif text-white font-bold mb-2">Planning a trip to Chittorgarh?</h4>
                  <p className="text-sm text-gray-400 font-light">Get connected with local guides, transport, and handpicked stays.</p>
                </div>
                <button
                  onClick={() => handleOpenInquiry(`Inquiry about: ${selectedPost.title}`)}
                  className="px-6 py-3.5 bg-royal-gold text-royal-black text-xs font-bold uppercase tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 shrink-0"
                >
                  Ask local experts
                </button>
              </div>
            </motion.article>
          )}
        </AnimatePresence>
      </div>

      <QuickInquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        subject={inquirySubject}
      />
    </div>
  );
};

export default BlogPage;
