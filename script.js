if (localStorage.getItem('identifiers') === null) {
    localStorage.setItem('identifiers', JSON.stringify({
        groupId: 0,
        contactId: 0
    }))
}

let identifiers = JSON.parse(localStorage.getItem('identifiers'))

let getFreeGroupId = () => {
    identifiers.groupId += 1
    localStorage.setItem('identifiers', JSON.stringify(identifiers))
    return identifiers.groupId
}