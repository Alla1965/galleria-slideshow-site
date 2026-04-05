import './style.css'
import data from '../data.json'

//  Получаем id из URL
const params = new URLSearchParams(window.location.search)
let current = Number(params.get('id'))

// Если id нет → по умолчанию 0
if (isNaN(current)) current = 0

//  Берём нужный элемент
const item = data[current]

//  Рендерим страницу
const container = document.getElementById('detail')
const footer = document.getElementById('footer')

container.innerHTML = `
        <!-- IMAGES BLOCK -->
   <div class="flex flex-col w-full pt-6 pb-20 px-0
               md:px-0 md:pt-0 md:pb-14 md:gap-16
                 xxl:pb-[86px] xxl:px-0  xxl:flex-row xxl:gap-9" id="detail">

<!-- Big Painting+text+small image-->
        <div class="relative flex flex-col gap-0 
                   md:items-start md:flex-row
                   md:w-[688px]
                     xxl:w-[848px]
                xxl:gap-0 ">

          <!-- Painting+button-->
         <div class="relative flex flex-col  z-20 gap-0
                      w-full 
                        md:w-[475px] 
                     ">

  

                 <button id="viewImage" class="bg-black flex item-center gap-4 text-white px-4 py-[14px] 
                              absolute top-4 left-4
                              md:top-auto md:bottom-4 z-10">
                 <img 
                     src="/assets/shared/icon-view-image.svg" 
                     alt="view icon"
                     class="bg-black my-auto text-white w-[12px] h-[12px]">
                  <span class="text-white">VIEW IMAGE</span>
                 </button>
     
                 <!-- IMAGE -->
                 <div class="relative ">
                   <picture>
                   <!-- мобилка -->
                   <source 
                     srcset="${item.images.hero.small}" 
                     media="(max-width: 768px)">

                   <!-- десктоп -->
                   <source 
                     srcset="${item.images.hero.large}" 
                     media="(min-width: 769px)" >
                   <!-- fallback -->
                   <img 
                     class="block  w-full 
                            max-w-[475px]  aspect-[327/280] 
                                   md:aspect-[475/560]    
                                   object-cover "
                     src="${item.images.hero.large}" 
                     alt="${item.name}" >
                   </picture>
                 </div>  

          </div>  
          
            <!-- Text block -->
              <div class="flex flex-col bg-white w-[282px] h-[133px] -mt-24 z-30 mr-auto p-6 
                        md:w-[445px]  md:h-[300px] md:-ml-[232px] md:mt-0 md:mr-0 md:pt-0 md:pl-16 md:pb-16
                       xxl:w-[445px] xxl:-translate-x-[72px] ">
 
              

                     <h1 class="text-2xl text-black mb-2
                         md:text-[56px] md:leading-[1.15] md:mb-6">
                         ${item.name}
                     </h1>

                     <p class="text-[15px] leading-[1.35]">${item.artist.name}   </p>
            </div>
  

                           
          <!-- ARTIST IMAGE-->
            <div class="  pl-4 
                         md:absolute md:z-10 
                         md:right-[57px]  md:top-[300px]
                         xxl:right-[221px]
                          xxl:top-[496px] " >


                <img 
                    class="w-16 h-16    
                      md:w-32 md:h-32
                       xxl:m-0
                      object-cover"
                   src="${item.artist.image}" 
                  alt="${item.artist.name}"  >
            </div>

      </div> 

          <!-- DESCRIPTION BLOCK -->
          <div class="-mt-16  xxl:w-[36%] xxl:flex 
            xxl:flex-col 
            xxl:justify-center">
              <p class="text-[var(--grey-100)] text-[100px] leading-[1] text-right -mb-7
                      md:text-[200px] md:leading-[1.15] md:tracking-[-0.2px]
                      md:-mb-[220px] md:text-left"> 
                     ${item.year}
              </p>
              <div class="md:px-[156px]  md:pt-[74px]  xxl:p-0">
                 <p class="text-3.5 leading-[2] tracking-[-0.25px] mb-16
                    ">${item.description}</p>

                 <a class="font-normal tracking-[2px] text-[9px] md:text-[12px] md:leading-[2.5px]" 
                         href="/index.html">GO TO SOURCE</a>
              </div>
          </div>

     </div> 
` 


//  КНОПКИ ← →

const nextBtn = document.getElementById('next')
const prevBtn = document.getElementById('prev')
const title = document.getElementById('title')
const artist = document.getElementById('artist')

title.textContent = item.name
artist.textContent = item.artist.name


// NEXT →
nextBtn.onclick = () => {
  current = (current + 1) % data.length
  console.log('NEXT:', current)
  window.location.search = `?id=${current}`
}

// PREV ←
prevBtn.onclick = () => {
  current = (current - 1 + data.length) % data.length
  console.log('PREV:', current)
  window.location.search = `?id=${current}`
}
const progress = document.getElementById('progress')

const total = data.length // 16

const percent = ((current + 1) / total) * 100

progress.style.width = percent + '%'

const modal = document.getElementById('modal')
const modalImg = document.getElementById('modalImg')
const closeBtn = document.getElementById('closeModal')
const viewBtn = document.getElementById('viewImage')

viewBtn.onclick = () => {
  modal.classList.remove('hidden')
  modal.classList.add('flex')
  modalImg.src = item.images.hero.large
}

closeBtn.onclick = () => {
  modal.classList.add('hidden')
  modal.classList.remove('flex')
}