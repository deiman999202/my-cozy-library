import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import env from 'react-dotenv'
import {debounce} from 'lodash'
import BookCard from '../../components/BookCard/BookCard'
import Pages from '../../components/Pages/Pages'
import './MainPage.scss'

const MainPage = () => {
  // get the html of the inputs
  const nameInput = useRef<HTMLInputElement | null>(null)
  const authorInput = useRef<HTMLInputElement | null>(null)
  // state for the inputs
  const [bookNameSearch, setBookNameSearch] = useState("")
  const [bookAuthorSearch, setBookAuthorSearch] = useState("")
  const [startIndex, setStartIndex] = useState(0)
  const [searchResult, setSearchResult] = useState([])
  const [totalItems, setTotalItems] = useState(0)

 
  useEffect(() => {
    if (bookNameSearch && !bookAuthorSearch){
      getBookByName(bookNameSearch, startIndex)
    }else if (bookAuthorSearch && !bookNameSearch){
      getBookByAuthor(bookAuthorSearch, startIndex)
    }
  }, [startIndex, bookNameSearch, bookAuthorSearch])


  useEffect(() => {
    if (!bookNameSearch && !bookAuthorSearch){
      setSearchResult([])
      setTotalItems(0)
    }

  }, [bookNameSearch, bookAuthorSearch])

 async function getBookByName(name:string, startIndex: number){
    await axios.get(env.SEARCH_BOOKS_BASELINK + `?q=intitle:${name}&maxResults=10&startIndex=${startIndex}&key=${env.API_KEY}`).then((response) => {
      if(response.data.totalItems.length !== 0){
        setSearchResult(response.data.items)
        setTotalItems(response.data.totalItems)
      }
    })
  }

 async function getBookByAuthor(name:string, startIndex: number){
  await axios.get(env.SEARCH_BOOKS_BASELINK + `?q=inauthor:${name}&maxResults=10&startIndex=${startIndex}&key=${env.API_KEY}`).then((response) => {
    if(response.data.totalItems.length !== 0){
      setSearchResult(response.data.items)
      setTotalItems(response.data.totalItems)
    }
  })
  }


  return (
    <div className='search-books-block'>
      <div className="search-inputs">
        <input type="search" id='name' ref={nameInput} placeholder='Find a book by name' value={bookNameSearch} onChange={(e) => {
          setBookNameSearch(e.target.value)
          setBookAuthorSearch("")
          const findBook = debounce(async () => {
            if(e.target.value?.length > 1){
              getBookByName(e.target.value, startIndex)
          }
          }, 1000)
          findBook()
        }
        }/>
        <input type="search" id="author" ref={authorInput} placeholder='Find a book by author' value={bookAuthorSearch} onChange={(e) => {
          setBookAuthorSearch(e.target.value)
          setBookNameSearch("")
          const findAuthor = debounce(async () => {
            if(e.target.value?.length > 1){
              getBookByAuthor(e.target.value, startIndex)
          }
          }, 1000)
          findAuthor()
        }
        }/>
      </div>
      <div className="search-result">
      {totalItems !== 0 && <Pages setStartIndex={setStartIndex} totalItems={totalItems} />}
        {searchResult && searchResult.length !== 0 ? 
        (
          <div className="result">
          {
             searchResult.map((book:any) => {
              return <BookCard id={book.id} book={book.volumeInfo} isMyBook={false}/>
            })
          }
          </div>
        )
      :
      (
        <h2 className='no-results'>No results. Try to type something or change your input</h2>
      )
      }
        {totalItems !== 0 && <Pages setStartIndex={setStartIndex} totalItems={totalItems} />}
      </div>
    </div>
  )
}

export default MainPage