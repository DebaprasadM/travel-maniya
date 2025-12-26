import Nav from "../components/Nav";
import Hero from "../components/Hero";
import ToursGrid from "../components/ToursGrid";
import Footer from "../components/Footer";
import sampleData from "../data/sampleTours";
import BlogGrid from "../components/BlogGrid";
import blogData from "../data/blogData";
import BlogsList from "./BlogList";

export default function Home(){
  return (
    <>
       
      <main>
        <Hero />
        <ToursGrid  />
        {/* <BlogGrid posts={blogData} /> */}
        <BlogsList/>
        {/* Add testimonials, newsletter, info blocks as needed */}
      </main>
    
     
    </>
  )
}
