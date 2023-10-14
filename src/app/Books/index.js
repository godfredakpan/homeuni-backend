
'use client'
import React from "react";
import Image from 'next/image';
import CheckoutForm from "./CheckoutForm";
import { toast } from "react-toastify";
import { createOrders } from "@/services";

const BookList = ({ books }) => {
  const [sortedBooks, setSortedBooks] = React.useState(books);
  const [sortCategory, setSortCategory] = React.useState("All"); // Default: show all categories
  const [searchQuery, setSearchQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [booksPerPage] = React.useState(12);
  const [showCheckout, setShowCheckout] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  // Initialize cart data from sessionStorage on component mount
  React.useEffect(() => {
    const cartData = sessionStorage.getItem("cart");
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, []);

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setSortedBooks(books);
      setLoading(false)
    }
    fetchData();

  }, [books]);


  const [cart, setCart] = React.useState([]);

  // Function to sort books by category
  const sortBooksByCategory = (category) => {
    if (category === "All") {
      setSortedBooks(books); // Show all books
    } else {
      const filteredBooks = books.filter((book) =>
        book.categories.includes(category)
      );
      setSortedBooks(filteredBooks); // Show books matching the selected category
    }
    setSortCategory(category);
    setCurrentPage(1);
  };

  const searchBooks = () => {
    if (searchQuery.trim() === "") {
      setSortedBooks(books);
    } else {
      // Otherwise, filter books based on the search query
      const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSortedBooks(filteredBooks);
      setCurrentPage(1); // Reset to the first page when searching
    }
  };


  const resetSearch = () => {
    setSearchQuery(""); // Clear the search query
    setSortedBooks(books); // Show all books
  };

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to add a book to the cart
  const addToCart = (book) => {
    // Check if the book is already in the cart based on its unique identifier (e.g., id)
    const isBookInCart = cart.some((item) => item.id === book.id);

    if (!isBookInCart) {
      book.amount = Number(book.amount);
      // If the book is not in the cart, add it
      const updatedCart = [...cart, book];
      toast.success(book.title + " Added to cart!", {
        position: "top-right",
        autoClose: 3000, // Auto close the toast after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setCart(updatedCart);
      // Store updated cart data in sessionStorage
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  // Function to remove a book from the cart
  const removeFromCart = (book) => {
    const updatedCart = cart.filter((item) => item.id !== book.id);
    setCart(updatedCart);

    toast.success(book.title + " Removed from cart!", {
      position: "top-right",
      autoClose: 3000, // Auto close the toast after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += Number(item.price);
    });
    return moneyFormat(total.toFixed(2)); // Ensure the total has two decimal places
  };

  const moneyFormat = (amount) => {
    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);


    return formattedAmount;
  }

  const openCheckout = () => {
    setShowCheckout(true);
  };

  // Function to close the checkout form
  const closeCheckout = () => {
    setShowCheckout(false);
  };

  // Function to handle the checkout form submission
  const handleCheckout = async (formData) => {
    // TODO: Handle the form data submission, e.g., send it to a server
    const body = {
      buyerPhone: formData.phone,
      buyerEmail: formData.email,
      buyerName: formData.name,
      buyerAddress: formData.address,
      books: cart,
      amount: cart.reduce((total, book) => total + book.price, 0)
    }

    const response = await createOrders(body);

    if (response.status === 200) {
      setCart([]);
      closeCheckout();
      toast.success("Order sent successfully!", {
        position: "top-right",
        autoClose: 3000, // Auto close the toast after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }else{
      toast.error("Order failed, try again!", {
        position: "top-right",
        autoClose: 3000, // Auto close the toast after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };


  const myLoader = ({ src, width, quality }) => {
    return `res.cloudinary.com/${src}`
  }

  console.log('books', books)


  return (
    <div>
      {showCheckout ? (
        <CheckoutForm onClose={closeCheckout} onCheckout={handleCheckout} />
      ) : (
        <>
          <div className="mb-4" style={{ marginTop: 20 }}>

            <button
              onClick={() => sortBooksByCategory("All")}
              className={`${sortCategory === "All" ? "bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-white" : "bg-dark-200"} px-2 py-2 rounded mr-3`}
            >
              All
            </button>
            {Array.from(
              new Set(books.map((book) => book.categories).flat())
            ).map((category) => (
              <button
                style={{ marginTop: 20 }}
                key={category}
                onClick={() => sortBooksByCategory(category)}
                className={`${sortCategory === category ? "bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-white" : "bg-dark-200"} px-2 py-2 rounded mr-5`}
              >
                {category}
              </button>
            ))}
          </div><div className="mb-4">
            <input
              type="text"
              id="searchInput"
              style={{ color: 'black' }}
              placeholder="Search books by title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border border-black-300 rounded" />
            {searchQuery.trim() !== "" && (
              <>
                <button
                  onClick={searchBooks}
                  className="bg-blue-700 text-white px-2 py-1 rounded mt-2"
                >
                  Search
                </button>
                <button
                  onClick={resetSearch}
                  className="bg-gray-300 text-gray-700 px-2 py-1 rounded ml-2"
                >
                  Reset
                </button>
              </>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white shadow-md rounded-lg overflow-hidden sm:col-span-1 md:col-span-1 lg:col-span-1"
              >
                <div className="relative h-52" style={{ height: 400 }}>
                  {book.image ? (
                  <Image
                    src={book.image}

                    alt={book.title}
                    layout="fill"
                    style={{ resizeMode: 'cover' }} />
                  ):(
                    <Image
                    src={'https://static.vecteezy.com/system/resources/thumbnails/004/844/749/original/icon-loading-round-gradient-angle-loop-out-animation-with-dark-background-gradient-line-style-for-game-animation-and-others-free-video.jpg'}
                    alt={book.title}
                    layout="fill"
                    style={{ resizeMode: 'cover' }} />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-xl text-black font-semibold mb-2">{book.title}</h3>
                  <p className="text-gray-700 text-sm mb-2">Author: {book.author}</p>
                  <p className="text-gray-700 text-sm mb-2">Price: {moneyFormat(book.price)}</p>
                  <p className="text-gray-700 text-sm mb-2">
                    Categories: {book.categories.join(", ")}
                  </p>
                  <p className="text-gray-700 text-sm">{book.summary}</p>
                  <button
                    onClick={() => addToCart(book)}
                    className="bg-blue-500 text-white px-2 py-1 text-sm mt-5 sm rounded"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <ul className="flex justify-center">
              {Array.from({ length: Math.ceil(sortedBooks.length / booksPerPage) }, (_, index) => (
                <li key={index} className="mx-2">
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`${currentPage === index + 1 ? "bg-blue-800 text-white" : "bg-blue-400"} px-2 py-1 rounded`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <p className="text-xl font-semibold">
              Cart{" "}
              <span className="text-sm ml-2">({cart.length} items)</span>
            </p>
            <table style={{ borderCollapse: "collapse", border: "0" }}>
              <thead>
                <tr>
                  <th style={{ padding: "8px", borderBottom: "0.5px solid #ddd" }}>Title</th>
                  <th style={{ padding: "8px", borderBottom: "0.5px solid #ddd" }}>Price</th>
                  <th style={{ padding: "8px", borderBottom: "0.5px solid #ddd" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item?.id}>
                    <td style={{ padding: "8px", borderBottom: "0.5px solid #ddd" }}>{item?.title}</td>
                    <td style={{ padding: "8px", borderBottom: "0.5px solid #ddd" }}>{moneyFormat(item?.price)}</td>
                    <td style={{ padding: "8px", borderBottom: "0.5px solid #ddd" }}>
                      <button
                        className="bg-red-500 text-white px-3 py-2 rounded"
                        onClick={() => removeFromCart(item)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 className="mt-2">
              Total: {calculateTotal()} {/* Display the calculated total */}
            </h2>
            {cart.length > 0 && (
              <button
                onClick={openCheckout}
                style={{ marginBottom: 100 }}
                className="bg-blue-500 text-white px-3 py-2 mt-2 rounded"
              >
                Checkout
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BookList;
