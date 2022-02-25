import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetech from "./useFetech";
const Content = () => {
    let [title,seTitle] = useState("Welcome to ReactJS");
    let rank = 1;
    let welcomUser = "World";
    let [user,setUser] = useState(welcomUser);

    
    let welcomeClick = (name) =>{
        //console.log("Hello ", name);
        setUser("Sajjad");
        /*
        setBlogs([
            { title: 'My new website', body: 'lorem ipsum...', author: 'mario', id: 1 },
            { title: 'Welcome party!', body: 'lorem ipsum...', author: 'yoshi', id: 2 },
            { title: 'Web dev top tips', body: 'lorem ipsum...', author: 'mario', id: 3 }
          ]);
          */
          seTitle("Latest Blogs for You");
        
    }
    // use effect for set title
    useEffect(() => {
        document.title = "The React Blog";  
      }, []);

    let {data: blogs, preloader, error} = useFetech("http://localhost:9000/blogs");


    return ( 
        <div className="content">
            <h1 className="center">Hello {user} {title}</h1>
            <p className="center">This is number #{rank} javascript framework in the world!</p>

            <div className="center button-section">
            <button className="button-showall" onClick={() => welcomeClick("Sajjad Hossain")}>Show all Blogs</button>
            </div>

            {error && <div className="error">{error}</div>}

            {preloader && (<div className="preloader">
                <div className="preloader-content">Loading...</div>
                </div>)
                }

            {
                blogs && blogs.map(blog => (
                    <div className="blog-preview" key={blog.id} >
                    <h2><Link to={`/blogs/${blog.id}`}>{ blog.title }</Link></h2>
                    <p>Written by { blog.author }</p>
                  </div>
                ))
            }
        </div>
     );
}
 
export default Content;
