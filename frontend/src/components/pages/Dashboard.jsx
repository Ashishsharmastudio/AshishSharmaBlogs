import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import Sidebar from "../layout/SideBar";
import MyProfile from "../minicomponents/MyProfile";
import CreateBlog from "../minicomponents/CreateBlog";
import Chart from "../minicomponents/Chart";
import MyBlogs from "../minicomponents/MyBlogs";

const Dashboard = () => {
  const [component, setComponent] = useState("MyBlogs");
  const { mode, isAuthenticated, userData } = useContext(Context);
  if (!isAuthenticated || userData?.role === "Reader") {
    return <Navigate to={"/"} />;
  }

  return (
    <section
      className={mode === "dark" ? "dark-bg dashboard" : "light-bg dashboard"}
    >
      <Sidebar component={component} setComponent={setComponent} />
      {component === "My Profile" ? (
        <MyProfile />
      ) : component === "Create Blog" ? (
        <CreateBlog />
      ) : component === "Chart" ? (
        <Chart />
      ) : (
        <MyBlogs />
      )}
    </section>
  );
};

export default Dashboard;
