import { useEffect } from "react";
const NotFound = () => {
// use effects for set title
    useEffect(() => {
        document.title = "404 Not Found!";  
      }, []);

    return ( 
        <div className="content center">
            <h2>404 Not Found!</h2>
            <p>Your requested link not found!</p>
        </div>
     );
}
 
export default NotFound;