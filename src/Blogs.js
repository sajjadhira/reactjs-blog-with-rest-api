import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
// import useFetech from "./useFetech";


const Blogs = () => {

    const endpoint = 'http://localhost:9000/blogs';
        // use effect for set title
        useEffect(() => {
            document.title = "All Blogs";  
          }, []);
    
    // let {data: blogs, preloader, error} = useFetech("http://localhost:9000/blogs");
    const { preloader, data, isError, error, isFetching} = useQuery('all-blogs', () => {
            return axios.get(endpoint);
    },
    {
        staleTime: 30000
    }
    );

        
    return (
        <>
        <div className="content">
        <h1 className="center">All Blogs</h1>

        
        {error && <div className="error">{error}</div>}

        {preloader && (<div className="preloader">
            <div className="preloader-content">Loading...</div>
            </div>)
            }

        {

            data?.data.map(blog =>{
                // console.log(blog.title);
                       return (<div className="blog-preview" key={blog.id} >
                        <h2><Link to={`/blogs/${blog.id}`}>{ blog.title }</Link></h2>
                        <p>Written by { blog.author }</p>
                    </div>)
                })
        }

        </div>

        </>

    );
}
export default Blogs;