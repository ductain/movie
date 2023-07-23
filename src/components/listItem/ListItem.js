import { Link } from 'react-router-dom'
import './listItem.scss'
export default function ListItem({ movie }) {
  return (
    <Link to={`/detail/${movie.id}`}>
      <div className='listItem' >
        <img src={movie.img} alt="" />
        <div className='info'>
          <p>{movie.title}</p>
        </div>
      </div>
    </Link>
  )
}
