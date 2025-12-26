import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Nav from "./components/Nav";
import CreateTour from "./pages/CreateTour";
import EditTour from "./pages/EditTour";
import BlogsList from "./pages/BlogList";
import CreatePost from "./pages/CreatePost";
import EditBlog from "./pages/EditBlog";
import ToursList from "./components/ToursGrid";
import TourPage from "./pages/TourPage";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import TourDetails from "./pages/TourDetails";
import PostDetails from "./pages/PostDetails";
import Footer from "./components/Footer";
import AdminMessages from "./pages/AdminMessages";
import AdminLogin from "./pages/AdminLogin";
import AdminRoute from "./components/AdminRoute";


export default function App() {
  return (
    <>
    <Router>
      <Nav />
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Contact" element={<Contact />} />

          <Route path="/tours" element={<TourPage/>} />
          <Route path="/create-tour" element={<CreateTour />} />
          <Route path="/tour/:id" element={<TourDetails />} />

          <Route path="/edit-tour/:id" element={<EditTour />} />
          {/* ----------- BLOG ROUTES ----------- */}
          <Route path="/blogs" element={<BlogsList />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/edit-blog/:id" element={<EditBlog />} />
          <Route path="/blog/:id" element={<PostDetails />} />

          {/* add more routes: /stays /activities /contact */}
          {/* <Route path="/admin/messages" element={<AdminMessages />} /> */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
  path="/admin/messages"
  element={
    <AdminRoute>
      <AdminMessages />
    </AdminRoute>
  }
/>

        </Routes>
      </div>
      <Footer/>
    </Router>
  <ToastContainer
        position="top-right"       // position
        autoClose={3000}           // 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="light"              // light/dark/colored
      />
    </>
  );
}
