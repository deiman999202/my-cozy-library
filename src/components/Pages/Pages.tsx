import './Pages.scss'

const Pages = (props:any) => {
   
  return (
    <div className='pagination'>
       {props.totalItems > 10 
       ? 
       [...Array(Math.floor(props.totalItems / 10))].map((_, idx) => <span className='pageNum' onClick={() => {
        props.setStartIndex((idx + 1) * 10 - 10)
       }} key={idx}>{idx + 1}</span>)
       :
       [...Array(props.totalItems)].map((_, idx) => <span className='pageNum' onClick={() => {
        props.setStartIndex((idx + 1) * 10 - 10)
       }} key={idx}>{idx + 1}</span>)
    }
    </div>
  )
}

export default Pages