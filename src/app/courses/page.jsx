'use client'
import React, { useState, useEffect } from "react";
import { deleteBook, getAllBooks, getUser } from "@/services";
import ReactPaginate from 'react-paginate';
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import { ToastContainer, toast } from "react-toastify";
import getAllCourses from "../../fauna/getLessons";
// import {ReactPlayer} from 'react-player/youtube'
import dynamic from 'next/dynamic';

import deleteCollection from '../../fauna/deleteCollection'

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

const Courses = () => {
  const [allLessons, setCollection] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [booksPerPage] = useState(10); // Number of books to display per page
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term
  const [filteredBooks, setFilteredLessons] = useState([]); // State to store filtered books
  const [sortBy, setSortBy] = useState(""); // State to store the selected sort option
  const [sortByCategory, setSortByCategory] = useState(""); // State to store the selected category for sorting
  const [hasWindow, setHasWindow] = React.useState(false);
  useEffect(() => {
    if (!getUser()) {
      window.location.href = "/login";
    }
  }, []);


    React.useEffect(() => {
      if (typeof window !== "undefined") {
        setHasWindow(true);
      }
    }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // const books = await getAllBooks();
      const courses = await getAllCourses();
      const reformedCollection = courses.map((course) => {
          return { ...course.data, id: course.ref.id };
      });
      setCollection(reformedCollection);
      // setBooks(books);
      setLoading(false);
    }
    fetchData();
  }, []);

  const deleteFunction = async (id) => {
    // Display a confirmation dialog
    const userConfirmed = window.confirm("Are you sure you want to delete this item?");
  
    // Check if the user confirmed
    if (userConfirmed) {
      const response = await deleteCollection('lessons', id);
  
      if (response) {
        toast.success("Course deleted successfully");
      }
    } else {
      // Handle the case where the user canceled the deletion
      toast.info("Deletion canceled");
    }
  };
  

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  useEffect(() => {
    // Filter books based on the search term
    const filtered = allLessons.filter((lesson) =>
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort books based on the selected option
    let sortedLessons = [...filtered];

    if (sortBy === "title") {
      sortedLessons.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "author") {
      sortedLessons.sort((a, b) => a.author.localeCompare(b.author));
    } else if (sortBy === "price") {
      sortedLessons.sort((a, b) => a.price - b.price);
    } else if (sortBy === "category") {
      sortedLessons.sort((a, b) => a.category.localeCompare(b.category));
    }

    setFilteredLessons(sortedLessons);
  }, [searchTerm, sortBy, allLessons]);

  const indexOfLastBook = (currentPage + 1) * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentLessons = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Function to handle search input change
  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
  };

  // Function to handle sorting by title, author, price, or category
  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortBy(selectedOption);

    if (selectedOption === "category") {
      const selectedCategory = e.target.options[e.target.selectedIndex].getAttribute("data-category");
      setSortByCategory(selectedCategory);
    } else {
      setSortByCategory(""); // Reset category sorting
    }
  };

  return (
    <>
     <ToastContainer />
      <main className="min-h-screen flex-col items-center justify-between" style={{ margin: 20 }}>
        <nav className="items-center space-x-4 justify-center" style={{ marginTop: 20, marginBottom: 20 }}>
          {[
            ["Create Collection", "/addCollection"],
            ["Create Course", "/addCourse"],
            ["Users", "/users"],
            ["Courses", "/courses"],
            ["Collections", "/collections"],
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
        <h1 className="text-3xl font-bold mb-4">Courses List</h1>

        {/* Search input */}
        <div style={{marginBottom: 20}}>
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchTerm}
          style={{marginRight: 20}}
          onChange={handleSearchChange}
          className="border rounded-lg p-2 text-black"
        />

        {/* Sorting dropdown */}
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="border rounded-lg p-2 text-black"
        >
          <option value="">Sort by</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="price">Price</option>
          {/* <option value="category">Category</option> */}
        </select>

        {/* Category dropdown (only visible when sorting by category) */}
        {sortBy === "category" && (
          <select
            value={sortByCategory}
            onChange={(e) => setSortByCategory(e.target.value)}
            className="border rounded-lg p-2"
          >
            <option value="">Select a category</option>
            {Array.from(new Set(allLessons.map((lesson) => lesson.category))).map((category) => (
              <option key={category} value={category} data-category={category}>
                {category}
              </option>
            ))}
          </select>
        )}
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Title</th>
                {/* <th scope="col" className="px-6 py-3">Author</th> */}
                {/* <th scope="col" className="px-6 py-3">Price</th> */}
                <th scope="col" className="px-6 py-3">Category</th>
                <th scope="col" className="px-6 py-3">Video</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentLessons.map((lesson) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={lesson.id}>
                  <td className="px-6 py-4">{lesson?.title}</td>
                  <td className="px-6 py-4">{lesson?.category}</td>

                  <td className="px-6 py-4">
                  {hasWindow && (
                  <ReactPlayer controls={true} width={300} height={200} url={lesson?.url} />
                  )}
                  </td>
                  
                  <td className="px-6 py-4">
                    {/* <Link
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-1"
                      href={{
                        pathname: 'editBook',
                        query: { id: lesson.id },
                      }}
                    >Edit</Link> */}
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => deleteFunction(lesson.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ReactPaginate
          pageCount={Math.ceil(filteredBooks.length / booksPerPage)}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName={"flex justify-center space-x-2 mt-4"} // Style the container
          pageClassName={"bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"} // Style the page button
          activeClassName={"bg-blue-600"} // Style the active page button
          previousClassName={"bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"} // Style the previous button
          nextClassName={"bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"} // Style the next button
          breakClassName={"bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"} // Style the break button
          disabledClassName={"bg-gray-300 text-gray-500 cursor-not-allowed"} // Style the disabled button
        />
      </main>
      <Footer />
    </>
  );
};

export default Courses;