import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Spinner } from "flowbite-react";
import CallToAction from "../component/CallToAction";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPost] = useState(null);
  // console.log('this is post', posts && posts.title);
  useEffect(() => {
    // console.log('this is slug',postSlug);
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getPosts?slug=${postSlug}`);
        const data = await res.json();
        console.log("this is data", data);
        if (!res.ok) {
          setError(data);
          setLoading(false);
          return;
        }
        if (data.posts && data.posts.length > 0) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen ">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {posts && posts.title}
      </h1>
      <Link
        to={`/search?category=${posts && posts.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill-size="xs">
          {posts && posts.category}
        </Button>
      </Link>
      <img
        src={posts && posts.image}
        alt={posts && posts.title}
        className="self-center mt-10 max-w-3xl p-3 max-h-[600px] w-full object-contain"
      />
      <div className="flex justify-between p-3 border-b border-slate-300 mx-auto w-full max-w-2xl text-xs">
        <span>{posts && new Date(posts.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {posts && (posts.content.length / 1000).toFixed(0)}, mins read
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: posts && posts.content }}
      ></div>
      <div className="mt-10 max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
    </main>
  );
}
