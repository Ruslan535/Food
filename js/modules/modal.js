function openModal(modalSelector, timerModal) {
    const modal = document.querySelector(modalSelector);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    if(timerModal) {
        clearInterval(timerModal);
    }
}
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, timerModal) {
    
    const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);
    
    modalTrigger.forEach(item => {
        item.addEventListener('click', () => openModal(modalSelector, timerModal));
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape') {
            closeModal(modalSelector);
        }
    });

    function showModalBySroll() {
            //Прокрученная часть стр.        //Видимая часть стр.                 //Размер целой стр.   
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, timerModal);
            window.removeEventListener('scroll', showModalBySroll);
        }
    }

    window.addEventListener('scroll', showModalBySroll);
}
export default modal;
export {openModal};
export {closeModal};