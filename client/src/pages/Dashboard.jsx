import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../component/DashSidebar";
import DashProfile from "../component/DashProfile";
import DashPosts from "../component/DashPosts";
import DashUsers from "../component/DashUsers";
import DashComments from "../component/DashComments";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    // console.log(tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile */}
      {tab === "profile" && <DashProfile />}
      {/* posts */}
      {tab === "posts" && <DashPosts />}
      {/* uses */}
      {tab === "users" && <DashUsers />}
      {/* comments */}
      {tab === "comments" && <DashComments />}
    </div>
  );
}
