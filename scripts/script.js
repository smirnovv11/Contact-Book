if (localStorage.getItem('identifiers') === null) {
    localStorage.setItem('identifiers', JSON.stringify({
        groupId: 0,
        contactId: 0
    }))
}

let identifiers = JSON.parse(localStorage.getItem('identifiers'))
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