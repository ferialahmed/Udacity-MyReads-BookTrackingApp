import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Books from "./book";
import { search, getAll } from "./BooksAPI";
const Search = ()=>
{
    const [filteration, setFilteration] = useState("");
    const [filteredBooks, setFilteredBooks] = useState([]);
    const show = async (e)=>
    {
        setFilteration(e.target.value);
        if(!e.target.value)
        {
            setFilteredBooks([]);
        }
        const searched = await search(e.target.value);
        const fetchBooks = async() => {
            try {
                const books = await getAll();
                if(searched.error)
                    {
                        console.log("error")
                        setFilteredBooks([]);
                    }
                    else{
                const updating = searched.map(search=>{
                    const getShelf = books.find(searchedBook => searchedBook.id===search.id)
                    if(getShelf)
                    {
                        search.shelf = getShelf.shelf;
                    }
                    else{search.shelf = "none"}
                    return search;
                    
                })
                
                setFilteredBooks(searched);
            }
            } catch (error) {
                console.log(error);
            }
        }
        fetchBooks();
        
        
    }
    const [readingNow, setReadingNow] = useState([]);
    const [wanted, setWanted] = useState([]);
    const [READ, setREAD] = useState([]);
    const fetchBook = async() => {
        try {
            const books = await getAll();
            const CurrentlyReading = books.filter((book)=> book.shelf === "currentlyReading")  
            const read = books.filter((book)=> book.shelf === "read")
            const wantToRead = books.filter((book)=> book.shelf === "wantToRead")
            setReadingNow(CurrentlyReading);
            setWanted(wantToRead);
            setREAD(read);
            console.log(readingNow,wanted,READ);
        } 
        catch (error) {
            console.log(error);
        }
    };
    useEffect(()=>{
    fetchBook();
    },[])

    const updateBook = ()=>
    {
        fetchBook();
    }
    
    return (
        <div>
        <div className="search-books">
            <div className="search-books-bar">
                <Link
                    to="/"
                    className="close-search"
                >
                Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        value={filteration}
                        onChange = {show}
                    />
                </div>
            </div>
            <div className="search-books-results">
            <ol className="books-grid">
                    
                {filteredBooks.map((filteredBook)=>
                {
                    return   <Books key={filteredBook.id} type={filteredBook} updated={updateBook}/>   
                    })}
            </ol>

        </div>
        </div>
        </div>
        )
}
export default Search;