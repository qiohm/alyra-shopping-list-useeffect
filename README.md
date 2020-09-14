# useEffect et _lazy initial state_

## document.title (1)

Nous allons modifier `document.title` en fonction du nombre des produits sur la liste des courses.
Nous allons y mettre soit 'Préparez votre liste des courses' (si elle est vide), soit 'Vous avez .. produit(s) sur votre liste des courses'

Le titre devrait se mettre à jour à chaque fois ou le nombre de produits sur la liste change

```javascript
// src/components/ShoppingApp.js
import React, { useState, useEffect } from "react"
/* comme avant */

const ShoppingApp = ({mode}) => {
  const [shopping, setShopping] = useState(["cumin", "curry"])

  /* comme avant */

  useEffect(() => {
    document.title =
      shopping.length === 0
        ? `Préparez vos courses`
        : `${shopping.length} produit(s) sur votre liste des courses`
  })

  return /* comme avant */

export default ShoppingApp
```

Maintenant à chaque fois que `ShoppingApp` _render_ le titre du document est modifié

## document.title - (2)

Peut-on améliorer notre code ?

Nous pouvons observer qu'un changement du _"mode"_ (mode dark / mode light) déclanche aussi la remise en place du titre (même si son texte ne change pas).

Nous pouvons passer un deuxième paramètre dans `useEffect`, un array qui spécifie **quand** cet effect devrait être exécuté. Dans notre cas, nous voulons que le titre du document change, uniquement quand `shopping` change

```javascript
useEffect(() => {
  document.title =
    shopping.length === 0
      ? `Préparez vos courses`
      : `${shopping.length} produit(s) sur votre liste des courses`
}, [shopping])
```

ou même :

```javascript
useEffect(() => {
  document.title =
    shopping.length === 0
      ? `Préparez vos courses`
      : `${shopping.length} produit(s) sur votre liste des courses`
}, [shopping.length])
```

---

✅

## localStorage (1)

Nous avons utiliser localStorage afin d'enregistrer dans la mémoire du navigateur notre liste des courses et la récuperer à la prochaine visite (après rechargement de la page)

Un petit rappel sur `localStorage` :

- `localStorage.setItem("colorMode", mode)` - enregistre la valeur de mode dans l'objet `localStorage`
- `localStorage.getItem("colorMode")` - permet de recupérer la valeur enregistrée sous la clé `"colorMode"`
- localStorage enregistre tout en format de `string`
- afin de enregistrer un objet nous utilisons le format JSON :
  - `JSON.stringify(myObjet)` transforme objet `myObjet` en string format JSON
  - `JSON.parse(myJSONString)` transforme `myJSONString` en objet JavaScript

![](https://wptemplates.pehaa.com/assets/alyra/localStorage.png)

## localStorage (2)

Revenons à notre application, nous avons besoin d'enregister la valeur de `shopping` dans `localStorage` à chaque fois que `shopping` change

```javascript
useEffect(() => {
  localStorage.setItem("myShoppingList", JSON.stringify(shopping))
}, [shopping])
```

---

✅

## localStorage (3)

Nous allons besoin de la valeur stockée dans localStorage pour la passer en tant que la valeur initiale de `shopping` :

`const [shopping, setShopping] = useState( /* ici !! */ )`

Alors :

`const [shopping, setShopping] = useState( JSON.parse(localStorage.getItem('myShoppingList')) || [] )`

La valeur initiale de shopping est utilisée uniquement une fois, au moment ou le compenent monte, pourtant l'expression `JSON.parse(localStorage.getItem('myShoppingList')) || []` sera évaluée à chaque render.

Pour y rémédier et améliorer la performance, nous pouvons passer une fonction dans `useState` :

```javascript
const [shopping, setShopping] = useState(
  () => JSON.parse(localStorage.getItem("myShoppingList")) || []
)
```

---

✅

Nous appelons cela _lazy initial state_ ou état local initial paresseux.

```javascript
const [shopping, setShopping] = useState(expensiveOperationFunction()) // pas bien 👎
```

par contre :

```javascript
const [shopping, setShopping] = useState(() => expensiveOperationFunction()) //  bien 👍
```

ou simplement

```javascript
const [shopping, setShopping] = useState(expensiveOperationFunction) //  bien 👍
```

## localStorage (4)

Utiliser la même approche et modifier le fichier `App.js` afin de profiter de localStorage pour stocker la valeur de `mode`.
