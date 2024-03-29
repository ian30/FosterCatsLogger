const firstPage = document.getElementById('catsTable');
const pageElements = document.querySelectorAll('.page:not(#editCatWrapper)');
const aboutPageEl = document.getElementById('about');
const addNewCatPageEl = document.getElementById('addNewCatForm');
const editCatWrapperEl = document.getElementById('editCatsWrapper');
const catEditContainerEl = document.querySelectorAll('.newCatEditContiner');
const pages = document.querySelectorAll('.page');
//custom alert
function alert_alt(text) {
    const altAlert = document.createElement('div');
    const backDrop = document.createElement('div');
    backDrop.setAttribute('id', 'backdrop');
    backDrop.classList.add('backdrop', 'backdrop_alert');
    altAlert.classList.add('alert', 'alert-warning', 'alert-dismissible', 'fade', 'show', 'container', 'custom_alert', 'w-50');
    altAlert.setAttribute('role', 'alert');
    altAlert.innerHTML = text;
    document.querySelector('body').appendChild(altAlert);
    document.querySelector('body').appendChild(backDrop);
    const alertEl = document.querySelector('.alert');
    const backdropEl = document.getElementById('backdrop');
    //check if alert is in the dom:
    if (alertEl) {
        //listen to mouseclick outside of alert (only if addNewCatForm is active):
        backDrop.addEventListener('click', (e) => {
            alertEl.remove();
            backdropEl.remove();
        })
    }
}
//listen to esc:
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const alertElement = document.querySelector('.alert');
        const backdropElement = document.getElementById('backdrop');
        if (alertElement) {
            alertElement.remove();
        } else if (backdropElement) {
            backdropElement.remove();
        } else {
            console.log('no alert or backdrop found');
        }
        for (i = 0; i < pages.length; i++) {
            if (pages[i].classList.contains('active')) {
                pages[i].classList.remove('active');
                pages[i].classList.add('hidden');
                firstPage.classList.remove('blur-background');
            }
        }
    }
});
//demo cats (if no cats in localStorage):
document.addEventListener('DOMContentLoaded', () => {
    const demoCats = [
        {
            "id": 0,
            "shelter": "Save The Cats AZ",
            "shelterId": 0,
            "name": "Walter",
            "breed": "Maine Coon",
            "chipped": "Yes",
            "chip_number": "65468765435254968",
            "dob": "2020-01-01",
            "age": "3 yrs 11 mon 3 wks 1 days",
            "gender": "Male",
            "weight": 10,
            "weightTakenOn": "2023-01-10",
            "weightTracker": {
                "record0": { "id": 0, "weight": 5.3, "takenOn": "2021-07-01" },
                "record1": { "id": 1, "weight": 8.1, "takenOn": "2022-01-01" },
                "record2": { "id": 2, "weight": 10.5, "takenOn": "2023-01-10" }
            },
            "spayStatus": "Spayed",
            "shotStatus": "Yes",
            "firstShotsDate": "2021-07-01",
            "secondShotsDate": "2022-01-01",
            "rabiesShotsDate": "2023-01-10",
            "genericNotes": "Very playful and loves to nap in the sun.",
            "medicationStat": "No",
            "medicationTracker": {},
            "medicalnotes": "Healthy with regular check-ups."
        },
        {
            "id": 1,
            "shelter": "Save The Cats AZ",
            "shelterId": 0,
            "name": "Chrissy",
            "breed": "Tabby",
            "chipped": "No",
            "chip_number": "",
            "dob": "2019-05-15",
            "age": "4 yrs 7 mon 1 wks 1 days",
            "gender": "Female",
            "weight": 12,
            "weightTakenOn": "2023-02-20",
            "weightTracker": {
                "record0": { "id": 0, "weight": 10, "takenOn": "2021-08-15" },
                "record1": { "id": 1, "weight": 11, "takenOn": "2022-02-15" },
                "record2": { "id": 2, "weight": 12, "takenOn": "2023-02-20" }
            },
            "spayStatus": "Spayed",
            "shotStatus": "Yes",
            "firstShotsDate": "2021-07-01",
            "secondShotsDate": "2022-01-01",
            "rabiesShotsDate": "2023-01-10",
            "genericNotes": "Loves attention and is very vocal.",
            "medicationStat": "No",
            "medicationTracker": {},
            "medicalnotes": "No known allergies."
        },
        {
            "id": 2,
            "shelter": "Gratful Hearts",
            "shelterId": 0,
            "name": "Boots",
            "breed": "Tabby",
            "chipped": "Yes",
            "chip_number": "43534532396786456",
            "dob": "2018-10-30",
            "age": "5 yrs 1 mon 2 wks 6 days",
            "gender": "Female",
            "weight": 11,
            "weightTakenOn": "2023-03-05",
            "weightTracker": {
                "record0": { "id": 0, "weight": 9, "takenOn": "2021-09-10" },
                "record1": { "id": 1, "weight": 10, "takenOn": "2022-03-10" },
                "record2": { "id": 2, "weight": 11, "takenOn": "2023-03-05" }
            },
            "spayStatus": "Neutered",
            "shotStatus": "Yes",
            "firstShotsDate": "2021-07-01",
            "secondShotsDate": "2022-01-01",
            "rabiesShotsDate": "2023-01-10",
            "genericNotes": "A bit shy but very affectionate once comfortable.",
            "medicationStat": "No",
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
function closeActivePage(sourceEl, target1El, target2El) {
    if (target1El.classList.contains('active')) {
        target1El.classList.add('hidden');
        target1El.classList.remove('active');
        sourceEl.classList.remove('hidden');
        sourceEl.classList.add('active');
    } else if (target2El.classList.contains('active')) {
        target2El.classList.add('hidden');
        target2El.classList.remove('active');
        sourceEl.classList.remove('hidden');
        sourceEl.classList.add('active');
    } else {
        firstPage.classList.toggle('blur-background');
        sourceEl.classList.toggle('hidden');
        sourceEl.classList.toggle('active');
    }
}

// hide everything but front page:
for (let i = 1; i < pageElements.length; i++) {
    pageElements[i].classList.add('hidden');
}
//about: 
const aboutButton = document.getElementById('aboutBtn');
aboutButton.addEventListener('click', () => {
    closeActivePage(aboutPageEl, sheltersWrapperEl, addNewCatPageEl);
});
//adding cat: 
const sheltersWrapperEl = document.getElementById('sheltersWrapper');
const addCatButton = document.getElementById('addNewCat');
addCatButton.addEventListener('click', () => {
    closeActivePage(addNewCatPageEl, sheltersWrapperEl, aboutPageEl);

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
//is cat chipped?
function isCatChipped() {
    let isCatChipped = document.getElementById('isCatChipped').value;
    return isCatChipped === 'Yes';
}
const isCatChippedElement = document.getElementById('isCatChipped');
isCatChippedElement.addEventListener('change', () => {
    const parentEl = isCatChippedElement.parentNode.parentElement.nextElementSibling;
    isCatChipped = isCatChippedElement.value;
    let chipNumber;
    if (isCatChipped === 'Yes') {
        parentEl.classList.remove('hidden');
        //get chip #:
        chipNumber = document.getElementById('addNewCatChipNumber').value;
    } else if (isCatChipped === 'No') {
        parentEl.classList.add('hidden');
    } else {
        if (parentEl.classList.contains('hidden')) {
            isCatChipped = 'Unknown';
            console.log('unknown? ', isCatChipped)
        }
    }
    console.log('chipNum: ', chipNumber)
})
// shots? 
const isCatShotsElement = document.getElementById('addNewCatShotStatus');
isCatShotsElement.addEventListener('change', () => {
    const parentEl = isCatShotsElement.parentNode.parentElement.nextElementSibling;
    isCatShots = isCatShotsElement.value;
    if (isCatShots === 'Yes') {
        parentEl.classList.remove('hidden');
    } else if (isCatShots === 'No') {
        parentEl.classList.add('hidden');
    }
})
//2nd shot?
const isCat2ndShotElement = document.getElementById('addNewCatShowSecondShotDate');
isCat2ndShotElement.addEventListener('click', () => {
    const targetEl = isCat2ndShotElement.parentNode.nextElementSibling;
    targetEl.classList.toggle('hidden');
})
//3rd shot? (high pitch mandatory)
const isCat3rdShotElement = document.getElementById('addNewCatShowThirdShotDate');
isCat3rdShotElement.addEventListener('click', () => {
    const targetEl = isCat3rdShotElement.parentNode.nextElementSibling;
    targetEl.classList.toggle('hidden');
})
//rabies shot?
const isCatRabiesShotElement = document.getElementById('addNewCatShowRabiesShotDate');
isCatRabiesShotElement.addEventListener('click', () => {
    const targetEl = isCatRabiesShotElement.parentNode.nextElementSibling;
    targetEl.classList.toggle('hidden');
})
// function alertVal() {
//     var inputVal = document.getElementById('catName').value;
//     alert(inputVal);
// }