import { Link,} from "react-router-dom";
import Shelf from "./shelf";
import {getAll} from "../api/BooksAPI";
import { useState } from "react";
import { useEffect } from "react";

const Main = () =>
{
   const [readingNow, setReadingNow] = useState([]);
   const [wanted, setWanted] = useState([]);
   const [READ, setREAD] = useState([]);
    
  
      const fetchBooks = async() => {
        try {
            const books = await getAll();
            
            console.log(books);
            const CurrentlyReading = books.filter((book)=> book.shelf === "currentlyReading")
            // console.log(CurrentlyReading);
            const read = books.filter((book)=> book.shelf === "read")
            const wantToRead = books.filter((book)=> book.shelf === "wantToRead")
            setReadingNow(CurrentlyReading);
            setWanted(wantToRead);
            setREAD(read);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(()=>{
        fetchBooks();
    },[])

    const updateBook = ()=>
    {
        fetchBooks();
    }
    
    return (
        <div>
           
            

            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
            {console.log(readingNow)}
            
             <Shelf title={"Currently reading"} types={readingNow} update={updateBook} />
            <Shelf title={"Want to read"} types={wanted} update={updateBook}/>
            <Shelf title={"Read"} types={READ} update={updateBook}/>
        </div>
    )
}
export default Main;