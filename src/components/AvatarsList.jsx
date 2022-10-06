import Avatar from './Avatar';
import Categories from './Categories';
import '../styles/AvatarList.css';
import {useState} from 'react';
import {Button} from 'react-bootstrap';

function AvatarsList({data})
{    
    const [selectedCategories, setSelectedCategory] = useState([]);
    const [noOfElement,setnoOfElement] = useState(4);

    const loadMore = () => {
        setnoOfElement(noOfElement + noOfElement); 
    }
    
    const slice = data.slice(0, noOfElement);
    
    function addToRender(selectedCategories, categories){
        let found;
        if(selectedCategories.length === 0)
        { 
            found = true;
        } else {
            const categoriesNames = categories.map(category => category.name);
            found = categoriesNames.some((cat) => selectedCategories.includes(cat));
        }
        return found;
    }
    
    return(
        <div className="posts-list">
            <Categories
				data={data}
                selectedCategories={selectedCategories} 
                setSelectedCategory={setSelectedCategory}
               /> 
            <ul className="post-display">
                {
                    slice.map(({author, categories, id, publishDate, summary,title}) =>
                        addToRender(selectedCategories,categories) ?
                        (
                                <Avatar
                                    author={author}
                                    categories={categories}
                                    id={id}
                                    publishDate={publishDate}
                                    summary={summary}
                                    title={title}
                                />
                            
                        ) : null
                    ) 
                } 
            </ul>
            
            <Button variant="outline-info" onClick={() => loadMore()}>
                Load more
            </Button>
        </div>
    )
}
export default AvatarsList;