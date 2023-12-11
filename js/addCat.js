const addNewCat = document.getElementById('addNewCat');
const addCatFormWrapper = document.getElementById('addCatFormWrapper');
const addCatForm = document.getElementById('addCatForm');
const saveNewCatBtn = document.getElementById('saveNewCatBtn');

saveNewCatBtn.addEventListener('click', () => {
    const newCatName = document.getElementById('addNewCatName').value;
    const newCatDOB = document.getElementById('addNewCatDOB').value;
    const newCatGender = document.getElementById('addNewCatGender').value;
    if (!newCatName) {
        alert('Please enter cat name');
    } else {
        function calcNewCatAge(newCatDOB) {
            const birthDate = new Date(newCatDOB);
            const currentDate = new Date();
            const oneDay = 1000 * 60 * 60 * 24;
            const oneMonth = 30;
            const oneYear = 365;
            // Calculate total days from DOB to today
            const ageInDays = Math.floor((currentDate - birthDate) / oneDay);
            let years = Math.floor(ageInDays / oneYear);
            let remainingDays = ageInDays % oneYear;
            let months = Math.floor(remainingDays / oneMonth);
            remainingDays = remainingDays % oneMonth;
            let weeks = Math.floor(remainingDays / 7);
            let days = remainingDays % 7;
            // Construct the age string
            let newCatAge = '';
            if (years > 0) newCatAge += `${years} yrs `;
            if (months > 0) newCatAge += `${months} mon `;
            if (weeks > 0) newCatAge += `${weeks} wks `;
            if (days > 0) newCatAge += `${days} days`;
            return newCatAge.trim();
        }

        const addNewCatAgeEl = document.getElementById('addNewCatAge');
        addNewCatAgeEl.value = calcNewCatAge(newCatDOB);
        const newCatBreed = document.getElementById('addNewCatBreed').value;
        const addNewCatGenericNotes = document.getElementById('addNewCatNotes').value;
        const addNewCatMedicalNotes = document.getElementById('addNewCatMedicalNotes').value;
        const newCatSpayStatus = document.getElementById('addNewCatSpayedNeutered').value;
        const newCatShotStatus = document.getElementById('addNewCatShotStatus').value;
        const newCatWeight = document.getElementById('addNewCatWeight').value;
        const addNewCatWeightTakenOnEl = document.getElementById('addNewCatWeightTakenOn');
        const today = new Date();
        const formattedDate = (today.getMonth() + 1).toString().padStart(2, '0') + '/' +
            today.getDate().toString().padStart(2, '0') + '/' +
            today.getFullYear();
        addNewCatWeightTakenOnEl.value = formattedDate;
        const medicationStat = document.getElementById('addNewCatMedicationStat').value;
        // Retrieve the cats data from localStorage and parse it
        let catsData = JSON.parse(localStorage.getItem('cats'));
        let cat_id;
        if (!catsData) {
            cat_id = 0;
        } else {
            cat_id = catsData.length;
        }
        // Construct the cat object
        const newCat = {
            id: cat_id,
            name: newCatName,
            breed: newCatBreed,
            dob: newCatDOB,
            age: calcNewCatAge(newCatDOB),
            gender: newCatGender,
            weight: newCatWeight,
            weightTakenOn: formattedDate,
            weightTracker: {
                record: {
                    id: cat_id,
                    weight: newCatWeight,
                    takenOn: formattedDate
                }
            },
            spayStatus: newCatSpayStatus,
            shotStatus: newCatShotStatus,
            genericNotes: addNewCatGenericNotes,
            medicationStat: medicationStat,
            medicationTracker: {
                record: {
                    id: cat_id,
                    medicationName: 'medName',
                    medicationDosage: 'medDosage',
                    medicationTakenOn: 'medTakenOnDate',
                    medicationNotes: 'medNotes'
                }
            },
            medicalnotes: addNewCatMedicalNotes
        };

        // Save to localStorage
        const cats = JSON.parse(localStorage.getItem('cats')) || [];
        cats.push(newCat);
        localStorage.setItem('cats', JSON.stringify(cats));
    }

    //debug: 
    // console.log(
    //     'cat name: ' + newCatName + "\n",
    //     'cat breed: ' + newCatBreed + "\n",
    //     'cat dob: ' + newCatDOB + "\n",
    //     'cat age: ' + calcNewCatAge(newCatDOB) + "\n",
    //     'cat gender: ' + newCatGender + "\n",
    //     'cat weight: ' + newCatWeight + " lbs" + "\n",
    //     'taken on: ' + formattedDate + "\n",
    //     'Spayed/Neutered: ' + newCatSpayStatus + "\n",
    //     'Shots Status: ' + newCatShotStatus + "\n",
    //     'medications?' + medicationStat + "\n",
    //     'Notes: ' + addNewCatGenericNotes + "\n",
    //     'Medical Notes: ' + addNewCatMedicalNotes
    // );
    location.reload();
})