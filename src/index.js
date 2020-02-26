console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const runFunctionsONLoad = [
    fetchImages,
    fetchBreeds,
    queryBreeds
  ];
  runFunctionsONLoad.forEach(fn => addListeners(fn));
  
  function addListeners(fn) {
    document.addEventListener("DOMContentLoaded", fn);
  }
function fetchImages() {
    fetch(imgUrl)
      .then(resp => resp.json())
      .then(obj => appendImages(obj));
  }
  function appendImages(obj){
    const imgList = document.getElementById("dog-image-container")
    obj.message.forEach(link => { 
        let imgTag = document.createElement("img");
        imgTag.setAttribute("src", link);
        imgList.appendChild(imgTag);})
  }
  function fetchBreeds(filter = "") {
    fetch(breedUrl)
      .then(resp => resp.json())
      .then(obj => appendBreeds(obj,filter));
  }

function queryBreeds() {
    let queryFilter = document.querySelector("#breed-dropdown")
    queryFilter.addEventListener("change",function(){
        const doglist = document.getElementById("dog-breeds")
        doglist.innerHTML = ""
        let val = queryFilter.value
        fetchBreeds(val)
        
    })
     
  }



function appendBreeds(obj, filter = ""){
    const doglist = document.getElementById("dog-breeds")
    dogBreeds = Object.keys(obj.message);
    dogBreeds.forEach(type => {
        let element = document.createElement("p");
        element.innerText = type ;
        if (filter != ""){
            if ( type[0] == filter){
                 doglist.appendChild(element);}
        
        }else{
           
            doglist.appendChild(element);
        }   
    })
}


