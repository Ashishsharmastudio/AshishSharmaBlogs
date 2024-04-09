import axios from "axios";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

const PopularAuthors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const { data } = await axios.get(
          "https://ashishsharmablogs.onrender.com/api/v1/user/authors",
          { withCredentials: true }
        );
        setAuthors(data.authors);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  return (
    <section className="popularAuthors">
      <h3>Popular Authors</h3>
      <div className="container">
        {loading ? (
          <BeatLoader color="gray" size={30} />
        ) : error ? (
          <div>Error: {error}</div>
        ) : authors && authors.length > 0 ? (
          authors.slice(0, 4).map((element) => (
            <div className="card" key={element._id}>
              {element.avatar && element.avatar.url ? (
                <img src={element.avatar.url} alt="author_avatar" />
              ) : null}
              <p>{element.name}</p>
              <p>{element.role}</p>
            </div>
          ))
        ) : (
          <div>No authors found.</div>
        )}
      </div>
    </section>
  );
};

export default PopularAuthors; 