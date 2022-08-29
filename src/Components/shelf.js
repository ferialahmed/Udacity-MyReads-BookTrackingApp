import Books from "./book";
const Shelf = ({title, types,update})=>
{
    return (
        
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
             <div className="bookshelf-books">
                 <ol className="books-grid"> 
                 {/* {console.log(types)}
                     {console.log(typeof types)} */}
                    {types.map((type,index)=>(
                        <Books key={index} type = {type} updated={update}/>
                    ))}
                        
                </ol>
             </div>
    
        </div>
        
    )
}
export default Shelf;