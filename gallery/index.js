const menuModal=document.querySelector('.menu__modal')
const bars=document.querySelector('.uil-bars')
const parentBars=bars.parentNode
const times=document.querySelector('.uil-times')
const contactIcons=document.querySelector('.contact-icons')
const parentContactIcons=contactIcons.parentNode
const contacts=document.querySelector('.nav__list_vertical-contacts')
const submenu=document.querySelector('.submenu_vertical')
const galleryList=document.querySelector('.gallery__list')
const galleryParent=galleryList.parentNode

bars.addEventListener('click',()=>{
    menuModal.classList.add('_show')
    parentBars.removeChild(bars)
    galleryParent.removeChild(galleryList)
    parentContactIcons.removeChild(contactIcons)
})

times.addEventListener('click',()=>{
    menuModal.classList.remove('_show')
    parentBars.appendChild(bars)
    parentContactIcons.appendChild(contactIcons)
    galleryParent.appendChild(galleryList)
})

contacts.addEventListener('click',()=>{
        submenu.classList.contains('active')
        ? submenu.classList.remove('active')
        :submenu.classList.add('active')
    })
