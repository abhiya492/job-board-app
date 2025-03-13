import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">JobBoard</h3>
            <p className="text-gray-400">Find your dream job today</p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="/admin" className="text-gray-400 hover:text-white">Admin Panel</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">support@jobboard.com</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} JobBoard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;