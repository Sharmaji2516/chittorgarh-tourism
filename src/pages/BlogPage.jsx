import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Search, Share2, MessageCircle, Compass, Check, BookOpen, Tag, Landmark, Car, Sparkles, UtensilsCrossed } from 'lucide-react';
import { BLOG_CATEGORIES } from '../data/blogData';
import { getLocalizedBlogPosts, BLOG_CATEGORY_MAP } from '../data/localizedBlogs';
import SEOHead from '../components/SEOHead';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import { trackWhatsAppClick } from '../utils/analytics';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedPath } from '../config/languages';

const BLOG_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Visit Chittorgarh Travel Blog & Mewar Chronicles",
    "description": "Authentic travel guides, historic fortification analysis, Mewari culinary guides, and itinerary insights for Chittorgarh and Rajasthan.",
    "url": "https://www.visitchittorgarh.in/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Visit Chittorgarh",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.visitchittorgarh.in/chittorgarh-tourism-logo.png"
      }
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.visitchittorgarh.in/" },
      { "@type": "ListItem", "position": 2, "name": "Travel Blog", "item": "https://www.visitchittorgarh.in/blog" }
    ]
  }
];

const BlogPage = () => {
  const { t, lang } = useLanguage();
  const pageT = t?.blogPage || {};

  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeCategoryKey, setActiveCategoryKey] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  // Localized blog posts for current active language
  const localizedPosts = useMemo(() => {
    return getLocalizedBlogPosts(lang);
  }, [lang]);

  // Sync post slug from URL (/blog/:slug or /blog?post=slug)
  useEffect(() => {
    const postSlug = slug || searchParams.get('post');
    if (postSlug) {
      const match = localizedPosts.find(p => p.id === postSlug);
      if (match) {
        setSelectedPost(match);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setSelectedPost(null);
    }
  }, [slug, searchParams, localizedPosts]);

  const catMap = BLOG_CATEGORY_MAP[lang] || BLOG_CATEGORY_MAP.en;

  // Filter posts based on category and search
  const filteredPosts = useMemo(() => {
    return localizedPosts.filter(post => {
      const selectedCategoryLabel = catMap[activeCategoryKey] || activeCategoryKey;
      const matchesCategory = activeCategoryKey === 'All' || 
        post.category === selectedCategoryLabel || 
        (post.tags && post.tags.includes(selectedCategoryLabel));
      
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = q === '' ||
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        post.content.toLowerCase().includes(q);
      
      return matchesCategory && matchesSearch;
    });
  }, [activeCategoryKey, searchQuery, localizedPosts, catMap]);

  const handleShare = (post, platform) => {
    const postUrl = typeof window !== 'undefined' 
      ? `${window.location.origin}${getLocalizedPath(`/blog/${post.id}`, lang)}` 
      : `https://www.visitchittorgarh.in${getLocalizedPath(`/blog/${post.id}`, lang)}`;
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

  const activeSchema = selectedPost
    ? [
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": selectedPost.title,
          "description": selectedPost.summary,
          "url": `https://www.visitchittorgarh.in${getLocalizedPath(`/blog/${selectedPost.id}`, lang)}`,
          "author": {
            "@type": "Organization",
            "name": selectedPost.author || "Visit Chittorgarh — Mewari Heritage Desk"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Visit Chittorgarh",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.visitchittorgarh.in/chittorgarh-tourism-logo.png"
            }
          }
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.visitchittorgarh.in/" },
            { "@type": "ListItem", "position": 2, "name": pageT.title || "Travel Blog", "item": `https://www.visitchittorgarh.in${getLocalizedPath('/blog', lang)}` },
            { "@type": "ListItem", "position": 3, "name": selectedPost.title, "item": `https://www.visitchittorgarh.in${getLocalizedPath(`/blog/${selectedPost.id}`, lang)}` }
          ]
        }
      ]
    : BLOG_SCHEMA;

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#25231F] pt-28 pb-24">
      <SEOHead
        title={selectedPost ? `${selectedPost.title} | ${pageT.title || 'Visit Chittorgarh Blog'}` : `${pageT.title || 'Chittorgarh Travel Blog & Guides'} | ${pageT.kicker || 'The Mewar Chronicles'}`}
        description={selectedPost ? selectedPost.summary : (pageT.desc || "Explore authentic Chittorgarh travel guides, fort history, Mewari cuisine, Sanwariya Seth pilgrimage tips, and curated itineraries.")}
        canonical={selectedPost ? getLocalizedPath(`/blog/${selectedPost.id}`, lang) : getLocalizedPath('/blog', lang)}
        ogType={selectedPost ? "article" : "website"}
        schema={activeSchema}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!selectedPost ? (
            <motion.div
              key="blog-list"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {/* Centered Royal Showcase Hero (Consistent with Guide & Taxi Pages - No Photos) */}
              <div className="bg-gradient-to-b from-white via-[#FCFAF6] to-[#F8F5EF] rounded-3xl p-8 sm:p-14 border border-[#C49A32]/35 shadow-xl mb-12 text-center">
                <div className="inline-flex items-center gap-2 bg-[#C49A32]/10 border border-[#C49A32]/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-[#C49A32] mb-4">
                  <BookOpen className="w-4 h-4 text-[#C49A32]" />
                  <span>{pageT.kicker || "The Mewar Chronicles • Verified Travel Insights"}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#25231F] leading-tight mb-4 max-w-3xl mx-auto">
                  {pageT.title || "Chittorgarh Travel Blog & Guides"}
                </h1>

                <p className="text-sm sm:text-base text-[#25231F]/75 leading-relaxed max-w-2xl mx-auto mb-8 font-light">
                  {pageT.desc || "Expert citadel walk itineraries, fort architecture analysis, temple pilgrimage guides, and pure desi ghee culinary secrets narrated by authorized local historians."}
                </p>

                {/* 4 Topic Pillar Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 max-w-4xl mx-auto mb-8 text-left">
                  <div className="p-4 bg-white rounded-2xl border border-[#EFE7D9] shadow-sm flex items-start gap-3">
                    <Landmark className="w-4 h-4 text-[#C49A32] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-[#25231F]">UNESCO Fort Citadel</div>
                      <div className="text-[11px] text-[#25231F]/60">All 7 Gates &amp; 65 Monuments</div>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-[#EFE7D9] shadow-sm flex items-start gap-3">
                    <Car className="w-4 h-4 text-[#C49A32] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-[#25231F]">Outstation Taxi Routes</div>
                      <div className="text-[11px] text-[#25231F]/60">Udaipur, Jaipur &amp; Highway Trips</div>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-[#EFE7D9] shadow-sm flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-[#C49A32] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-[#25231F]">Sacred Pilgrimages</div>
                      <div className="text-[11px] text-[#25231F]/60">Sanwariya Seth Mandaphiya</div>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-[#EFE7D9] shadow-sm flex items-start gap-3">
                    <UtensilsCrossed className="w-4 h-4 text-[#C49A32] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-[#25231F]">Authentic Flavors</div>
                      <div className="text-[11px] text-[#25231F]/60">Desi Ghee Dal Baati Churma</div>
                    </div>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="max-w-xl mx-auto relative">
                  <Search className="w-5 h-5 text-[#25231F]/40 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={pageT.searchPlaceholder || "Search articles: Fort, Taxi, Sanwariya Seth, Dal Baati..."}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-[#EFE7D9] rounded-2xl text-xs sm:text-sm text-[#25231F] focus:outline-none focus:border-[#C49A32] shadow-sm transition-colors"
                  />
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                {BLOG_CATEGORIES.map((catKey) => {
                  const label = catMap[catKey] || catKey;
                  return (
                    <button
                      key={catKey}
                      onClick={() => setActiveCategoryKey(catKey)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
                        activeCategoryKey === catKey
                          ? 'bg-[#25231F] text-white shadow-md'
                          : 'bg-white text-[#25231F]/70 border border-[#EFE7D9] hover:border-[#C49A32] hover:text-[#25231F]'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Articles Grid - No Repeated Post, No Photos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    onClick={() => { setSelectedPost(post); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="group bg-white rounded-3xl p-6 sm:p-7 border border-[#EFE7D9] shadow-heritage hover:border-[#C49A32] hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Meta: Category Tag & Reading Time */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#A65F3D] bg-[#EFE7D9]/60 px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                        <span className="text-[10px] font-semibold text-[#25231F]/60 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#C49A32]" />
                          <span>{post.readTime}</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-serif font-bold text-[#25231F] group-hover:text-[#A65F3D] transition-colors leading-snug mb-2.5">
                        {post.title}
                      </h3>

                      {/* Summary Excerpt */}
                      <p className="text-xs text-[#25231F]/70 line-clamp-3 leading-relaxed mb-5 font-light">
                        {post.summary}
                      </p>
                    </div>

                    {/* Bottom Author & Read Action */}
                    <div className="pt-4 border-t border-[#EFE7D9] flex items-center justify-between text-xs">
                      <span className="text-[#25231F]/60 font-medium text-[11px] truncate max-w-[150px]">
                        {post.author}
                      </span>
                      <span className="font-bold text-[#C49A32] group-hover:text-[#A65F3D] transition-colors flex items-center gap-1">
                        {pageT.read || "Read Guide"} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </article>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-16 bg-white rounded-3xl border border-[#EFE7D9] p-8 max-w-md mx-auto">
                  <p className="text-sm text-[#25231F]/70 mb-4">{pageT.noArticles || 'No articles found matching'} "{searchQuery}".</p>
                  <button
                    onClick={() => { setSearchQuery(''); setActiveCategoryKey('All'); }}
                    className="px-6 py-2.5 bg-[#C49A32] text-white rounded-xl text-xs font-bold uppercase tracking-wider"
                  >
                    {pageT.resetFilter || "Reset Filter"}
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            /* Single Article Reader View - Clean Royal Typography, No Photos */
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
                <ArrowLeft className="w-4 h-4" /> {pageT.backToAll || "Back to All Articles"}
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

                {/* Summary Quote Box (Clean Text Highlight instead of photo) */}
                <div className="p-5 sm:p-6 bg-[#F8F5EF] rounded-2xl border-l-4 border-[#C49A32] mb-8 text-sm sm:text-base text-[#25231F]/80 italic leading-relaxed">
                  "{selectedPost.summary}"
                </div>

                {/* Article Body */}
                <div className="prose prose-stone max-w-none text-sm sm:text-base leading-relaxed text-[#25231F]/85 space-y-4 font-light">
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

                {/* Social Share & Direct WhatsApp Action */}
                <div className="mt-12 pt-8 border-t border-[#EFE7D9] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#25231F]/60 flex items-center gap-1">
                      <Share2 className="w-4 h-4" /> {pageT.shareArticle || "Share Article:"}
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

                  {/* WhatsApp Tour Booking CTA */}
                  <a
                    href={`https://wa.me/917597451057?text=${encodeURIComponent(`Namaste Visit Chittorgarh! I was reading your article: "${selectedPost.title}" and would like to inquire about booking a tour / taxi.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick('blog_article_whatsapp')}
                    className="px-6 py-3 bg-[#128C7E] hover:bg-[#075E54] text-white font-black rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-[#128C7E]" />
                    <span>Inquire on WhatsApp</span>
                  </a>
                </div>

                {/* Related Tour Package Banner */}
                {selectedPost.relatedPackage && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-[#EFE7D9] via-[#F8F5EF] to-[#EFE7D9] rounded-2xl border border-[#C49A32]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#A65F3D]">
                        {pageT.recommendedExp || "Recommended Experience"}
                      </span>
                      <h4 className="text-base sm:text-lg font-serif font-bold text-[#25231F]">
                        {selectedPost.relatedPackage}
                      </h4>
                      <p className="text-xs text-[#25231F]/70">
                        Explore with verified Mewari guides, private transport &amp; authentic tastings.
                      </p>
                    </div>
                    <NavLink
                      to={getLocalizedPath(selectedPost.relatedPackageLink || '/royal-journeys', lang)}
                      className="px-5 py-2.5 bg-[#25231F] hover:bg-[#A65F3D] text-white rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-colors"
                    >
                      {pageT.viewPackage || "View Package"}
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
