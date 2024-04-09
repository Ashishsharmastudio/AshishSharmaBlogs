import React from "react";
import { Link } from "react-router-dom";

const LatestBlog = ({ heading, newClass, blogs }) => {
  return (
    <section
      className={
        newClass && newClass.length > 0 ? "dashboard-blogs blogs" : "blogs"
      }
    >
      <h3>{heading}</h3>
      <div className="container">
        {blogs &&
          blogs.map((element) => {
            return (
              <Link
                to={`/blog/${element._id}`}
                key={element._id} // Changed Key to key
                className="card" // Moved className to Link component
              >
                <img src={element.mainImage.url} alt="mainImg" />
                <span className="category">{element.category}</span>
                <h4>{element.title}</h4>
                <div className="writer_section">
                  <div className="author">
                    <img src={element.authorAvatar} alt="author_avatar" />
                    <p>{element.authorName}</p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </section>
  );
};

export default LatestBlog;
