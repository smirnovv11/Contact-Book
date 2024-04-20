const addContactBtn = document.querySelector('#contactsBtn')
const contactsPanel = document.querySelector('#contacts-panel')
const contactsContainer = contactsPanel.querySelector('.el-container')
const closeContactsPanel = contactsPanel.querySelector('#close-panel-btn')
const contactSelect = contactsPanel.querySelector('select')
let nameInput = contactsPanel.querySelector('#fullname')
const phoneInput = contactsPanel.querySelector('#phonenumber')
const saveContactBtn = contactsPanel.querySelector('.save-group-btn')

addContactBtn.addEventListener('click', () => {
    contactsPanel.classList.toggle('active')
    
    groups.forEach(el => {
        let option = document.createElement('option')
        option.value = el.id
        option.text = el.name
        contactSelect.append(option)
    });
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

saveContactBtn.addEventListener('click', () => {

    if (!isValid())
        return
    
    let contact = {
        id: getFreeContactId(),
        name: nameInput.value,
        phone: phoneInput.value,
        groupId: contactSelect.options[contactSelect.selectedIndex].value
    }
    addContact(contact)
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