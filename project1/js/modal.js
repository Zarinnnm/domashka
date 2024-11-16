const modal = document.querySelector('.modal')
const triggerButton = document.querySelector('#btn-get')
const  closeButton = document.querySelector('.modal_close')

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'

}
const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}
triggerButton.onclick = () => openModal()
closeButton.onclick = () => closeModal()
modal.onclick = () => {
    if (event.target === modal) {
        closeModal()
    }
}
let switcher = true
window.addEventListener('scroll',() => {
    const scrollPosition = window.scrollY + window.innerHeight
    const scrollHeight = document.body.scrollHeight
    if (scrollPosition >= scrollHeight && switcher === true) {
        openModal()
        switcher = false
    }
})

setTimeout(() => {openModal()},10000)