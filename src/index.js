let addToy = false;
let idCounter = 0

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const inputForm = document.querySelector('form')
  const toyFormContainer = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch('http://localhost:3000/toys')
  .then(resp=>resp.json())
  .then(data=>data.forEach(element=>{
    createCard(element)
    idCounter++
  }))

  inputForm.addEventListener('submit',e => {
    e.preventDefault()
    const inputList = document.querySelectorAll('input.input-text')
    idCounter++
    const newToy = {name: inputList[0].value, image: inputList[1].value, likes: 0, id: idCounter}
    createCard(newToy)

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        'name': newToy.name,
        'image': newToy.image,
        'likes': 0,
      })
    })
    .then(resp=>resp.json())
  })
});

function createCard(toy){
  const cardDiv = document.createElement('div')
  cardDiv.className = 'card'

  const nameTag = document.createElement('h2')
  nameTag.innerText = toy.name
  cardDiv.appendChild(nameTag)

  const image = document.createElement('img')
  image.src = toy.image
  image.className = 'toy-avatar'
  cardDiv.appendChild(image)

  const likes = document.createElement('p')
  likes.innerText = `${toy.likes} Likes`
  cardDiv.appendChild(likes)

  const likeButton = document.createElement('button')
  likeButton.className = 'like-btn'
  likeButton.id = toy.id
  likeButton.innerText = `like ❤️`
  cardDiv.appendChild(likeButton)
  addEventListenerToLikeButton(toy, likeButton)

  const toyContainer =document.getElementById('toy-collection')
  toyContainer.appendChild(cardDiv)
}

function addEventListenerToLikeButton(toy, likeButton){
  likeButton.addEventListener('click',e=>{
    const newLikes = toy.likes +1
    fetch(`http://localhost:3000/toys/${likeButton.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
       },
      body: JSON.stringify({
        'likes': newLikes
      })
    })
    toy.likes = newLikes
    const likesParagraph = document.querySelectorAll('.card')[likeButton.id-1].querySelector('p')
    likesParagraph.innerText = `${newLikes} Likes`
  })
}