import React, { useEffect } from "react";
import { useState } from "react";
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";

export default function DashboardComponent() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);
  const [totalPosts, setTotalPosts] = useState([]);
  const [totalComments, setTotalComments] = useState([]);
  const [lastMonthUsers, setLastMonthUsers] = useState([]);
  const [lastMonthPosts, setLastMonthPosts] = useState([]);
  const [lastMonthComments, setLastMonthComments] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/user/getusers?limit=5");
      const data = await res.json();
      try {
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts?limit=5");
      const data = await res.json();
      try {
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      const res = await fetch("/api/comment/getcomments?limit=5");
      const data = await res.json();
      try {
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  return (
    <div className="p-3 md:mx-auto">
        <div className="flex-wrap flex gap-4 justify-center">

            <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md  shadow-md">
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
                        <p className="text-2xl">{totalUsers}</p>
                    </div>
                    <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
                </div>
                <div className="flex gap-2 text-sm">
                    <span className="text-green-500 flex items-center">
                        <HiArrowNarrowUp />
                        {lastMonthUsers}
                    </span>
                    <div className="text-gray-500">Last month</div>
                </div>
            </div>

            <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md  shadow-md">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="text-gray-500 text-md uppercase">Total Comments</h3>
                            <p className="text-2xl">{totalComments}</p>
                        </div>
                        <HiAnnotation className="bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg" />
                    </div>
                    <div className="flex gap-2 text-sm">
                        <span className="text-green-500 flex items-center">
                            <HiArrowNarrowUp />
                            {lastMonthComments}
                        </span>
                        <div className="text-gray-500">Last month</div>
                </div>
            </div>

            <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md  shadow-md">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
                            <p className="text-2xl">{totalPosts}</p>
                        </div>
                        <HiDocumentText className="bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg" />
                    </div>
                    <div className="flex gap-2 text-sm">
                        <span className="text-green-500 flex items-center">
                            <HiArrowNarrowUp />
                            {lastMonthPosts}
                        </span>
                        <div className="text-gray-500">Last month</div>
                </div>
            </div>

        </div>
        <div className="flex-wrap flex gap-4 py-3 mx-auto justify-center">
            <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
                <div className="flex justify-between p-3 text-sm font-semibold ">
                    <h1 className="text-center p-2">Recent users</h1>
                    <Button outline gradientDuoTone='purpleToPink'>
                        <Link to={'/dashboard?tab=users'}>
                        See all
                        </Link>
                    </Button>
                </div>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell> User image</Table.HeadCell>
                        <Table.HeadCell>Username</Table.HeadCell>
                       
                    </Table.Head>
                        {users && users.map((user) => (
                    <Table.Body className="divide-y">
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={user._id}>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    <img className="w-10 h-10 rounded-full" src={user.profilePicture} alt="" /> 
                                   
                                </Table.Cell>
                                <Table.Cell> {user.username}</Table.Cell>
                            
                            </Table.Row>
                    </Table.Body>
                        ))}
                </Table>
            </div>

            <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
                <div className="flex justify-between p-3 text-sm font-semibold ">
                    <h1 className="text-center p-2">Recent comments</h1>
                    <Button outline gradientDuoTone='purpleToPink'>
                        <Link to={'/dashboard?tab=comments'}>
                        See all
                        </Link>
                    </Button>
                </div>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Comment content</Table.HeadCell>
                        <Table.HeadCell>Likes</Table.HeadCell>
                      
                    </Table.Head>
                        {comments && comments.map((comment) => (
                    <Table.Body className="divide-y">
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={comment._id}>
                                <Table.Cell className="w-96">
                                   <p className="line-clamp-2">{comment.content}</p>                    
                                </Table.Cell>
                                <Table.Cell> {comment.numberOfLikes}</Table.Cell>
                               
                            </Table.Row>
                    </Table.Body>
                        ))}
                </Table>
            </div>

            <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
                <div className="flex justify-between p-3 text-sm font-semibold ">
                    <h1 className="text-center p-2">Recent posts</h1>
                    <Button outline gradientDuoTone='purpleToPink'>
                        <Link to={'/dashboard?tab=posts'}>
                        See all
                        </Link>
                    </Button>
                </div>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Post Image</Table.HeadCell>
                        <Table.HeadCell>Post Title</Table.HeadCell>
                        <Table.HeadCell>Category</Table.HeadCell>
                     
                    </Table.Head>
                        {posts && posts.map((post) => (
                    <Table.Body className="divide-y">
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={post._id}>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    <img className="w-10 h-10 rounded-full" src={post.image} alt="" /> 
                                   
                                </Table.Cell>
                                <Table.Cell className="w-96">{post.title}</Table.Cell>
                                <Table.Cell className="w-5">{post.category}</Table.Cell>
                               
                            </Table.Row>
                    </Table.Body>
                        ))}
                </Table>
            </div>

        </div>
    </div>
  );
}
