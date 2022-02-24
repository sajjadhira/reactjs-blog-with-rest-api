import { useState, useEffect } from "react";
const Create = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [preloader,setPreloader] = useState(false);
    const [error,setError] = useState(false);
    const [success,setSuccess] = useState(false);

    const handleSubmit = (e) => {
        
        e.preventDefault();

        setPreloader(true);

        let blog = {title, body, author};
        let res = null;

        fetch("http://localhost:9000/blogs",{
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(blog)
        }).then(
            res =>  {
                if(!res.ok){
                    throw Error("Couldn't fetch API request!");
                }

                setPreloader(false)
                // console.log(res);
                if(res.statusText == "Created"){

                    setSuccess("Blog has been added successfully");
                    setTitle('');
                    setAuthor('');
                    setBody('');
                    setBody('');
                }
            }
        ).catch(
            err => {
                setPreloader(false)
                setError(err.message);
            }
        )

    }

    useEffect(() => {
        document.title = "Add new Blog";  
      }, []);

    return ( 
        <div className="content">
            <div className="create center">
                <h2>Add new Blog</h2>
                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}
{/* 
                {preloader && 
                    (<div className="preloader">
                    <div className="preloader-content">Loading...</div>
                    </div>)
                } */}
                <form onSubmit={handleSubmit}>
                    <label>Blog title:</label>
                    <input 
                    type="text" 
                    required 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                    <label>Blog body:</label>
                    <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                    <label>Blog author:</label>
                    <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    >
                    <option value="">Select Author</option>
                    <option value="sajjad">Sajjad</option>
                    <option value="ridi">Ridi</option>
                    </select>
                    {preloader && <button disabled>Adding Blog...</button>}
                    {!preloader && <button>Add Blog</button>}
                </form>

            </div>
        </div>
     );
}
 
export default Create;
