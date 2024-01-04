const firstPage = document.getElementById('catsTable');
const pages = document.querySelectorAll('.page:not(#sheltersWrapper)');
function closeActivePage() {
    for (const page of pages) {
        if (page.classList.contains('active')) {
            page.classList.remove('active');
            page.classList.add('hidden');
        }
    }
}
//custom alert
function alert_alt(text) {
    const altAlert = document.createElement('div');
    const backDrop = document.createElement('div');
    backDrop.classList.add('backdrop', 'backdrop_alert');
    altAlert.classList.add('alert', 'alert-warning', 'alert-dismissible', 'fade', 'show', 'container', 'custom_alert', 'w-50');
    altAlert.setAttribute('role', 'alert');
    altAlert.innerHTML = text;
    document.querySelector('body').appendChild(altAlert);
    document.querySelector('body').appendChild(backDrop);
}
//listen to mouseclick outside of alert (only if addNewCatForm is active):
document.addEventListener('click', (event) => {
    const alert = document.querySelector('.alert');
    if (addNewCatForm.classList.contains('active') && !addNewCatForm.contains(event.target)) {
        if (alert && !alert.contains(event.target)) {
            alert.remove();
            document.querySelector('.backdrop').remove();
        }
    }
});
//listen to esc:
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        document.querySelector('.alert').remove();
        document.querySelector('.backdrop').remove();
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
    firstPage.classList.toggle('blur-background');
    aboutPageEl.classList.toggle('hidden');
    aboutPageEl.classList.toggle('active');
});
//adding cat: 
const addCatButton = document.getElementById('addNewCat');
addCatButton.addEventListener('click', () => {
    firstPage.classList.toggle('blur-background');
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
    console.log('chipNum: ', chipNum)
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
//3rd shot?
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
//blur all elements except one with .active class:
// const activeElement = document.querySelector('.active');
// const allElements = document.querySelectorAll('*');
// allElements.forEach(element => {
//     if (!element.classList.contains('active') || element.classList.contains('firstPage')) {
//         element.classList.add('blur-background');
//     }
// });
// function alertVal() {
//     var inputVal = document.getElementById('catName').value;
//     alert(inputVal);
// }