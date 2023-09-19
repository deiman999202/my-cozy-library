import './BookCard.scss'
import noImage from '../../assets/no_image.png'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../firebase/firebase';
import { addDoc, doc, updateDoc, deleteDoc, query, where, getDocs, collection } from 'firebase/firestore';
import InfoPopUp from '../InfoPopUp/InfoPopUp';
 
const BookCard = (props:any) => {

  const [showPopUp, setShowPopUp] = useState(false)
  const [popUpText, setPopUpText] = useState("Welcome to our library")

  const user = useSelector((state:any) => state.user.value)
  const booksCollectionRef = collection(db, 'userBooks')

  async function changeBookStatus(id: string, isRead: boolean){
    const thisDoc = doc(db, "userBooks", id)
    await updateDoc(thisDoc, {isRead: !isRead})
    getNessesaryBooks(isRead)
  }

  async function removeThisBook(id: string){
    if(window.confirm("Are you sure?")){
      const thisDoc = doc(db, "userBooks", id)
      await deleteDoc(thisDoc)
      getNessesaryBooks(props.book.isRead)
    }
  }

  async function getNessesaryBooks(isRead:boolean){
    const newRef = query(booksCollectionRef, where('userId', "==", user.id), where('isRead', "==", isRead))
    const querySnapshot = await getDocs(newRef);
    if(querySnapshot.docs.length !== 0){
      const adaptedResult = querySnapshot?.docs?.map((doc) => ({...doc.data(), id: doc.id}))
      props.setSearchResult(adaptedResult)
    }else{
      props.setSearchResult([])
    }   
  }

  console.log(props.book.imageLinks)


  return (
    <div className='book-card'>
      {showPopUp && <InfoPopUp text={popUpText} setShowPopUp={setShowPopUp} setPopUpText={setPopUpText}/>}
      {Object.keys(user).length !== 0 && props.isMyBook 
      &&
      <p className='isRead'>{props.book.isRead ? "Already read" : "Want to read"}</p> 
      }
      <p className='name'>{props.book.title}</p> 
      <span className='language'>lang: {props.book.language}</span>
      <span className='authors'>authors: {" "} {props.book?.authors?.map((author: string, index: number) => <span key={index}>{author} </span>)}</span>
      {props.book.averageRating && <p className='rating'>Rating is: {props.book.averageRating} of 5 </p>}
      {props.book.imageLinks 
      ? 
      <a target='_blank' rel="noreferrer" href={props.book.previewLink}><img className='image' src={props.book.imageLinks.thumbnail} alt="book cover" />
      </a>
      :
      <a target='_blank' rel="noreferrer" href={props.book.previewLink}><img className='image' src={noImage} alt="no data" /></a>
    }
      <p className='page-count'>{props.book.pageCount} pages</p>
      <p className='publishing-year'>Published in {props.book.publishedDate}</p>
      <a className='preview' target='_blank' rel="noreferrer" href={props.book.previewLink}>View on Google Books</a>
      <p className='description'>{props.book.description ? props.book.description : "Sorry, this author hasn't written anything"}</p>
      {Object.keys(user).length !== 0 && !props.isMyBook 
      && 
      <> 
      <button className='add top' onClick={async () => {
        await( await addDoc(booksCollectionRef, {bookId: props.id, authors: props.book.authors, description: props.book.description || "no description", publishedDate: props.book.publishedDate, imageLinks: {thumbnail: props.book.imageLinks?.thumbnail || null}, language: props.book.language, previewLink: props.book.previewLink, pageCount: props.book.pageCount, title: props.book.title, userId: user.id, isRead: false}))
        setPopUpText("This book has been added to your 'Want to read' collection")
        setShowPopUp(true)
      }}>Add to my want to read books
      </button>
      <button className='add bottom' onClick={async () => {
        await( await addDoc(booksCollectionRef, {bookId: props.id, authors: props.book.authors, description: props.book.description || "no description", publishedDate: props.book.publishedDate, imageLinks: {thumbnail: props.book.imageLinks?.thumbnail || null}, language: props.book.language, previewLink: props.book.previewLink, pageCount: props.book.pageCount, title: props.book.title, userId: user.id, isRead: true}))
        setPopUpText("This book has been added to your 'Already read' collection")
        setShowPopUp(true)
      }}>Add to my already read books
      </button>
      </>
      }
      {props.isMyBook 
        &&
      <>
      <button onClick={() => changeBookStatus(props.id, props.book.isRead)} className='changeRead'>{props.book.isRead ? "Change to 'Want to read'" : "Change to 'Already read'"}</button>
      <button onClick={() => removeThisBook(props.id)} className='delete-btn'>Remove from my books</button>
      </>
      }
    </div>
  )
}

export default BookCard