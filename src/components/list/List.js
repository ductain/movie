import './list.scss'
import ListItem from '../listItem/ListItem';
export default function List({ movies }) {
    return (
        <div className='list'>
            <span className='listTitle'>List of movies</span>
            <div className="container">
                {movies.map((m) => (
                    <ListItem movie={m} />
                ))}
            </div>
        </div>
    )
}
