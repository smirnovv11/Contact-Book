const addContactBtn = document.querySelector('#contactsBtn')
const contactsPanel = document.querySelector('#contacts-panel')
const contactsContainer = contactsPanel.querySelector('.el-container')
const closeContactsPanel = contactsPanel.querySelector('#close-panel-btn')
const contactSelect = contactsPanel.querySelector('select')
let nameInput = contactsPanel.querySelector('#fullname')
const phoneInput = contactsPanel.querySelector('#phonenumber')
const saveContactBtn = contactsPanel.querySelector('.save-group-btn')

let openContactPanel = () => {
    contactsPanel.classList.toggle('active')
    
    groups.forEach(el => {
        let option = document.createElement('option')
        option.value = el.id
        option.text = el.name
        contactSelect.append(option)
    });
}

addContactBtn.addEventListener('click', () => {
    currContactId = -1
    openContactPanel()
})

let onClose = () => {
    contactsPanel.classList.remove('active');
    contactSelect.innerHTML = '<option value="" disabled selected>Выберите группу</option>'
    nameInput.classList.remove('error')
    nameInput.value = ''
    phoneInput.classList.remove('error')
    phoneInput.value = ''
    contactSelect.classList.remove('error')
}

contactsPanel.addEventListener('click', function(event) {
    if (event.target === contactsPanel) {
        onClose()
    }
});
closeContactsPanel.addEventListener('click', function(event) {
    onClose()
});

function setCursorPosition(pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
    else if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}

function mask(event) {
    var matrix = "+7 (___) ___ - __ - __",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
    if (def.length >= val.length) val = def;
    this.value = matrix.replace(/./g, function(a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
    });
    if (event.type == "blur") {
        if (this.value.length == 2) this.value = "";
    } else setCursorPosition(this.value.length, this);
}

phoneInput.addEventListener("input", mask, false);
phoneInput.addEventListener("focus", mask, false);
phoneInput.addEventListener("blur", mask, false);

let currContactId = -1

saveContactBtn.addEventListener('click', () => {

    if (!isValid())
        return

    let contact = {
        id: currContactId,
        name: nameInput.value,
        phone: phoneInput.value,
        groupId: contactSelect.options[contactSelect.selectedIndex].value
    }

    let existContact = contacts.filter(c => c.id == currContactId)
    if (existContact.length === 1) {
        existContact[0].name = nameInput.value
        existContact[0].phone = phoneInput.value,
        existContact[0].groupId = contactSelect.options[contactSelect.selectedIndex].value
        console.log(contacts.filter(c => c.id == currContactId)[0])
    }
    else {
        currContactId = getFreeContactId()

        contact.id = currContactId

        addContact(contact)
    }

    onClose()
    updateBook()
})

let isValid = () => {
    let res = true
    if (nameInput.value.length === 0){
        nameInput.classList.add('error')
        res = false
    }
    else {
        nameInput.classList.remove('error')
    }

    if (phoneInput.value.length !== 22) {
        phoneInput.classList.add('error')
        res = false
    }
    else {
        phoneInput.classList.remove('error')
    }

    if (contactSelect.selectedIndex === 0) {
        contactSelect.classList.add('error')
        console.log(contactSelect.selectedIndex)
        res = false
    }
    else {
        contactSelect.classList.remove('error')
    }

    return res
}

let loadForEdit = (id) => {

    openContactPanel()

    let obj = contacts.filter(c => c.id == id)[0]

    currContactId = obj.id
    nameInput.value = obj.name
    phoneInput.value = obj.phone
    contactSelect.value = obj.groupId
}