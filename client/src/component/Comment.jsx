import React, { useEffect, useState } from "react";
import moment from "moment";

export default function Comment({ comment }) {
  const [user, setUser] = useState({});
  console.log(user);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);
  return (
    <div className="flex items-center p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          src={user.profilePicture}
          alt={user.username}
          className="w-10 h-10 rounded-full bg-red-200"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center  mb-2">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "anonymous useruser"}
          </span>
          <span className="text-xs text-gray-500 pb-1">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
      <p>{comment.content}</p>
      </div>
    </div>
  );
}
