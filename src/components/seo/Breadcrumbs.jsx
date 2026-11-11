import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = ({ items = [], className = '' }) => {
  if (!items.length) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex flex-wrap items-center gap-1.5 text-xs text-[#25231F]/65 mb-6 ${className}`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={`${item.label}-${index}`}>
            {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-[#25231F]/40 shrink-0" />}
            {isLast || !item.to ? (
              <span className="font-semibold text-[#25231F] truncate max-w-[260px]" aria-current="page">
                {item.label}
              </span>
            ) : (
              <NavLink
                to={item.to}
                className="inline-flex items-center gap-1 hover:text-[#A65F3D] transition-colors"
              >
                {index === 0 && <Home className="w-3 h-3 shrink-0" />}
                <span>{item.label}</span>
              </NavLink>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
