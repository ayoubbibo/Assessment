import '../styles/Avatar.css';

function Avatar({ author, categories, id, publishDate, summary,title})
{
    return (
		<li className='lmj-plant-item'>
			<span className='lmj-plant-item-price'>{id}€</span>
            <img className='lmj-plant-item-cover' src={author.avatar} alt={`${author.name} cover`} />
			{author.name}
        </li>
	)
}

export default Avatar