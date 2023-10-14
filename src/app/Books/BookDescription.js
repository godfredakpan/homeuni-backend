import React from "react";

const BookDescription = ({ book, addToCart }) => {
  return (
    <div className="bg-white p-4">
      <h2 className="text-2xl font-semibold">{book.title}</h2>
      <p className="text-gray-600">Author: {book.author}</p>
      <p className="text-gray-600">Price: ${book.price}</p>
      <p className="text-gray-600">Categories: {book.categories.join(", ")}</p>
      <p className="text-gray-600">{book.summary}</p>
      <button
        onClick={() => addToCart(book)}
        className="bg-blue-500 text-white px-3 py-2 mt-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default BookDescription;