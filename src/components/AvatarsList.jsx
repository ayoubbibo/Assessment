import Avatar from './Avatar';
import Categories from './Categories';
import '../styles/AvatarList.css';
import {useState} from 'react';


function AvatarsList({data, setData})
{
    const [activeCategory, setActiveCategory] = useState('')
	
    const categories = data.reduce(
		(acc, avatar) =>
			acc.includes(avatar.categories) ? acc : acc.concat(avatar.categories),
		[]
	);
    
    console.log(categories);
    return(
        <div className="lmj-shopping-list">
            <Categories
				categories={categories}
				setActiveCategory={setActiveCategory}
				activeCategory={activeCategory}
			/>

            <ul className='lmj-plant-list'>
                {data.map(({ author, categories, id, publishDate, summary,title}) =>
                    (
                        <div key={id}>
                            <Avatar
                                author={author}
                                categories={categories}
                                id={id}
                                publishDate={publishDate}
                                summary={summary}
                                title={title}
                            />
                        </div>
                    ) 
                )}
            </ul>
        </div>
    )
}
export default AvatarsList;