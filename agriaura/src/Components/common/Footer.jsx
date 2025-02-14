import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="/" className="text-2xl font-bold hover:text-gray-400">
              MyApp
            </a>
            <p className="text-sm">© {new Date().getFullYear()} MyApp. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="/about" className="hover:text-gray-400">
              About
            </a>
            <a href="/privacy" className="hover:text-gray-400">
              Privacy Policy
            </a>
            <a href="/contact" className="hover:text-gray-400">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
