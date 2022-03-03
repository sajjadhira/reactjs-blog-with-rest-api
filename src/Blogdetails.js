import { useParams } from "react-router-dom";
import useFetech from "./useFetech";
import { useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
const Blogdetails = () => {
    let { id } = useParams();
    // let {data:blog,preloader,error} = useFetech("http://localhost:9000/blogs/" + id);
    // let title = blog.title;

    const endpoint = 'http://localhost:9000/blogs/' + id;



    const {preloader, data:blog, isError, error, isFetching} = useQuery('blog-'+id, () => {
        return axios.get(endpoint);
    },
    {
        staleTime: 30000
    }
    );

    
    useEffect(() => {
        if(!isFetching){
        document.title = blog.data.title;
        }
      }, [blog]);

    const handleClick = () => {

        fetch("http://localhost:9000/blogs/" + id, {
            method: 'DELETE'
        }).then(
            res => {
                // console.log(res);

                setTimeout(
                    () => {
                        // console.log("Redirection");
                        window.location.href = '/';
                    },
                    2000
                )
                
            }
        )
    }


    // <div className="content">
    // <div className="blog-details">
        
//         {error && <div className="error">{error}</div>}

//         {preloader && 
//             (<div className="preloader">
//             <div className="preloader-content">Loading...</div>
//             </div>)
//         }
        
        // {blog && 
        // (<article>
        //     <h2 className="center">{blog.title}</h2>
        //     <p className="center">Author: {blog.author}</p>
        //     <br/>
        //     <div>{blog.body}</div>

        //     <div className="delete">

        //         <button onClick={handleClick}>Delete Blog</button>

        //     </div>
        // </article>)
        // }

//     </div>
// </div>


    return ( 
        <>     
        <div className="content">
        <div className="blog-details">
        {isError && <div className="error">{error.message}</div>}

        {preloader && 
                <div className="preloader">
                     <div className="preloader-content">Loading...</div>
                </div>       
        }

        {
        !isFetching &&
        <article>
            <h2 className="center">{blog.data.title}</h2>
            <p className="center">Author: {blog.data.author}</p>
            <br/>
            <div>{blog.data.body}</div>

            <div className="delete">

                <button onClick={handleClick}>Delete Blog</button>

            </div>
        </article>


        }
        </div>
        </div>

        </>
     );
}
 
export default Blogdetails;