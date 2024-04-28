import { BeatLoader } from "react-spinners";
import { Context } from "../../main";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const AllAuthors = () => {
  const { mode } = useContext(Context);
  const [authors, setAuthors] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const featchAuthors = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "https://ashishsharmablogs-1.onrender.com/api/v1/user/authors",
          { withCredentials: true }
        );
        setAuthors(data.authors);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    featchAuthors();
  }, []);

  return (
    <article
      className={
        mode === "dark"? "dark-bg all-authors" : "light-bg all-authors"
      }
    >
      <h2>ALL AUTHORS</h2>
      <div className="container">
        {loading? (
          <BeatLoader size={50} color="gray" style={{ padding: "200px 0" }} />
        ) : error? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          authors.map((element) => {
            return (
              <div className="card" key={element._id}>
                <img src={element.avatar?.url} alt="author_avatar" />
                <h3>{element.name}</h3>
                <p>{element.role}</p>
              </div>
            );
          })
        )}
      </div>
    </article>
  );
};

export default AllAuthors;