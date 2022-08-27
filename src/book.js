import { update } from "./BooksAPI";
const Books = ({type,updated})=>
{
    const handleChange = (event) =>
    { 
        const updateShelf = async () => 
        {
          const returned =  await update(type,event.target.value);
          updated();
          console.log(returned);
        }
        updateShelf()
    }
    return(
      <li>
           { <div className="book">
     <div className="book-top">
       <div
        className="book-cover"
        style={{
          width: 128,
          height: 193,
          backgroundImage:
          `url(${type.imageLinks?type.imageLinks.thumbnail:""})`,
        }}
        ></div>
    
      <div className="book-shelf-changer">
        {console.log(type.shelf)}
        <select onChange={handleChange} value={type.shelf}>
          <option  disabled>
            Move to...
          </option>
          <option value="currentlyReading" >
            Currently Reading
          </option>
          <option value="wantToRead" >Want to Read</option>
          <option value="read" >Read</option>
          <option value="none" >None</option>
        </select>
      </div>
    </div>
    <div className="book-title">{type.title}</div>
    <div className="book-authors">{type.authors}</div>
  </div>
}
</li>
        
    )}


export default Books;