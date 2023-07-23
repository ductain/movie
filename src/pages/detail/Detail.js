import { useEffect, useState } from 'react'
import './detail.scss'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
export default function Detail() {
  const { id } = useParams()
  const [content, setContent] = useState({
    img: '',
    title: '',
    year: 0,
    detail: '',
  })
  useEffect(() => {
    try {
      const loadMovie = async () => {
        const res = await axios.get(`https://64914d492f2c7ee6c2c7f847.mockapi.io/api/v1/Movies/${id}`)
        setContent(res.data)
      }
      loadMovie()
    } catch (error) {
      console.log(error)
    }
  }, [])
  console.log(content.title)
  return (
    <div className='detail'>
      <div className="left">
        <img src={content.img} alt="" />
        <Link to={`/watch/${content.id}`} style={{color: 'black'}}>
          <div className="button">
            <PlayCircleIcon className='icon' />
            <span>WATCH MOVIE</span>
          </div>
        </Link>
      </div>
      <div className="right">
        <h4>{content.title}</h4>
        <span>{content.year}</span>
        <p>
          {content.detail}
        </p>
      </div>
    </div>
  )
}
