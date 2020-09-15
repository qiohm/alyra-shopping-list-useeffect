import React, { useEffect, useState } from "react"
import AddPopularProducts from "./AddPopularProducts"
import AddProductForm from "./AddProductForm"
import ShoppingList from "./ShoppingList"

const ShoppingApp = (props) => {
  const getLocalStorage = () => {
    return JSON.parse(localStorage.getItem('myShoppingList')) || []
  }


  const [shopping, setShopping] = useState( getLocalStorage )

  const addToShoppingList = (product) => {
    setShopping([...shopping, product])
  }

  const removeFromShoppingList = (product) => {
    setShopping(shopping.filter((el) => el !== product))
  }
useEffect(() => {
  document.title = shopping.length ? `Vous avez ajouté ${shopping.length} produit(s)`: `préparez votre liste de courses`
}, [shopping.length])

useEffect(() => {
  // enregistre dans localStorage quand shopping change
localStorage.setItem('myShoppingList', JSON.stringify(shopping))
}, [shopping])

  return (
    <section>
      <h2 className="mb-3">Produits à acheter</h2>
      <AddPopularProducts
        shopping={shopping}
        addToShoppingList={addToShoppingList}
        removeFromShoppingList={removeFromShoppingList}
      />
      <ShoppingList
        shopping={shopping}
        removeFromShoppingList={removeFromShoppingList}
      />
      <AddProductForm
        shopping={shopping}
        addToShoppingList={addToShoppingList}
      />
    </section>
  )
}

export default ShoppingApp
