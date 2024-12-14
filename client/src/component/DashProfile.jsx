import { Button, TextInput } from "flowbite-react";
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const filePickerRef = useRef();

  useEffect(() => {
    const storedImage = localStorage.getItem("profilePicture");
    if (storedImage) {
      setImageFileUrl(storedImage);
    }
  }, []);

  const handleImageChange = async (e) => {
    // setImageFile(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onload = () => {
        localStorage.setItem("profilePicture", reader.result);
        handleImageUploadComplete();
      };
      reader.onprogress = (e) => {
        const progress = (e.loaded / e.total) * 100;
        setPercentage(progress);
      };
      await new Promise((resolve) => setTimeout(resolve, 1000)); // add a 5 second delay
      reader.readAsDataURL(file);
    }
  };

  const handleImageUploadComplete = () => {
    setIsUploading(false);
    setPercentage(100);
  };
  // console.log("this is imageFile", imageFile);
  // console.log("this is imageFileUrl", imageFileUrl);

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">profile</h1>
      <form className="flex flex-col gap-4 items-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full object-cover border-8 border-slate-200 shadow-md"
          />
        </div>
        {isUploading && (
          <div className="w-full bg-gray-200 rounded-full h-4 flex justify-between">
            <div
              className="bg-blue-500 rounded-full h-4 p-2 "
              style={{ width: `${percentage}%` }}
            >
            </div>
              <span className="text-gray-500 text-xs">{percentage}%</span>
            {/* <span className="text-gray-500 text-xs absolute right-0 top-0 mt-2">
              {percentage}%
            </span> */}
          </div>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <TextInput type="password" id="password" placeholder="password" />
        <Button type="submit" gradientDuoTone="cyanToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
