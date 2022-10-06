import '../styles/Avatar.css';
import {Card} from 'react-bootstrap/';
import {Link} from 'react-router-dom';
function Avatar({ author, categories, id, publishDate, summary,title})
{
    return (
		<Link to={"/details/" + author.name} state={{data:{author: author, categories: categories, id: id, summary: summary, title: title,publishDate: publishDate}}}>
			<li key={id} className="post-li">
				<Card>
					<Card.Img variant="top" src={author.avatar} className="post-cover__item"/>
					<Card.Body>
						<Card.Title>{author.name}</Card.Title>
						<Card.Text>
							{title}		
						</Card.Text>
					</Card.Body>
					<Card.Footer>
					<small className="text-muted">published : {publishDate}</small>
					</Card.Footer>
				</Card>
			</li>
		</Link>
	)
}

export default Avatar