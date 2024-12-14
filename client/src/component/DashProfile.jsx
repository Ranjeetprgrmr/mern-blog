import { Alert, Button, TextInput } from "flowbite-react";
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [ updateUserError, setUpdateUserError] = useState(null);
  const filePickerRef = useRef();
  const dispatch = useDispatch();

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
      setFormData({ ...formData, profilePicture: reader.result });
    }
  };

  const handleImageUploadComplete = () => {
    setIsUploading(false);
    setPercentage(100);
  };
  // console.log("this is imageFile", imageFile);
  // console.log("this is imageFileUrl", imageFileUrl);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("Please fill all fields");
      return;
    }
    try {
      const profilePicture = localStorage.getItem("profilePicture");
      const data = { ...formData, profilePicture };
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(responseData.message));
        setUpdateUserError(responseData.message);
      } else {
        dispatch(updateSuccess(responseData));
        setUpdateUserSuccess("User updated successfully");
        setUpdateUserError(null);
        setTimeout(() => {
          setUpdateUserSuccess(null); // Clear the success message
        }, 3000); // Clear after 3 seconds

      }
      
      console.log(responseData);
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">profile</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center"
      >
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
            ></div>
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
          style={{ width: "400px" }}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          style={{ width: "400px" }}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          style={{ width: "400px" }}
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone="cyanToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
      {updateUserSuccess && (
        <Alert color='success' className="mt-5">{updateUserSuccess}</Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className="mt-5">{updateUserError}</Alert>
      )}
    </div>
  );
}
