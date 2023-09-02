const menuModal=document.querySelector('.menu__modal')
const bars=document.querySelector('.uil-bars')
const parentBars=bars.parentNode
const times=document.querySelector('.close_menu')
const contactIcons=document.querySelector('.contact-icons')
const parentContactIcons=contactIcons.parentNode
const contacts=document.querySelector('.nav__list_vertical-contacts')
const submenu=document.querySelector('.submenu_vertical')
const card=document.querySelector('.card')

bars.addEventListener('click',()=>{
    menuModal.classList.add('_show')
    parentBars.removeChild(bars)
    parentContactIcons.removeChild(contactIcons)
    card.classList.add('hidden')
})

times.addEventListener('click',()=>{
    menuModal.classList.remove('_show')
    parentBars.appendChild(bars)
    parentContactIcons.appendChild(contactIcons)
    card.classList.remove('hidden')
})

contacts.addEventListener('click',()=>{
        submenu.classList.contains('active')
        ? submenu.classList.remove('active')
        :submenu.classList.add('active')
    })