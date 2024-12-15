import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [formData, setFormData] = useState({});
  const [imageUploadError, setImageUploadError] = useState(null);

  useEffect(() => {
    const storedImage = localStorage.getItem("image");
    if (storedImage) {
      setImageFileUrl(storedImage);
    }
  }, []);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    try {
      console.log("File value:", file);
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
  console.log("this is formdata", formData);
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">Select a category</option>
            <option value="javascript">Javascript</option>
            <option value="ReactJs">ReactJs</option>
            <option value="NextJs">NextJs</option>
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
        {formData.image && (
          <img src={imageFileUrl} alt="Uploaded" className="w-full h-[600px]" />
        )}
        {isUploading ? (
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
        ) : null}
        {imageUploadError && <p className="text-red-500">{imageUploadError}</p>}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" size="sm" outline>
          Publish
        </Button>
      </form>
    </div>
  );
}
