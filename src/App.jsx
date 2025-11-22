import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [user,setUser]= useState("");
  const [searchTerm,setSearchTerm]=useState("");
  const [data,setData]=useState(null);
  const [error,setError]=useState(null);

  useEffect(()=>{
    if(!searchTerm)
      {
        return;
      }
    try {
      const fetchDetails=async()=>{
        setError(null);
        const response= await fetch(`https://api.github.com/users/${searchTerm}`);
        if(!response.ok)
        {
          throw new Error("User not found");
        }
        const ans=await response.json();
        setData(ans);
        console.log(ans);
        // setFormSubmit(false);
      }
      fetchDetails();
    } catch (error) {
      setError(error);
      console.log(error);
    }

  },[searchTerm])

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(user==="")
    {
      setSearchTerm("");
      setError("Please enter a GitHub username.");
      return;
    }
    setError(null);
    setSearchTerm(user);
  }


  return (
    <div className='container'>
      <h1>Github User Finder</h1>
      <h4>Search a Github username to see profile details.</h4>

      
        <form onSubmit={handleSubmit}>
          <input 
          type="text"
          name="username"
          value={user}
          onChange={(e)=>setUser(e.target.value)}
          placeholder="e.g. torvalds, gaearon, octocat" />
          <button type="submit">Search</button>
        </form>

      
        {/* {initialData?(<div>No user yet. Try searching for "octocat".</div>):
        <>
        {formSubmit?<>
          {profile? 
            <div>
              <img src={data.avatar_url} alt="" />
              <h1>{data.name}</h1>
              <span>{data.public_repos} repos</span>
              <span>{data.followers} followers</span>
              <span>{data.following} following</span>
              <span>{data.location}</span>
              <span>{data.company}</span>
              <span><a href={data.blog}>{data.blog}</a></span>
              <span><a href={data.url}>view on github</a></span>
            </div>
            :
            <div><p>Please enter a Github username.</p></div>}
        </>:<></>}
        </>
        
      }
       */}
       {/* Error State - Shows validation error OR API error */}
      {error && <div style={{color: 'red'}}>{error}</div>}

       {!searchTerm &&  !error &&(
        <div>No user yet. Try searching for "octocat".</div>
      )}

      {
        data && !error && (
          <div>
              <img src={data.avatar_url} alt="" />
              <h1>{data.name}<span>@{data.name}</span></h1>
              <span>{data.public_repos} repos</span>
              <span>{data.followers} followers</span>
              <span>{data.following} following</span>
              <span>{data.location}</span>
              <span>{data.company}</span>
              <span><a href={data.blog}>{data.blog}</a></span>
              <span><a href={data.url}>view on github</a></span>
            </div>

        )
      }
    </div>
  )
}

export default App
