// Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer style={{ background: '#f0f0f0', fontSize:'13px' , padding: '15px 0', textAlign: 'center', marginTop: '40px' }}>
      <div>
        <p> Capstone Design Team, KYONGGI Univ COMPUTER SCIENCE Dept. © {new Date().getFullYear()}</p>
        <p>Contact Us: Team Leader. qowotjr1010@gmail.com</p>
      </div>
    </footer>
  );
};

export default Footer;
