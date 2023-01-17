let closeBtn = document.querySelector('.button__close')
let autoComBox = document.querySelector('.autocom-box')
let autoComEl = document.querySelectorAll('.autocom-el')
const search = document.querySelector('.search-form')
let searchInput = document.querySelector('.search-input')
let repos = document.querySelector('.repos')

// VARIABLES
function createElement(eltag,className){
  let el = document.createElement(eltag)
  if(className){
    el.classList.add(className)
  }

  return el
}


const debounce = (fn, throttleTime) => {
  let timer;
  return function(...args){
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this,args)
    },throttleTime)
  }
};

// FUNCTIONS



search.addEventListener('keyup',debounce(async (e) => {
  if(e.target.value.length == 0){
    let links = document.querySelectorAll('.autocom-el')
    links.forEach(el => el.remove())
  } else {
    fetch(`https://api.github.com/search/repositories?q=${e.target.value}&per_page=5`).then( response => {
    if(response.ok){
      response.json().then((data) =>{
        let links = document.querySelectorAll('.autocom-el')
          links.forEach(el => el.remove())
        data.items.forEach((el) =>{

          let li = createElement('li','autocom-el')
          li.textContent = el.name

          autoComBox.appendChild(li)
        })
       
      })
    }
  })
  } 

},500))




searchInput.addEventListener('click',(e) =>{
  
  if(e.target.className == 'autocom-el'){
    search.value = ''
    let links = document.querySelectorAll('.autocom-el')
    links.forEach(el => el.remove())
    
    fetch(`https://api.github.com/search/repositories?q=${e.target.textContent}&per_page=5`).then(response =>{
      if(response.ok){
        response.json().then(data => {
          let li = createElement('li','repos--selected')
          let div = createElement('div','repos__content')
          let spanName = createElement('span','name')
          let spanOwner = createElement('span','owner')
          let spanStars = createElement('span','stars')
          let button = createElement('button','button__close')

          // spanStars.textContent = `Stars:${data.items[0].stargazers_count}`

          // spanName.textContent = `Name:${data.items[0].name}`

          // spanOwner.textContent = `Owner:${data.items[0].owner.login}`

          data.items.forEach((el,i) => {
            if(el.name == e.target.textContent){
              spanStars.textContent = `Stars:${data.items[i].stargazers_count}`

              spanName.textContent = `Name:${data.items[i].name}`

              spanOwner.textContent = `Owner:${data.items[i].owner.login}`
            }
          })

          button.addEventListener('click',(e)=>{
            let elem = e.path[2]

            elem.remove()
          })

          div.appendChild(spanName)
          div.appendChild(spanOwner)
          div.appendChild(spanStars)
          div.appendChild(button)

          li.appendChild(div)

          repos.appendChild(li)
          
        })
      }
    })
  }

  
})






