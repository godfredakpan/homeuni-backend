/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from 'next/router';
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { UploadCloudinary, createBook, getBook, getUser, updateBook } from "@/services";
// import { useParams } from 'next/navigation';


import "react-toastify/dist/ReactToastify.css";
import Image from 'next/image';

const EditBook = () => {

  const [book, setBook] = useState({});
  const [id, setID] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [summary, setSummary] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (!getUser()) {
      window.location.href = "/login";
    }
  }, []);

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      if (typeof window !== 'undefined') {

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        
        const book = await getBook(id);
        setID(id);
        setBook(book);
        setAuthor(book.author)
        setTitle(book.title)
        setCategories(book.categories)
        setImage(book.image)
        setPrice(book.price)
        setSummary(book.summary)
      }
      
      setLoading(false);
    }
    fetchData();
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

    const updatedBook = {
      title,
      author,
      price: parseFloat(price),
      summary,
      categories,
      image,
    };

    const response = await updateBook(updatedBook, id);

    if (response.message) {
      toast.success("Book updated successfully");
    }

    // setTitle("");
    // setAuthor("");
    // setPrice("");
    // setSummary("");
    // setImage("");
    // setCategories([]);
    // setCategoryId("");
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

  console.log('book', book)

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-dark-600 py-2 px-6 sm:px-6 lg:px-1">
        <div className="max-w-screen-md w-full space-y-12">
        <nav
        className="items-center space-x-4 justify-center"
        style={{ marginTop: 20, marginBottom: 20 }}
      >
      {[
          ["Create Book", "/addBook"],
          ["Orders", "/orders"],
          ["Books", "/adminBooks"],
        ].map(([title, url]) => (
          <a
            key={url}
            href={url}
            className="bg-gray-500 rounded-lg px-3 py-2 text-white-700 font-medium hover:bg-slate-100 hover:text-slate-900"
          >
            {title}
          </a>
        ))}
        </nav>
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white-900">
              Edit Book
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
                placeholder="Harry Potter"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Author
              </label>
              <input
                id="author"
                name="author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Author"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Price
              </label>
              <input
                id="price"
                name="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Price"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="summary" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Summary
              </label>
              <textarea
                id="summary"
                name="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Summary"
                rows="4"
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
                <option value="Mystery">Mystery</option>
                <option value="Romance">Romance</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Biography">Biography</option>
                <option value="Self-Help">Self-Help</option>
                <option value="History">History</option>
                <option value="Thriller">Thriller</option>
                <option value="Cooking">Cooking</option>
                <option value="Travel">Travel</option>
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
                    <Image
                    src={book.image}
                    alt={book.title}
                    width={100}
                    height={100}
                    style={{ resizeMode: 'cover' }} />
                    {/* <img
                      src={image}
                      alt="Selected Image"
                      className="w-24 h-24 rounded-lg object-cover"
                    /> */}

                    
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
                {imageUploadLoading ? "Image Loading..." : "Update Book"}
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

export default EditBook;
