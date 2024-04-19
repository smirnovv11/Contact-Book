let groups = JSON.parse(localStorage.getItem('groups'))

const groupsBtn = document.querySelector('#groupsBtn')
const groupsLeftPanel = document.querySelector('.left-panel')
const closePanel = groupsLeftPanel.querySelector('#close-panel-btn')
const groupsContainer = groupsLeftPanel.querySelector('.el-container')

const addBtn = groupsLeftPanel.querySelector('.add-group-btn');
const saveBtn = groupsLeftPanel.querySelector('.save-group-btn');

groupsBtn.addEventListener('click', () => {
    groupsLeftPanel.classList.toggle('active')
    groups.forEach(el => {
        let group = `
        <div class="group-element" id="g${el.id}">
            <input type="text" placeholder="Введите название" maxlength="100" value="${el.name}">
            <button class="btn delete-group-btn" onClick='deleteGroup(${el.id})'>
                <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.66664 17.3889C1.66664 18.55 2.61664 19.5 3.77775 19.5H12.2222C13.3833 19.5 14.3333 18.55 14.3333 17.3889V4.72222H1.66664V17.3889ZM4.26331 9.87333L5.75164 8.385L7.99997 10.6228L10.2378 8.385L11.7261 9.87333L9.48831 12.1111L11.7261 14.3489L10.2378 15.8372L7.99997 13.5994L5.7622 15.8372L4.27386 14.3489L6.51164 12.1111L4.26331 9.87333ZM11.6944 1.55556L10.6389 0.5H5.36108L4.30553 1.55556H0.611084V3.66667H15.3889V1.55556H11.6944Z" fill="white"/>
                </svg>
            </button>
        </div>`
    
        groupsContainer.innerHTML += group
    });
})

let deleteGroup = (id) => {
    groupsContainer.querySelector(`#g${id}`).remove()
}


groupsLeftPanel.addEventListener('click', function(event) {
    if (event.target === groupsLeftPanel) {
        groupsLeftPanel.classList.remove('active');
        groupsContainer.innerHTML = ''
    }
});
closePanel.addEventListener('click', function(event) {
    groupsLeftPanel.classList.remove('active');
    groupsContainer.innerHTML = ''
});

saveBtn.addEventListener('click', () => {
    groups = []
    let groupEls = groupsContainer.querySelectorAll('.group-element')
    groupEls.forEach(el => {
        if (el.querySelector('input').value !== '') {
            groups.push({
                id: el.id.replace('g', ''),
                name: el.querySelector('input').value
            })
        }
    })

    localStorage.setItem('groups', JSON.stringify(groups))
    groupsLeftPanel.classList.remove('active');
    groupsContainer.innerHTML = ''
})

addBtn.addEventListener('click', () => {
    let id = getFreeGroupId()

    let group = `
        <div class="group-element" id="g${id}">
            <input type="text" placeholder="Введите название" maxlength="100" value="">
            <button class="btn delete-group-btn" onClick='deleteGroup(${id})'>
                <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.66664 17.3889C1.66664 18.55 2.61664 19.5 3.77775 19.5H12.2222C13.3833 19.5 14.3333 18.55 14.3333 17.3889V4.72222H1.66664V17.3889ZM4.26331 9.87333L5.75164 8.385L7.99997 10.6228L10.2378 8.385L11.7261 9.87333L9.48831 12.1111L11.7261 14.3489L10.2378 15.8372L7.99997 13.5994L5.7622 15.8372L4.27386 14.3489L6.51164 12.1111L4.26331 9.87333ZM11.6944 1.55556L10.6389 0.5H5.36108L4.30553 1.55556H0.611084V3.66667H15.3889V1.55556H11.6944Z" fill="white"/>
                </svg>
            </button>
        </div>`
    
        groupsContainer.innerHTML += group
})