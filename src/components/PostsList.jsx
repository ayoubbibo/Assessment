import Post from './Post';
import Categories from './Categories';
import '../styles/PostsList.css';
import {useState} from 'react';
import {Button} from 'react-bootstrap';

/**
 * this component render a list of posts , it will render
 * all the posts if there are no selected catergory Or the post witch matches 
 * to the selected categories 
 * @param data the data retrieved from the api by the fetch in the component app 
 * @returns 
 */
function PostsList({data})
{    
    const [selectedCategories, setSelectedCategory] = useState([]);
    const [noOfElement,setnoOfElement] = useState(8);

    /**
     * this fu nction handle the pagination
     * at the beginning we will show only 8 posts and onClick on the load button we add 4 posts    
    */
    const loadMore = () => {
        setnoOfElement(noOfElement + 4); 
    }
    const slice = data.slice(0, noOfElement);
    
    /**
     * Test if at lest one of the categories of the post matches the selected categories
     * @param  selectedCategories
     * @param  categories the categories of the post to test if we should render the post or not  
     * @returns 
     */
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
                                <Post
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
export default PostsList;