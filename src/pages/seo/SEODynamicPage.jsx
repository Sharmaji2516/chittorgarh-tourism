import React from 'react';
import { useParams } from 'react-router-dom';
import { SEO_ROUTE_MAP } from '../../data/seo';
import CityRouteTemplate from './CityRouteTemplate';
import StatePageTemplate from './StatePageTemplate';
import CountryPageTemplate from './CountryPageTemplate';
import AttractionSEOTemplate from './AttractionSEOTemplate';
import PackageSEOTemplate from './PackageSEOTemplate';
import NotFoundPage from '../NotFoundPage';

/**
 * Resolves any dynamic SEO slug from centralized data modules.
 * Falls back cleanly to NotFoundPage (noindex) when slug is unknown.
 */
const SEODynamicPage = () => {
  const { seoSlug } = useParams();
  const page = SEO_ROUTE_MAP[seoSlug];

  if (!page) {
    return <NotFoundPage />;
  }

  switch (page.type) {
    case 'cityRoute':
      return <CityRouteTemplate page={page} />;
    case 'state':
      return <StatePageTemplate page={page} />;
    case 'country':
      return <CountryPageTemplate page={page} />;
    case 'attraction':
      return <AttractionSEOTemplate page={page} />;
    case 'package':
      return <PackageSEOTemplate page={page} />;
    default:
      return <NotFoundPage />;
  }
};

export default SEODynamicPage;

