import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home as HomeIcon } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (location.pathname === '/' || pathnames.length === 0) return null;

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <div className="breadcrumb-container">
        <Link to="/" className="breadcrumb-link home-crumb">
          <HomeIcon size={14} />
        </Link>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return (
            <React.Fragment key={to}>
              <ChevronRight size={12} className="breadcrumb-separator" />
              {last ? (
                <span className="breadcrumb-current">
                  {value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ')}
                </span>
              ) : (
                <Link to={to} className="breadcrumb-link">
                  {value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ')}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};

export default Breadcrumbs;
