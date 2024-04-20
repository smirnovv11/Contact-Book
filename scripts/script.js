if (localStorage.getItem('identifiers') === null) {
    localStorage.setItem('identifiers', JSON.stringify({
        groupId: 0,
        contactId: 0
    }))
}

let identifiers = JSON.parse(localStorage.getItem('identifiers'))
let groups = JSON.parse(localStorage.getItem('groups'))
var contacts = JSON.parse(localStorage.getItem('contacts'))

let getFreeGroupId = () => {
    identifiers.groupId += 1
    localStorage.setItem('identifiers', JSON.stringify(identifiers))
    return identifiers.groupId
}

let getFreeContactId = () => {
    identifiers.contactId += 1
    localStorage.setItem('identifiers', JSON.stringify(identifiers))
    return identifiers.contactId
}

let addContact = (obj) => {
    if (contacts === null)
        contacts = []
    contacts.push(obj)
    localStorage.setItem('contacts', JSON.stringify(contacts))
}

let scroll = (e, i) => {
    let drop = document.querySelectorAll('.group-droplist')[i]
    if (e.target === drop || e.target === drop.querySelector('.droplist-head') ||
        e.target === drop.querySelector('.droplist-title') || e.target === drop.querySelector('img')) {
        let container = drop.querySelector('.contacts-container');
        let head = drop.querySelector('.droplist-head')
        if (container.style.maxHeight){
            container.style.maxHeight = null;
            head.querySelector('p').classList.remove('active')
        } else {
            container.style.maxHeight = container.scrollHeight + "px";
            head.querySelector('p').classList.add('active')
        } 
    }
}

let contactBook = document.querySelector('.contact-book-container')

let updateBook = () => {

    if (groups.length > 0) {
        document.body.classList.add('active')
        contactBook.innerHTML = ''
    }
    else {
        document.body.classList.remove('active')
        contactBook.innerHTML = `<p>Список контактов пуст</p>`
        contactBook.style.width = 'auto'
        return
    }

    groups.forEach(el => {

        let contactHTML = ``
        contacts.filter(con => con.groupId === el.id).forEach(c => {
            contactHTML += `
            <hr>
                <div>
                    <p class="contact-name">${c.name}</p>
                    <div class="contact-controlls">
                        <p class="contact-phone">${c.phone}</p>
                        <div>
                            <button class="btn edit-btn" onClick="loadForEdit(${c.id})">
                                <svg width="16" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 14.25V18H3.75L14.81 6.94L11.06 3.19L0 14.25ZM17.71 4.04C18.1 3.65 18.1 3.02 17.71 2.63L15.37 0.289998C14.98 -0.100002 14.35 -0.100002 13.96 0.289998L12.13 2.12L15.88 5.87L17.71 4.04Z" fill="white"/>
                                </svg>
                            </button>
                            <button class="btn delete-group-btn" onClick="deleteContact(${c.id})">
                                <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.66664 17.3889C1.66664 18.55 2.61664 19.5 3.77775 19.5H12.2222C13.3833 19.5 14.3333 18.55 14.3333 17.3889V4.72222H1.66664V17.3889ZM4.26331 9.87333L5.75164 8.385L7.99997 10.6228L10.2378 8.385L11.7261 9.87333L9.48831 12.1111L11.7261 14.3489L10.2378 15.8372L7.99997 13.5994L5.7622 15.8372L4.27386 14.3489L6.51164 12.1111L4.26331 9.87333ZM11.6944 1.55556L10.6389 0.5H5.36108L4.30553 1.55556H0.611084V3.66667H15.3889V1.55556H11.6944Z" fill="white"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            `
        })

        let group = `
        <div class="group-droplist">
            <div class="droplist-head">
                <p class="droplist-title">${el.name}</p>
                <img src="img/arrow-down.png">
            </div>
            <div class="contacts-container">
                ${contactHTML}
            </div>
        </div>
        `

        contactBook.innerHTML += group

    });
    let notes = document.querySelectorAll('.group-droplist')
    for (let i = 0; i < notes.length; i++) {
        notes[i].addEventListener('click', e => scroll(e, i))
    }
}

let deleteContact = contactId => {
    contacts = contacts.filter(c => c.id != contactId)
    updateBook()
    localStorage.setItem('contacts', JSON.stringify(contacts))
}

updateBook()