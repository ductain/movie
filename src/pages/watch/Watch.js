import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './watch.scss'
export default function Watch() {
  const {id} = useParams()
  const [content, setContent] = useState({
    title: '',
    clip: '',
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
  }, [id])
  return (
    <div className='watch-responsive'>
      <iframe
        src={content.clip}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={content.title}
      />
    </div>
  )
}
