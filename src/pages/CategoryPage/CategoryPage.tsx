import './CategoryPage.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'
import env from 'react-dotenv'
import BookCard from '../../components/BookCard/BookCard'
import Pages from '../../components/Pages/Pages'


const CategoryPage = () => {

    const categories = ["fantasy", "detective", "love", "action", "science", "business"]
    const [selectedCategory, setSelectedCategory] = useState("")
    const [totalItems, setTotalItems] = useState(0)
    const [startIndex, setStartIndex] = useState(0)
    const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
      if(selectedCategory !== ""){
        getBooksByCategory(selectedCategory, startIndex)
      }
    }, [startIndex, selectedCategory])

    console.log(env.API_KEY)

    async function getBooksByCategory(category: string, startIndex: number){
      await axios.get(env.SEARCH_BOOKS_BASELINK + `?q=subject:${category}&maxResults=10&startIndex=${startIndex}&key=${env.API_KEY}`).then((response) => {
              
        if(response.data.totalItems.length !== 0){
          setSearchResult(response.data.items)
          setTotalItems(response.data.totalItems)
        }
      })
    }

    async function fetchCategory(category:string){
        if(category === 'random'){
            const randomCategory = categories[Math.floor(Math.random()*categories.length)];
            setSelectedCategory(randomCategory)
            getBooksByCategory(randomCategory, startIndex)
        }else{
            setSelectedCategory(category)
            getBooksByCategory(category, startIndex)
        }
    }
    async function fetchRandomBook(){
      const randomCategory = categories[Math.floor(Math.random()*categories.length)];
      const randomIndex = Math.floor(Math.random() * 20)
      await axios.get(env.SEARCH_BOOKS_BASELINK + `?q=subject:${randomCategory}&maxResults=10&startIndex=${randomIndex}&key=${env.API_KEY}`).then((response) => {
        setSearchResult([].concat(response.data.items[Math.floor(Math.random() * response.data.items.length)]))
        setTotalItems(1)
      })
    }


  return (
    <div className="categories-container">
        <div className="category-picker">
            <span className="category">
             <input type="radio" name="categ" id="fantasy" onChange={(e) => fetchCategory(e.target.id)} />
             <label htmlFor="fantasy">Fantasy</label>
            </span>
            <span className="category">
             <input type="radio" name="categ" id="detective" onChange={(e) => fetchCategory(e.target.id)}/>
             <label htmlFor="detective">Detective</label>
            </span>
            <span className="category">
             <input type="radio" name="categ" id="love" onChange={(e) => fetchCategory(e.target.id)}/>
             <label htmlFor="love">Love</label>
            </span>
            <span className="category">
             <input type="radio" name="categ" id="action" onChange={(e) => fetchCategory(e.target.id)}/>
             <label htmlFor="action">Action</label>
            </span>
            <span className="category">
             <input type="radio" name="categ" id="science" onChange={(e) => fetchCategory(e.target.id)}/>
             <label htmlFor="science">Science</label>
            </span>
            <span className="category">
             <input type="radio" name="categ" id="business" onChange={(e) => fetchCategory(e.target.id)}/>
             <label htmlFor="business">Business</label>
            </span>
            <span className="category">
             <input type="radio" name="categ" id="random" onChange={(e) => fetchCategory(e.target.id)}/>
             <label htmlFor="random">Random category</label>
            </span>
            <span className="category">
             <input type="radio" name="categ" id="randomBook" onChange={() => fetchRandomBook()}/>
             <label htmlFor="randomBook">Random book</label>
            </span>
        </div>
        {totalItems !== 0 && <Pages setStartIndex={setStartIndex} totalItems={totalItems} />}
        <div className="search-result">
        {searchResult && searchResult.length !== 0 ? 
        (
          <div className="result">
          {
             searchResult.map((book:any, index: number) => {
              return <BookCard id={book.id} key={index} book={book.volumeInfo} isMyBook={false}/>
            })
          }
          </div>
        )
      :
      (
        <h2 className='no-results'>No results. Try to type something or change your input</h2>
      )
      }
        
      </div>
      {totalItems !== 0 && <Pages setStartIndex={setStartIndex} totalItems={totalItems} />}    
    </div>
  )
}

export default CategoryPage