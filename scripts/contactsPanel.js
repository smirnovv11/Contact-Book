const addContactBtn = document.querySelector('#contactsBtn')
const contactsPanel = document.querySelector('#contacts-panel')
const contactsContainer = contactsPanel.querySelector('.el-container')
const closeContactsPanel = contactsPanel.querySelector('#close-panel-btn')
const contactSelect = contactsPanel.querySelector('select')

addContactBtn.addEventListener('click', () => {
    contactsPanel.classList.toggle('active')
    
    groups.forEach(el => {
        let option = document.createElement('option')
        option.value = el.id
        option.text = el.name
        contactSelect.append(option)
    });
})
contactsPanel.addEventListener('click', function(event) {
    if (event.target === contactsPanel) {
        contactsPanel.classList.remove('active');
        contactSelect.innerHTML = ''
    }
});
closeContactsPanel.addEventListener('click', function(event) {
    contactsPanel.classList.remove('active');
    contactSelect.innerHTML = ''
});