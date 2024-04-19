const groupsBtn = document.querySelector('#groupsBtn')
const groupsLeftPanel = document.querySelector('.groups-left-panel')
const closePanel = document.querySelector('#close-panel-btn')

groupsBtn.addEventListener('click', (e) => {
    groupsLeftPanel.classList.toggle('active')
})

groupsLeftPanel.addEventListener('click', function(event) {
    if (event.target === groupsLeftPanel) {
        groupsLeftPanel.classList.remove('active');
    }
});
closePanel.addEventListener('click', function(event) {
    groupsLeftPanel.classList.remove('active');
});