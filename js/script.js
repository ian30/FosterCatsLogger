//const pageElements = document.getElementsByClassName('page');
const pageElements = document.querySelectorAll('.page:not(#editCatWrapper)');
const aboutPageEl = document.getElementById('about');
const addNewCatPageEl = document.getElementById('addNewCatForm');
const editCatWrapperEl = document.getElementById('editCatsWrapper');
const catEditContainerEl = document.querySelectorAll('.newCatEditContiner');
// hide everything but front page:
for (let i = 1; i < pageElements.length; i++) {
    pageElements[i].classList.add('hidden');
}
//about: 
const aboutButton = document.getElementById('aboutBtn');
aboutButton.addEventListener('click', () => {
    aboutPageEl.classList.toggle('hidden');
    aboutPageEl.classList.toggle('active');
});
//adding cat: 
const addCatButton = document.getElementById('addNewCat');
addCatButton.addEventListener('click', () => {
    addNewCatPageEl.classList.toggle('hidden');
    addNewCatPageEl.classList.toggle('active');
});
function deleteCat(index) {
    if (!confirm("Do you want to delete the cat? (this cannot be undone)")) {
        return;
    } else {
        let catCollectionStorage = JSON.parse(localStorage.getItem('cats') || []);
        catCollectionStorage.splice(index, 1);
        //save back to localStorage:
        localStorage.setItem('cats', JSON.stringify(catCollectionStorage));
        location.reload();
    }
}
function alertVal() {
    var inputVal = document.getElementById('catName').value;
    alert(inputVal);
}