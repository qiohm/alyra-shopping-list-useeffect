import React, { useState } from "react"
import AddPopularProducts from "./AddPopularProducts"
import ShoppingList from "./ShoppingList"
import AddProductForm from "./AddProductForm"

const ShoppingApp = (props) => {
  const [shopping, setShopping] = useState([])

  const addToShoppingList = (product) => {
    setShopping([...shopping, product])
  }

  const removeFromShoppingList = (product) => {
    setShopping(shopping.filter((el) => el !== product))
  }
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
