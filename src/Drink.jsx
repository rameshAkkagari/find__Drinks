import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

function Drink() {
    const [drinksData,setDrinksData] = useState([]);
    const [searchTerm,setSearchterm] = useState("");
    const [loading,setloading] = useState(false);
    const [iserror,setIsError] = useState({status:false,mgs:""});

    const changehandler =(e) =>{
        setSearchterm(e.target.value)
    }

    const fetchDrinks = async(api) =>{
        setloading(true)
        setIsError({status:false,mgs:""})
    try {
        const response =await fetch(api)
        const {drinks} =await response.json()
       setDrinksData(drinks);
       console.log(drinksData);
       setloading(false)
       setIsError({status:false,mgs:""})
       if(!drinks){
        throw new Error("Data not found")
    }

        } catch (error) {
         setloading(false)
        setIsError({status:true,mgs: error.message ||"something went wrong"})

        }
    }
    useEffect(()=>{
        const mainURL = `${URL}${searchTerm}`;
      fetchDrinks(mainURL)
    },[searchTerm]);

    
  return (
    <div>
        <header className='header'>
            <h1>Drinks Shop</h1>
            <form>
                <input type="text" value={searchTerm} onChange={changehandler} placeholder='Search Drink'/>
            </form>
        </header>
        <hr/>
        {loading && !iserror?.status && <div class="custom-loader"></div>}
        {iserror?.status && <h1 className='error'>{iserror.mgs}</h1>}
         
        {!loading && !iserror?.status && <ul  className='cocktail-data'>
        {
            drinksData.map((item)=>{
                return (
                    <Link to={`/${item.idDrink}`} key={item.idDrink} className='oneDrink'>
                     <img src={item.strDrinkThumb} alt={item.strDrink}/>
                     <h3>{item.strDrink}</h3>
                    </Link>
                )
            })
        }
        </ul>}
    </div>
  )
}

export default Drink