import { useEffect, useState } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
export default function UpcomingDetail() {
  const { id } = useParams();
  const [content, setContent] = useState({
    img: "",
    title: "",
    date: new Date(),
    detail: "",
  });

  useEffect(() => {
    try {
      const loadMovie = async () => {
        const res = await axios.get(
          `https://64914d492f2c7ee6c2c7f847.mockapi.io/api/v1/Movies/${id}`
        );
        console.log(res.data)
        setContent(res.data)
      };
      loadMovie();
    } catch (error) {
      console.log(error);
    }
  }, [id]); // Include 'id' as a dependency so the effect runs when the 'id' changes
  console.log(content)
  const publishDate = new Date(content.date);
  return (
    <div className="detail">
      <div className="left">
        <img src={content.img} alt="" />
        <Link to={`/watch/${content.id}`} style={{ color: "black" }}>
          <div className="watchButton">
            <PlayCircleIcon className="icon" />
            <span>WATCH TRAILER</span> {/* WATCH TRAILER INSTEAD OF WATCH MOVIE */}
          </div>
        </Link>
        {/* Button to toggle the status */}
      </div>
      <div className="right">
        <h4>{content.title}</h4>
        <span>Publish Date: {format(publishDate, "dd/MM/yyyy")}</span>
        <span>Gerne: {content.gerne}</span>
        <p>{content.detail}</p>
      </div>
    </div>
  );
}
