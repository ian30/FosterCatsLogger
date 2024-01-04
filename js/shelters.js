const openShelters = document.getElementById('sheltersBtn');

openShelters.addEventListener('click', () => {
    closeActivePage();
    firstPage.classList.toggle('blur-background');
    document.getElementById('sheltersWrapper').classList.toggle('hidden');
    document.getElementById('sheltersWrapper').classList.toggle('active');
})