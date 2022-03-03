import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
// import useFetech from "./useFetech";
const Content = () => {
    let [title,seTitle] = useState("Welcome to ReactJS");
    let rank = 1;
    let welcomUser = "World";
    let [user,setUser] = useState(welcomUser);
    // let [error,setError] = useState(false);
    // let [preloader,setPreloader] = useState(false);

    const endpoint = 'http://localhost:9000/blogs';
    // use effect for set title
    useEffect(() => {
        document.title = "The React Blog";
        
        
      }, []);

    // let {data: blogs, preloader, error} = useFetech("http://localhost:9000/blogs");


    const {preloader, data, isError, error, isFetching} = useQuery('home-blogs', () => {
        return axios.get(endpoint);
     },
     {
        staleTime: 3000,
        refetchInterval: 5000,
        refetchOnWindowFocus: true,
        refetchIntervalInBackground: true
     }
     );

    return ( 
        <>
            <div className="content">
                <h1 className="center">Hello {user} {title}</h1>
                <p className="center">This is number #{rank} javascript framework in the world!</p>
            {isError && <div className="error">{error.message}</div>}
            {isFetching && 
                            <div className="preloader">
                            <div className="preloader-content">Fetching Data...</div>
                       </div>
            }
             
             {preloader && 
                <div className="preloader">
                     <div className="preloader-content">Loading...</div>
                </div>
                        
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
        // <div className="content">
        //     <h1 className="center">Hello {user} {title}</h1>
        //     <p className="center">This is number #{rank} javascript framework in the world!</p>

        //     {error && <div className="error">{error}</div>}

        //     {preloader && (<div className="preloader">
        //         <div className="preloader-content">Loading...</div>
        //         </div>)
        //         }

        //     {
        //         blogs && blogs.map(blog => (
        //             <div className="blog-preview" key={blog.id} >
        //             <h2><Link to={`/blogs/${blog.id}`}>{ blog.title }</Link></h2>
        //             <p>Written by { blog.author }</p>
        //           </div>
        //         ))
        //     }
        // </div>
     );
}
 
export default Content;
