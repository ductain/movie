import { useEffect, useState } from 'react'
import './detail.scss'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Rating from '@mui/material/Rating';

export default function Detail() {
  const { id } = useParams()
  const [content, setContent] = useState({
    img: '',
    title: '',
    year: 0,
    detail: '',
    status: 0,
    rating: 0,
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
  }, [id]) // Include 'id' as a dependency so the effect runs when the 'id' changes

  const handleToggleStatus = async () => {
    try {
      // Toggle the status (0 to 1 or 1 to 0)
      const newStatus = content.status === 0 ? 1 : 0;

      // Send a PUT request to update the movie's status
      await axios.put(`https://64914d492f2c7ee6c2c7f847.mockapi.io/api/v1/Movies/${id}`, {
        status: newStatus,
      });

      // Update the 'content' state with the updated status
      setContent((prevContent) => ({
        ...prevContent,
        status: newStatus,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='detail'>
      <div className="left">
        <img src={content.img} alt="" />
        <Link to={`/watch/${content.id}`} style={{ color: 'black' }}>
          <div className="watchButton">
            <PlayCircleIcon className='icon' />
            <span>WATCH MOVIE</span>
          </div>
        </Link>
        {/* Button to toggle the status */}

      </div>
      <div className="right">
        <h4>{content.title}</h4>
        <span>Publish Year: {content.year}</span>
        <span>Gerne: {content.gerne}</span>
        <Rating name='read-only' value={content.rating} style={{display: 'flex'}} readOnly />
        <p>{content.detail}</p>
        <button onClick={handleToggleStatus} className='favorButton'>
          {content.status === 0 ? (
            <FavoriteIcon style={{ fontSize: 40, color: 'gray' }} />
          ) : (
            <FavoriteIcon  style={{ fontSize: 40, color: 'red' }} />
          )}
          <span>ADD TO FAVOR</span>
        </button>

      </div>
    </div>
  )
}
