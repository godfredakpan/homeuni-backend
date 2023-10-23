/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { UploadCloudinary, createBook, getUser } from "@/services";
import  createLesson  from "../../fauna/createLesson";
import "react-toastify/dist/ReactToastify.css";
import getAllCollections from "@/fauna/getCollections";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [collections, setCollections] = useState([]);
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [image, setImage] = useState(null);

  React.useEffect(() => {
		if (!getUser()) {
			window.location.href = "/login";
		}
	}, []);


  React.useEffect(() => {
    async function fetchData() {

      const collections = await getAllCollections();
            const reformedCollection = collections.map((collection) => {
                return { ...collection.data, id: collection.ref.id };
            });
            setCollections(reformedCollection);

    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newLesson = {
      title,
      url,
      category: category,
      description
    };

    const response = await createLesson(newLesson);

    if (response.ts) {
      toast.success("Cause created successfully");
    }

    setTitle("");
    setImage("");
    setCategory('');
    setDescription("");
    setCategoryId("");
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory)
    // if (!categories.includes(selectedCategory)) {
    //   setCategory([...categories, selectedCategory]);
    // }
    setCategoryId("");
  };

  const removeCategory = (index) => {
    // const updatedCategories = [...categories];
    // updatedCategories.splice(index, 1);
    setCategory('');
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
              Add Course
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
                  placeholder="Study Philosophy"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Youtube URL
                </label>
                <input
                  id="url"
                  name="url"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="YouTube Link"
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
                  {collections.map((collection) => (
                  <option value={collection.title}>{collection.title}</option>
                  ))}
                </select>
              </div>
              <div className="m-6">
                Selected Categories: {category}
                {/* {categories.map((category, index) => (
                  <span
                    key={index}
                    className="ml-2 text-white-900 cursor-pointer clickable-category underline"
                    onClick={() => removeCategory(index)}
                  >
                    {category} (x)
                  </span>
                ))} */}
              </div>
            {/* </div> */}
            <div>

              <button
                type="submit"
                onClick={handleSubmit}
                style={{ marginTop: 20 }}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {imageUploadLoading ? "Image Loading..." : "Add Course"}
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

export default AddBook;
