import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-black via-black to-green-400">
            <div className="flex gap-3 justify-center md:justify-start mt-2">
                <Link to="https://www.instagram.com" target="_blank">
                    <FontAwesomeIcon icon={faInstagram} className="w-6 md:w-8 h-6 md:h-8 text-green-400" />
                </Link>

                <Link to="https://www.facebook.com" target="_blank">
                    <FontAwesomeIcon icon={faFacebook} className="w-6 md:w-8 h-6 md:h-8 text-green-400" />
                </Link>

                <Link to="https://www.linkedin.com" target="_blank">
                    <FontAwesomeIcon icon={faLinkedin} className="w-6 md:w-8 h-6 md:h-8 text-green-400" />
                </Link>
            </div>

            <div className="text-white text-center md:font-bold md:text-xl ">
                © count-of-money 2023. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
