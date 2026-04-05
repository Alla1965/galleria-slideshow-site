import './style.css'
import data from '../data.json'
const gallery = document.getElementById('gallery')
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const item = data[id];
let current = Number(id);

// Main page GALLERIA
gallery.innerHTML = data.map((item, i) => `
<a href="/detail.html?id=${i}" 
   class="block  mt-10 first:mt-0 break-inside-avoid relative overflow-hidden 
     group">
   
     <img 
      class="w-full object-cover transition-transform duration-500 group-hover:scale-105"
      src="${item.images.thumbnail}" 
      alt="${item.name}">

    <div class="absolute inset-0 flex flex-col justify-end p-4
                bg-gradient-dark
                px-8 pb-8
                 opacity-70 group-hover:opacity-100
                transition-all duration-500 pointer-events-none">

      <h2 class="text-white text-1 mb-2">${item.name}</h2>
      <p class="text-white opacity-75 ">${item.artist.name}</p>
    </div>
     
  </a>
`).join('')

