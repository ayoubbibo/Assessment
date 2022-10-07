import '../styles/Post.css';
import {Card} from 'react-bootstrap/';
import {Link} from 'react-router-dom';

/**
 * Using bootstrap this component will be able to render a card witch containes
 * some of the post informations and onclick wich link to the page where all the details
 * will be showen
 * @param author containes the name and the cover avatar of the author of the post 
 * @param categories array of the categories of the post
 * @param id id of the author of the post
 * @param summary summary of the post
 * @param publishDate publishDate of the post
 * @param title title of the post 
 * @returns 
 */
function Post({ author, categories, id, publishDate, summary,title})
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

export default Post;