import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import { Alert } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [percentage, setPercentage] = useState(0);

  //   I'm glad that worked for you.
  // By adding the _id property to the formData object, you ensured that it had the necessary property to access the postId value.
  // This is a good example of how to initialize state with props in React. By using the postId prop to initialize the _id property of the formData object, you were able to access the postId value in your API request.
  // If you have any more questions or need further assistance, feel free to ask!
  const { postId } = useParams();
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    _id: postId, // Add the _id property to the formData object
    title: "",
    category: "",
    content: "",
    image: "",
  });
  console.log("this is formdata", formData);

  const [imageUploadError, setImageUploadError] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getPosts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.posts[0]);
          if (data.posts[0].image) {
            setImageFileUrl(data.posts[0].image);
          } else {
            setImageFileUrl(null);
          }
        }
      };
      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    try {
      if (!file || file === null || file === undefined) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      setIsUploading(true);
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        localStorage.setItem("image", reader.result);
        // setFormData({ ...formData, image: reader.result });
        // setImageFileUrl(reader.result); // Update imageFileUrl state variable
        handleImageUploadComplete();
      };
      reader.onprogress = (e) => {
        const progress = (e.loaded / e.total) * 100;
        setPercentage(progress);
      };
      await new Promise((resolve) => setTimeout(resolve, 1000)); // add a 5 second delay

      setFormData({ ...formData, image: reader.result });
    } catch (error) {
      console.log(error);
      setImageUploadError("Please select an image");
    }
  };

  const handleImageUploadComplete = () => {
    setIsUploading(false);
    setPercentage(100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("this is formdata._id", formData._id);
      const res = await fetch(
        `/api/post/updatePost/${formData._id}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log("Error response:", res);
        console.log("Error data:", data);
        setPublishError(data);
      }

      if (res.ok) {
        console.log("Success!");
        setPublishError(null);
        setMessage("Your post has been published successfully!");
        setTimeout(() => {
          setMessage("");
        }, 3000); // hide message after 3 seconds
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong. Please try again later.");
    }
  };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update a post</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category}
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
            <option value="nodejs">Node.js</option>
            <option value="mongodb">MongoDB</option>
            <option value="expressjs">Express.js</option>
            <option value="tailwindcss">TailwindCss</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teat-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleImageUpload}
            disabled={isUploading}
          >
            Upload Image
          </Button>
        </div>
        {formData.image ? (
          <img
            src={formData.image || imageFileUrl}
            alt="Uploaded"
            className="w-full h-[600px]"
          />
        ) : (
          <>
            {imageFileUrl && <img src={imageFileUrl} alt="post image" />}
          </>
        )}

        {isUploading ? (
          <div className="w-full bg-gray-200 rounded-full h-4 flex justify-between">
            <div
              className="bg-blue-500 rounded-full h-4 p-2 "
              style={{ width: `${percentage}%` }}
            ></div>
            <span className="text-gray-500 text-xs">{percentage}%</span>
          </div>
        ) : null}
        {imageUploadError && <p className="text-red-500">{imageUploadError}</p>}
        <ReactQuill
          value={formData.content}
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" size="sm" outline>
          Update Post
        </Button>
        {publishError && (
          <Alert className="text-red-500 mt-5">{publishError}</Alert>
        )}
        {message && <Alert className="text-green-500 mt-5">{message}</Alert>}
      </form>
    </div>
  );
}
