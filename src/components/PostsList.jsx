import Post from './Post';
import Categories from './Categories';
import '../styles/PostsList.css';
import {useState, useEffect} from 'react';
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
    const [noOfElement,setnoOfElement] = useState(4);
    const [noOfElementTrouver,setnoOfElementTrouver] = useState(0);
    /**
     * this function handle the pagination
     * at the beginning we will show only 8 posts and onClick on the load button we add 4 posts    
    */
    const [load, setLoad] = useState(""); 

    useEffect( () => {
        if(noOfElementTrouver > 0)
        {
            if(noOfElement < noOfElementTrouver )
            {
                setLoad("Load more - " + (noOfElementTrouver - noOfElement).toString()+" -"); 
            } else 
            {
                setLoad("No more element to Load (0)");    
            }
        }else {
            if(noOfElement < data.length )
            {
                setLoad("Load more - " + (data.length - noOfElement).toString()+" -");
            } else 
            {
                setLoad("No more element to Load (0)");    
            }
        }
    },[data.length,noOfElement,noOfElementTrouver]);

    const slice = data.slice(0, noOfElement);
    /**
     * 
     */
    function postsToRender(dat)
    {
        return (
            dat.map(({author, categories, id, publishDate, summary,title}) =>        
                <Post
                    author={author}
                    categories={categories}
                    id={id}
                    publishDate={publishDate}
                    summary={summary}
                    title={title}
                    key={id}
                />    
            )
        )
    }

    /**
     * Test if at lest one of the categories of the post matches the selected categories
     * if there are no selected categories we render all the posts
     * else if no selected categories matches with the post categories we render nothing (null) 
     * @param  selectedCategories
     * @param  categories the categories of the post to test if we should render the post or not  
     * @returns 
     */
        function addToRender(selectedCategories, categories){
            const categoriesNames = categories.map(category => category.name);
            const found = categoriesNames.some((cat) => selectedCategories.includes(cat));
            return found;
        }
    
    /**
     * 
     */
    const [filteredPosts, setfilteredPosts] = useState([]); 
    useEffect(
    () => {
        setfilteredPosts([...data.map(({author, categories, id, publishDate, summary,title}) =>
        addToRender(selectedCategories,categories) ? {author, categories, id, publishDate, summary,title} 
        : null
        ).filter(c => c !== null)]);
        setnoOfElementTrouver(filteredPosts.length);
    }, [data, selectedCategories, filteredPosts.length])

    const slice2 = filteredPosts.slice(0, noOfElement);

    return(
        <div className="posts-container">
            <div className="posts-categories">
                <Categories
                data={data}
                selectedCategories={selectedCategories} 
                setSelectedCategory={setSelectedCategory}
                />
            </div> 
            <ul className="post-display">
                {
                    selectedCategories.length === 0 ?  postsToRender(slice) : postsToRender(slice2)
                } 
            </ul>
            <Button variant="outline-info" onClick={() => setnoOfElement(noOfElement + 4)}>
                {load}
            </Button>
        </div>
    )
}
export default PostsList;