/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { UploadCloudinary, createBook, getUser } from "@/services";
import  createCollection  from "../../fauna/createCollections"
import "react-toastify/dist/ReactToastify.css";

const addCollection = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [image, setImage] = useState(null);

  React.useEffect(() => {
		if (!getUser()) {
			window.location.href = "/login";
		}
	}, []);

  // Function to handle image selection
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageUploadLoading(true);
      const upload = await UploadCloudinary(file);
      // const convertedFile = await Convert(file) // switch this to use base64
      // setResume(upload.secure_url);
      setImage(upload.secure_url);
      setImageUploadLoading(false);
    }
  };

  // Remove the selected image
  const removeImage = () => {
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCollection = {
      title,
      description,
      category: categories,
      image,
    };

    const response = await createCollection(newCollection);

    if (response.ts) {
      toast.success("Collection created successfully");
    }

    setTitle("");
    setDescription("");
    setImage("");
    setCategories([]);
    setCategoryId("");
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    if (!categories.includes(selectedCategory)) {
      setCategories([...categories, selectedCategory]);
    }
    setCategoryId("");
  };

  const removeCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  return (
    <>
      <ToastContainer />
      <nav className="flex sm:justify-center space-x-4" style={{marginTop: 20}}>
        {[
          ["Create Collection", "/addCollection"],
          ["Create Course", "/addCourse"],
          ["Users", "/users"],
          ["Courses", "/courses"],
          ["Collections", "/collections"],
          // ['Reports', '/reports'],
        ].map(([title, url]) => (
          <a key={url} href={url} className="bg-gray-500 rounded-lg px-3 py-2 text-white-700 font-medium hover:bg-slate-100 hover:text-slate-900">{title}</a>
        ))}
      </nav>
      <div className="min-h-screen flex items-center justify-center bg-dark-600 py-2 px-6 sm:px-6 lg:px-1">
        <div className="max-w-screen-md w-full space-y-12">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white-900">
              Add Collection
            </h2>
          </div>
          <form className="mt-8 space-y-10" onSubmit={handleSubmit}>
            <div className="mb-6">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Philosophy"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Description
                </label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Great Course!"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Categories
                </label>
                <select
                  id="category"
                  name="category"
                  value={categoryId}
                  onChange={handleCategoryChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                  <option value="Literature">Literature</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="Geography">Geography</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Economics">Economics</option>
                  <option value="Psychology">Psychology</option>
                  <option value="Philosophy">Philosophy</option>
                  <option value="Art History">Art History</option>
                  <option value="Language">Language</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Political Science">Political Science</option>
                  <option value="Sociology">Sociology</option>
                  <option value="Education">Education</option>
                  <option value="Health Sciences">Health Sciences</option>
                  <option value="Law">Law</option>
                  <option value="Business">Business</option>
                  <option value="Music">Music</option>
                  <option value="Physical Education">Physical Education</option>
                  <option value="Environmental Studies">Environmental Studies</option>
                  <option value="Theater Arts">Theater Arts</option>
                  <option value="Astronomy">Astronomy</option>
                  <option value="Philology">Philology</option>
                  <option value="Anthropology">Anthropology</option>
                  <option value="Library Science">Library Science</option>
                  <option value="Nutrition">Nutrition</option>
                  <option value="Archaeology">Archaeology</option>
                  <option value="Social Work">Social Work</option>
                  <option value="Fine Arts">Fine Arts</option>
                  <option value="Religious Studies">Religious Studies</option>
                  <option value="Meteorology">Meteorology</option>
                  <option value="Gender Studies">Gender Studies</option>
                  <option value="Criminal Justice">Criminal Justice</option>
                  <option value="Public Health">Public Health</option>
                  <option value="Ethics">Ethics</option>
                  <option value="Architectural Studies">Architectural Studies</option>
                  {/* Add more categories as needed */}
                </select>
              </div>
              <div className="m-6">
                Selected Categories:
                {categories.map((category, index) => (
                  <span
                    key={index}
                    className="ml-2 text-white-900 cursor-pointer clickable-category underline"
                    onClick={() => removeCategory(index)}
                  >
                    {category} (x)
                  </span>
                ))}
              </div>
            {/* </div> */}
            <div>
              <div className="mb-6">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-white-700"
                >
                  Image Upload:
                </label>
                {image ? (
                  <div className="mt-2 flex items-center space-x-2">
                    <img
                      src={image}
                      alt="Selected Image"
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                )}
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                style={{ marginTop: 20 }}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {imageUploadLoading ? "Image Loading..." : "Add Collection"}
              </button>
              <a
                style={{ marginTop: 20 }}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                href="/adminBooks"
                rel="noopener noreferrer"
              >
                Go back
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default addCollection;
