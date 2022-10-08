import '../styles/Categories.css';
import {useState, useEffect} from 'react';
import {Form, Button, CloseButton, ListGroup} from 'react-bootstrap';

/**
 * this component is responsible for filtering the data by a select properties 
 * the user can select multiple categories
 * when a category is selected its will no longer rendered in the select filter
 * @param data les données retrieved from our api
 * @param selectedCategories the selected categories from the select filter
 * @param setSelectedCategory function to set the selected categories
 */
function Categories({ data , selectedCategories, setSelectedCategory}) {
	const [categories,setCategories] = useState([]); 
    useEffect(() => {
        setCategories(
        [...data.reduce(
                    (acc, avatar) =>
                acc.includes(avatar.categories) ? acc : acc.concat(avatar.categories),
            []
        ).reduce(
            (acc, category) =>
            acc.includes(category.name) ? acc : acc.concat(category.name),
            []
        )])
    }, [data])
    
	/**
	 * Adding the selected category to the selected list and removing it from the categories list
	 * @param category the category selected 
	*/
	function settings(category)
	{
		const currentCategory = categories.find(c => c === category);
		if(currentCategory){
			const listCategory = categories.filter((c) => c !== category)
			setCategories([...listCategory]);
			setSelectedCategory(cat => [...cat, category]);
		}	
	}

	/**
	 * Adding the list category to the selected list and removing it from the selected categories list
	 * @param category category to decline
	 */
	function declineCategorie(category)
	{	
		const currentSelectedCategory = selectedCategories.find(c => c === category);
		if(currentSelectedCategory)
		{
			const newSelectedCategories = selectedCategories.filter((c) => c !== category)
			setCategories(cat => [...cat, category]);
			setSelectedCategory([...newSelectedCategories]);
		}		
	}
	
	return (
		<div className='Categories'>
			<ListGroup horizontal className="selected-categories-list">
				{
					selectedCategories.map((category=>
						<ListGroup.Item key={category} className="selected-categories-li">
							<div>{category}</div>
							<CloseButton  onClick={() => declineCategorie(category)} />
						</ListGroup.Item>
					))					
				}			
			</ListGroup>
			<section className="filter-section">
				<Form.Select aria-label="Default select example"
					onChange={(e) => settings(e.target.value)}
				>
					<option value=''>Please choose a category ...</option>
					{categories.map((cat) => (
						<option key={cat} value={cat}>
							{cat}
						</option>
					))}
				</Form.Select>
				<Button className="resetButton" onClick={() => setCategories(selectedCategories.concat(categories)) + setSelectedCategory([]) } variant="outline-danger">Reset</Button>{' '}
			</section>
		</div>
	)
}

export default Categories