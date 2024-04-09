import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillBehanceSquare, AiFillInstagram, AiFillLinkedin, AiFillYoutube } from "react-icons/ai";
import { FaGitSquare } from "react-icons/fa";
import { Context } from "../../main";

const Footer = () => {
  const isDashboard = useLocation();
  const { mode } = useContext(Context);

  return (
    <>
      <footer
        className={
          isDashboard.pathname === "/dashboard"
            ? "hideFooter"
            : mode === "light"
            ? "light-footer"
            : "dark-footer"
        }
      >
        <div className="container">
          <div className="about">
            <h3>About</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum
              nobis sapiente nostrum temporibus quia ab! Distinctio fugit, eos
              laudantium sed voluptates unde, perspiciatis corporis nihil eum
              sapiente delectus iste labore.
            </p>
            <p>
              <span>Email:</span> Ashishsharmastidio@gmail.com
            </p>
            <p>
              <span>Phone:</span> 9140585097
            </p>
          </div>
          <div className="quick_links">
            <h3>Quick Links</h3>
            <ul>
              <Link to="/">Home</Link>
              <Link to="/blogs">Blogs</Link>
              <Link to="/about">About</Link>
              <Link to="/dashboard">Dashboard</Link>
            </ul>
          </div>
          <div className="categories">
            <h3>Categories</h3>
            <ul>
              <li>LifeStyle</li>
              <li>Technology</li>
              <li>Travel</li>
              <li>Busness</li>
              <li>Economy</li>
            </ul>
          </div>
          <div className="news_letter">
            <div>
              <h3>Weekly NewsLetter</h3>
              <p>Get articles and offer via email</p>
            </div>
            <div>
              <input type="text" placeholder="Your Email"/>
              <button>Subscribe</button>
            </div>
          </div>
        </div>
        <div className="container">
            <div className="logo">Ashish <span>Blog</span></div>
            <div className="links">
                <a href="/" target="_blank"><AiFillInstagram/></a>
                <a href="/" target="_blank"><FaGitSquare/></a>
                <a href="/" target="_blank"><AiFillYoutube/></a>
                <a href="/" target="_blank"><AiFillLinkedin/></a>
                <a href="/" target="_blank"><AiFillBehanceSquare/></a>
            </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
