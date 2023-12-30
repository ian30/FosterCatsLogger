const openShelters = document.getElementById('sheltersBtn');

openShelters.addEventListener('click', () => {
    document.getElementById('sheltersWrapper').classList.toggle('hidden');
    document.getElementById('sheltersWrapper').classList.toggle('active');
})