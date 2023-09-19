import './MyBooks.scss'
import { db } from '../../firebase/firebase';
import { getDocs, collection, deleteDoc, doc, query, where } from 'firebase/firestore';
import BookCard from '../../components/BookCard/BookCard';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const MyBooks = () => {

  const [searchResult, setSearchResult] = useState<any[]>([])
  const user = useSelector((state:any) => state.user.value)

  const booksCollectionRef = collection(db, 'userBooks')
  


  async function getReadBooks(){
    const newRef = query(booksCollectionRef, where('userId', "==", user.id), where('isRead', "==", true))
    const querySnapshot = await getDocs(newRef);
    if(querySnapshot.docs.length !== 0){
      const adaptedResult = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
      setSearchResult(adaptedResult)
    }else{
      alert("You have no books in this category")
    }
  }

  async function getWantToReadBooks(){
    const newRef = query(booksCollectionRef, where('userId', "==", user.id), where('isRead', "==", false))
    const querySnapshot = await getDocs(newRef);
    if(querySnapshot.docs.length !== 0){
      const adaptedResult = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
      setSearchResult(adaptedResult)
    }else{
      alert("You have no books in this category")
    }
  }


  return (
    <div className="my-books">
    
    <div className="choose-type">
      <button className='type-btn' onClick={() => getReadBooks()}>My already read books</button>
      <button className='type-btn' onClick={() => getWantToReadBooks()}>Books I want to read</button>
    </div>
    
    <div className="search-result">
        {searchResult && searchResult.length !== 0 ? 
        (
          <div className="result">
          {
             searchResult.map((book:any, index: number) => {
              return <BookCard id={book.id} key={index} book={book} isMyBook={true} setSearchResult={setSearchResult}/>
            })
          }
          </div>
        )
      :
      (
        <h2 className='no-results'>Click on buttons to have favorable result.</h2>
      )
      }
        
      </div>
    </div>
  )
}

export default MyBooks