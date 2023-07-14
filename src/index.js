let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
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
  .then(data=>data.forEach(element=>createCard(element)))
});

function createCard(toy){
  console.log(toy)
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
  
  const toyContainer =document.getElementById('toy-collection')
  toyContainer.appendChild(cardDiv)
}
