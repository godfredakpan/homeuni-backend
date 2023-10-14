'use client'
import React from 'react';
import Footer from '@/components/footer'
import Image from 'next/image'
import BookList from './Books';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllBooks } from '@/services';


export default function Home() {
  const [allBooks, setBooks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
		async function fetchData() {
      setLoading(true);
			const books = await getAllBooks();
			setBooks(books as any);
      setLoading(false);

		}
		fetchData();

	}, []);

    return (
      <div className="spinner" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>

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
          
      </div>
  )
}
