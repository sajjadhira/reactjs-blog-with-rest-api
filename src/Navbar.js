import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <Link to="/"><h1>The React Blog</h1></Link>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/all">All Blogs</Link>
                <Link to="/create">New Blog</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;