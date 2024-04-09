import { BeatLoader } from "react-spinners";
import { Context } from "../../main";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const AllAuthors = () => {
  const { mode } = useContext(Context);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const featchAuthors = async () => {
      const { data } = await axios.get(
        "https://ashishsharmablogs.onrender.com/api/v1/user/authors",
        { withCredentials: true }
      );
      setAuthors(data.authors);
    };
    featchAuthors();
  }, []);
  return (
    <article
      className={
        mode === "dark" ? "dark-bg all-authors" : "light-bg all-authors"
      }
    >
      <h2>ALL AUTHORS</h2>
      <div className="container">
        {authors && authors.length > 0 ? (
          authors.map((element) => {
            return (
              <div className="card" key={element._id}>
                <img src={element.avatar?.url} alt="author_avatar" />
                <h3>{element.name}</h3>
                <p>{element.role}</p>
              </div>
            );
          })
        ) : (
          <BeatLoader size={50} color="gray" style={{ padding: "200px 0" }} />
        )}
      </div>
    </article>
  );
};

export default AllAuthors;
