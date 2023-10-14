import React from 'react';

function Footer() {
  return (
    <footer className="bg-black-800 text-white text-center py-4">
      <p>&copy; {new Date().getFullYear()} OkBookShopNg. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
