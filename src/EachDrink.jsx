import React, { useEffect ,useState} from 'react'
import { useNavigate , useParams } from 'react-router-dom'
function EachDrink() {
    const id = useParams()
    const DrinkID = id.ID
    const [data, setData] = useState([]);
    const [netWork,setNetWork] = useState("")
    const navigate = useNavigate()
    const handlerBack = () =>{
       navigate("/")
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${DrinkID}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const responseData = await response.json();
          setData(responseData.drinks);
          console.log(responseData.drinks);
        } catch (error) {
            setNetWork('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []); 
  

  
  return (
    <div>
        <button onClick={handlerBack} className="button">Drinks</button>
            <ul>
                {data.map((juice)=><li key={juice.idDrink} className='eachDrink'>
                    <img src={juice.strDrinkThumb}/>
                    <div className='juiceText'>
                        <h1>Title:{juice.strDrink}</h1>
                        <h2>DateModified:{juice.dateModified}</h2>
                        <ol>
                            <h3>Ingredients</h3>
                            <li>{juice.strIngredient1}</li>
                            <li>{juice.strIngredient2}</li>
                            <li>{juice.strIngredient3}</li>
                        </ol>
                        <h3>Type:{juice.strAlcoholic}</h3>
                        <p>
                            {juice.strInstructions}
                            {juice.strInstructionsDE}
                            {juice.strInstructionsES}
                        </p>
                    </div>
                </li>)}
            </ul>
    </div>
  )
}

export default EachDrink