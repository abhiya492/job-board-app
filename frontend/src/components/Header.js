import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary-600">JobBoard</Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary-600">Home</Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-600 hover:text-primary-600">Admin</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
