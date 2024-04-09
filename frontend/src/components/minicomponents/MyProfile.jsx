import React, { useContext } from "react";
import { Context } from "../../main";

const MyProfile = () => {
  const { userData } = useContext(Context);
  return (
    <section className="profile">
      <div className="avatar">
        <img src={userData && userData.avatar.url} alt="avatar" />
      </div>
      <div className="user-detail">
        <p>
          Name: <span>{userData.name}</span>
        </p>
        <p>
          Email: <span>{userData.email}</span>
        </p>
        <p>
          Phone: <span>{userData.phone}</span>
        </p>
        <p>
          Role: <span>{userData.role}</span>
        </p>
      </div>
    </section>
  );
};

export default MyProfile;