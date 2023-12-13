document.addEventListener('DOMContentLoaded', () => {
    const demoCats = [
        {
            "id": 0,
            "name": "Whiskers",
            "breed": "Siamese",
            "dob": "2020-01-01",
            "age": 3,
            "gender": "Male",
            "weight": "10 lbs",
            "weightTakenOn": "2023-01-10",
            "weightTracker": {
                "record0": { "id": 0, "weight": 8, "takenOn": "2021-07-01" },
                "record1": { "id": 1, "weight": 9, "takenOn": "2022-01-01" },
                "record2": { "id": 2, "weight": 10, "takenOn": "2023-01-10" }
            },
            "spayStatus": "Spayed",
            "shotStatus": "Up-to-date",
            "genericNotes": "Very playful and loves to nap in the sun.",
            "medicationStat": "None",
            "medicationTracker": {},
            "medicalnotes": "Healthy with regular check-ups."
        },
        {
            "id": 1,
            "name": "Mittens",
            "breed": "Maine Coon",
            "dob": "2019-05-15",
            "age": 4,
            "gender": "Female",
            "weight": "12 lbs",
            "weightTakenOn": "2023-02-20",
            "weightTracker": {
                "record0": { "id": 0, "weight": 10, "takenOn": "2021-08-15" },
                "record1": { "id": 1, "weight": 11, "takenOn": "2022-02-15" },
                "record2": { "id": 2, "weight": 12, "takenOn": "2023-02-20" }
            },
            "spayStatus": "Spayed",
            "shotStatus": "Up-to-date",
            "genericNotes": "Loves attention and is very vocal.",
            "medicationStat": "None",
            "medicationTracker": {},
            "medicalnotes": "No known allergies."
        },
        {
            "id": 2,
            "name": "Shadow",
            "breed": "British Shorthair",
            "dob": "2018-10-30",
            "age": 5,
            "gender": "Male",
            "weight": "11 lbs",
            "weightTakenOn": "2023-03-05",
            "weightTracker": {
                "record0": { "id": 0, "weight": 9, "takenOn": "2021-09-10" },
                "record1": { "id": 1, "weight": 10, "takenOn": "2022-03-10" },
                "record2": { "id": 2, "weight": 11, "takenOn": "2023-03-05" }
            },
            "spayStatus": "Neutered",
            "shotStatus": "Up-to-date",
            "genericNotes": "A bit shy but very affectionate once comfortable.",
            "medicationStat": "None",
            "medicationTracker": {},
            "medicalnotes": "Regular vet visits, no major issues."
        }
    ]

    function getDemoDataIfNoCats() {
        if (!localStorage.getItem('cats')) {
            localStorage.setItem('cats', JSON.stringify(demoCats));
        }
    }
    getDemoDataIfNoCats();
})

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