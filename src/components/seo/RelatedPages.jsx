import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';

/**
 * RelatedPages — Contextual internal linking grid across SEO hubs, routes, attractions, and packages.
 */
const RelatedPages = ({
  title = 'Explore Related Chittorgarh Guides',
  subtitle = 'Plan deeper across routes, heritage monuments, and multi-day itineraries',
  links = [],
}) => {
  if (!links.length) return null;

  return (
    <section className="mt-14 pt-10 border-t border-[#EFE7D9]" aria-labelledby="related-guides-heading">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#A65F3D] mb-1">
            <Compass className="w-3.5 h-3.5 text-[#C49A32]" />
            Internal Travel Network
          </span>
          <h2 id="related-guides-heading" className="text-2xl sm:text-3xl font-serif font-bold text-[#25231F]">
            {title}
          </h2>
          {subtitle && <p className="text-xs sm:text-sm text-[#25231F]/70 mt-1">{subtitle}</p>}
        </div>
        <NavLink
          to="/destinations-and-routes"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#A65F3D] hover:text-[#C49A32] transition-colors shrink-0"
        >
          All Routes &amp; Guides
          <ArrowRight className="w-3.5 h-3.5" />
        </NavLink>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="group bg-white rounded-2xl p-5 border border-[#EFE7D9] hover:border-[#C49A32] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {item.tag && (
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F8F5EF] text-[#A65F3D] mb-2.5">
                  {item.tag}
                </span>
              )}
              <h3 className="font-serif font-bold text-base text-[#25231F] group-hover:text-[#A65F3D] transition-colors mb-1.5">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-xs text-[#25231F]/70 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              )}
            </div>
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#C49A32] group-hover:translate-x-1 transition-transform">
              <span>Read Travel Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default RelatedPages;

