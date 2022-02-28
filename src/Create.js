import { useState, useEffect } from "react";
const Create = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [attachment, setAttachment] = useState('');
    const [video, setVideo] = useState('');
    const [preloader,setPreloader] = useState(false);
    const [error,setError] = useState(false);
    const [success,setSuccess] = useState(false);


    useEffect(() => {
        document.title = "Add new Blog";  
      }, []);

    const handleSubmit = (e) => {
        
        e.preventDefault();

        setPreloader(true);
//
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

    const handleFile = (e) =>{
            if(e.target.files && e.target.files[0]){
                const file = URL.createObjectURL(e.target.files[0]);
                const type = e.target.files[0].type;


                console.log(file);
                
                console.log(type);
                if(type == 'image/jpeg'){
                    setAttachment(file);
                    setVideo('');
                }else if (type == 'video/mp4'){
                    setVideo(file);
                    setAttachment('');
                }
            }
    }

    const closePreview = () => {
        setAttachment('');
        setVideo('')
    }



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

                    <label>Attachment:</label>
                    <input
                    type="file"
                    onChange={handleFile}
                    />

                    <label>Blog author:</label>
                    <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    >              
                    <option value="">Select Author</option>
                    <option value="sajjad">Sajjad</option>
                    <option value="rajib">Rajib</option>
                    </select>
                    {preloader && <button disabled>Adding Blog...</button>}
                    {!preloader && <button>Add Blog</button>}
                </form>

            </div>

            {attachment && (
                <div>
                <br/>
                <img key={attachment} src={attachment} height="300" width="500" />
                </div>
                )
                }
            {video && (
                <div className="center">
                <br/>
                <video width="500" height="300" key={video} controls autoPlay>
                <source src={video} type="video/mp4" />
                <source src={video} type="video/ogg" />
                Your browser does not support the video tag.
                </video>
                <br/>
                <button onClick={closePreview}>Turn off Preview</button>
                </div>
                )
                }
        </div>
     );
}
 
export default Create;
