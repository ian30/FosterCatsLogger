let catsData = JSON.parse(localStorage.getItem('cats'));
let tableBody = document.querySelector('.table tbody');
tableBody.innerHTML = '';
const newCatDOB = document.getElementById('addNewCatDOB').value;
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
    // Construct age string
    let newCatAge = '';
    if (years > 0) newCatAge += `${years} yrs `;
    if (months > 0) newCatAge += `${months} mon `;
    if (weeks > 0) newCatAge += `${weeks} wks `;
    if (days > 0) newCatAge += `${days} days`;
    return newCatAge.trim();
}
if (!catsData) {
    console.log('no cats found in localStorage');
} else {
    console.log('cats found in localStorage', catsData);
    catsData.forEach((cat, index) => {
        let row = document.createElement('tr');

        let idCell = document.createElement('td');
        idCell.textContent = index + 1;
        row.appendChild(idCell);

        let nameCell = document.createElement('td');
        nameCell.textContent = cat.name;
        row.appendChild(nameCell);

        let genderCell = document.createElement('td');
        genderCell.textContent = cat.gender;
        row.appendChild(genderCell);

        let ageCell = document.createElement('td');
        ageCell.textContent = calcNewCatAge(cat.dob);
        row.appendChild(ageCell);

        let weightCell = document.createElement('td');
        weightCell.setAttribute('align', 'center');
        weightCell.textContent = cat.weight;
        row.appendChild(weightCell);


        let actionCell = document.createElement('td');
        actionCell.classList.add('text-center');

        let btnGroup = document.createElement('div');
        btnGroup.classList.add('btn-group');
        btnGroup.setAttribute('role', 'group');

        let editBtn = document.createElement('button');
        editBtn.setAttribute('type', 'button');
        editBtn.setAttribute('id', `editBtnCatId-${index}`);
        editBtn.setAttribute('onclick', `editCat(${index})`);
        editBtn.classList.add('btn', 'editButton', 'btn-sm');
        editBtn.textContent = 'Edit';

        let healthTrackerBtn = document.createElement('button');
        healthTrackerBtn.setAttribute('type', 'button');
        healthTrackerBtn.setAttribute('id', `healthTrackerCatId-${index}`);
        healthTrackerBtn.setAttribute('onclick', `showHealthTracker(${index})`);
        healthTrackerBtn.classList.add('btn', 'btn-primary', 'btn-sm');
        healthTrackerBtn.textContent = 'Health Tracker';

        let deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('type', 'button');
        deleteBtn.setAttribute('id', `delCatId-${index}`);
        deleteBtn.setAttribute('onclick', `deleteCat(${index})`);
        deleteBtn.classList.add('btn', 'deleteButton', 'btn-sm');
        deleteBtn.textContent = 'Delete';

        btnGroup.appendChild(editBtn);
        btnGroup.appendChild(healthTrackerBtn);
        btnGroup.appendChild(deleteBtn);

        actionCell.appendChild(btnGroup);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
    });
}

// edit cat: 
const catsEditContainer = document.getElementById('editCatsWrapper');
catsEditContainer.innerHTML = '';

if (!catsData) {
    console.log('no cats found in localStorage');
} else {
    catsData.forEach((cat, i) => {
        let catName = cat.name;
        let catBreed = cat.breed;
        let catGender = cat.gender;
        let catAge = cat.age;
        let catGenNotes = cat.genericNotes;
        let medicalNotes = cat.medicalnotes;
        let medsStat = cat.medicationStat;
        let shotStatus = cat.shotStatus;
        let spayStatus = cat.spayStatus;
        let weight = cat.weight;
        let weightTakenOn = cat.weightTakenOn;
        let firstShotsTakenOn = cat.firstShotsDate;
        let secondShotsTakenOn = cat.rabiesShotsDate;
        let rabiesShotsTakenOn = cat.secondShotsDate;
        //creating edit element for each cat:
        let parentDiv = document.createElement('div');
        parentDiv.setAttribute('id', `editCatId-${i}`)
        parentDiv.classList.add(`newCatEditContiner`, `catId-${i}`, 'hidden');
        parentDiv.innerHTML = `
        <div class="editCatid-${i} ">
            <div class="container">
                <h3>Editing - ${catName}</h3>
                <form action="#" method="POST" name="editCatForm" id="editCatForm-catIt-${i}">
                    <div class="row">
                        <div class="col ">
                            <strong>Generic Details:</strong>
                            <hr />
                            <div class="form-group position-relative">
                                <div class="input-group mb-4">
                                    <span class="input-group-text">Name</span>
                                    <input type="text" name="editCatNameInput-catId-${i}" id="editCatNameInput-catId-${i}" class="form-control" value="${catName}" disabled >
                                    <button type="button" class="btn btn-primary" id="showCatNameInput-catId-${i}">Change</button>
                                </div>
                                <div class="edit-catName" id="edit-catName-input-${i}">
                                    <input type="text" name="newCatNameInput-catId-${i}" id="newCatNameInput-catId-${i}" class="form-control" value="${catName}" >
                                    <div class=" text-center btn-group w-100 mt-2 p-3" role="group">
                                        <button type="button" class="btn btn-primary btn-lg" id="saveCatName-catId-${i}">Save</button>
                                        <button type="button" class="btn btn-secondary btn-lg cancelLocalEditBtn">Cancel</button>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group mb-4 ">
                                <div class="input-group">
                                    <span class="input-group-text">Date of Birth</span>
                                    <input type="date" name="editCatDOB" id="editCatDOB" class="form-control" value="${cat.dob}" disabled>
                                </div>
                            </div>
                            <div class="form-group mb-4">
                                <div class="input-group">
                                    <span class="input-group-text">Age </span>
                                    <input type="text" name="editCatAge-catIt-${i}" placeholder="${catAge}" id="editCatAge-catIt-${i}" class="form-control" disabled="">
                                </div>
                            </div>
    
                            <div class="form-group mb-4 position-relative">
                                <div class="input-group ">
                                    <span class="input-group-text">Gender</span>
                                    <input type="text" value="${catGender}" class="form-control" id="editGenderTextInput-catId-${i}" disabled />
                                    <button type="button" class="btn btn-primary" id="showCatGenderList-catId-${i}">Change</button>
                                </div>
                                <div class="edit-catGender-list" id="editCatGender-catId-${i}">
                                    <select name="editCatGenderList-catId-${i}" id="editCatGenderList-catId-${i}" class="form-select">
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    <div class=" text-center btn-group w-100 mt-2 p-3" role="group">
                                        <button type="button" class="btn btn-primary btn-lg" id="saveCatGender-catId-${i}">Save</button>
                                        <button type="button" class="btn btn-secondary btn-lg cancelLocalEditBtn">Cancel</button>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="form-group mb-4 position-relative">
                                <div class="input-group">
                                    <span class="input-group-text">Breed</span>
                                    <input type="text" disabled class="form-control" name="editCatBreedTextInput" id="editCatBreedTextInput-catId-${i}" value="${catBreed}" />
                                    <button type="button" class="btn btn-primary" id="showCatBreedList-catId-${i}">Change</button>
                                </div>
                                <div class="edit-catBreed-list" id="edit-catBreed-list-catId-${i}">
                                    <select name="editCatBreed-catId-${i}" id="editCatBreed-catId-${i}" class="form-select">
                                        <option value="Tabby">Tabby</option>
                                        <option value="American Shorthair">American Shorthair</option>
                                        <option value="Maine Coon">Maine Coon</option>
                                        <option value="Persian">Persian</option>
                                        <option value="Ragdoll">Ragdoll</option>
                                        <option value="Scottish Fold">Scottish Fold</option>
                                        <option value="Siamese">Siamese</option>
                                        <option value="Sphynx">Sphynx</option>
                                        <option value="Abyssinian">Abyssinian</option>
                                        <option value="Devon Rex">Devon Rex</option>
                                        <option value="Himalayan">Himalayan</option>
                                        <option value="Manx">Manx</option>
                                        <option value="Siberian">Siberian</option>
                                        <option value="Turkish Angora">Turkish Angora</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <div class=" text-center btn-group w-100 mt-2 p-3" role="group">
                                        <button type="button" class="btn btn-primary btn-lg" id="saveCatBreed-catId-${i}">Save</button>
                                        <button type="button" class="btn btn-secondary btn-lg cancelLocalEditBtn">Cancel</button>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group mb-4 position-relative">
                                <div class="input-group">
                                    <span class="input-group-text">Chip #:</span>
                                    <input type="text" class="form-control" name="editCatChipNumber-catId-${i}" id="editCatChipNumber-catId-${i}" value="${addNewCatChipNumber}" />
                                </div>
                            </div>                            
    
                            <div class="form-group mb-4">
                                <div class="input-group">
                                    <span class="input-group-text">Notes:</span>
                                    <textarea name="editCatNotes-catId-${i}" id="editCatNotes-catId-${i}" class="form-control" rows="3" >${catGenNotes}</textarea>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <strong>Health Information:</strong>
                            <hr />
                            <div class="form-group mb-4 position-relative">
                                <div class="input-group">
                                    <span class="input-group-text">Fixed</span>
                                    <input type="text" class="form-control " value="${spayStatus}" id="editSpayStatusTextInput-catId-${i}" disabled />
                                    <button type="button" class="btn btn-primary" id="showSpayStatList-catId-${i}">Edit</button>
                                </div>
                                <div class="edit-CatSpayStat" id="editCatSpayStat-catId-${i}">
                                    <select name="editCatSpayedNeutered-catId-${i}" id="editCatSpayedNeutered-catId-${i}" class="form-select">
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                        <option value="Unknown">Unknown</option>
                                    </select>
                                    <div class=" text-center btn-group w-100 mt-2 p-3" role="group">
                                        <button type="button" class="btn btn-primary btn-lg" id="saveCatSpayStat-catId-${i}">Save</button>
                                        <button type="button" class="btn btn-secondary btn-lg cancelLocalEditBtn">Cancel</button>
                                    </div>
                                </div>
                            </div>
    
                            <div class="form-group mb-4 position-relative">
                                <div class="input-group">
                                    <span class="input-group-text">Shots</span>
                                    <input type="text" class="form-control " value="${shotStatus}" id="editShotStatusTextInput-catId-${i}" disabled />
                                    <button type="button" class="btn btn-primary" id="showShotsStatList-catId-${i}">Edit</button>
                                </div>
                                <div class="edit-CatShotsStat" id="editCatShotsStat-catId-${i}">
                                    <select name="editCatShotStatusList-catId-${i}" id="editCatShotStatusList-catId-${i}" class="form-select">
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                        <option value="Unknown">Unknown</option>
                                    </select>
                                    <div class=" text-center btn-group w-100 mt-2 p-3" role="group">
                                        <button type="button" class="btn btn-primary btn-lg" id="saveCatShotsStat-catId-${i}">Save</button>
                                        <button type="button" class="btn btn-secondary btn-lg cancelLocalEditBtn">Cancel</button>
                                    </div>
                                </div>
                                <div class="shots_dates_container">
                                    <div class="input-group">
                                        <span class="input-group-text">1st Shots:</span>
                                        <input type="date" class="form-control " value="${firstShotsTakenOn}" id="editFirstShotsTextInput-catId-${i}" disabled />
                                    </div>
                                    <div class="input-group">
                                        <span class="input-group-text">2nd Shots:</span>
                                        <input type="date" class="form-control " value="${secondShotsTakenOn}" id="editSecondShotsTextInput-catId-${i}" disabled />
                                    </div>
                                    <div class="input-group">
                                        <span class="input-group-text">Rabies:</span>
                                        <input type="date" class="form-control " value="${rabiesShotsTakenOn}" id="editRabiesShotsTextInput-catId-${i}" disabled />
                                    </div>
                                </div>
                            </div>
    
                            <div class="form-group mb-4">
                                <div class="input-group">
                                    <span class="input-group-text">Init Weight</span>
                                    <input type="number" name="editCatWeight" id="editCatWeight" value="${weight}" disabled class="form-control">
                                    <span class="input-group-text">lbs</span>
                                </div>
                                <div class="form-group mb-4">
                                    <div class="input-group">
                                        <span class="input-group-text">Taken On</span>
                                        <input type="text" name="editCatWeightTakenOn" value="" placeholder="${weightTakenOn}" id="editCatWeightTakenOn" class="form-control" disabled="">    
                                    </div>
                                </div>
                            </div>
                            <div class="form-group mb-4 position-relative">
                                <div class="input-group">
                                    <span class="input-group-text">On Meds?</span>
                                    <input type="text" class="form-control" disabled value="${medsStat}" id="editMedsStatTextInput-catId-${i}" />
                                    <button type="button" class="btn btn-primary" id="showMedsStatList-catId-${i}">Edit</button>
                                </div> 
                                <div class="edit-CatMedsStat" id="editCatMedsStat-catId-${i}">
                                    <select name="editCatMedicationStat-catId-${i}" id="editCatMedicationStat-catId-${i}" class="form-select">
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                    <div class=" text-center btn-group w-100 mt-2 p-3" role="group">
                                        <button type="button" class="btn btn-primary btn-lg" id="saveCatMedsStat-catId-${i}">Save</button>
                                        <button type="button" class="btn btn-secondary btn-lg cancelLocalEditBtn" id="editCatMedsStatChangeCancel-catId-2">Cancel</button>
                                    </div>
                                </div>
                            </div>
    
                            <div class="form-group mb-4">
                                <div class="input-group">
                                    <span class="input-group-text">Medical Notes:</span>
                                    <textarea name="editCatMedicalNotes-catId-${i}" id="editCatMedicalNotes-catId-${i}" class="form-control" rows="4">${medicalNotes}</textarea>
                                </div>
                            </div>
                                    
                            </div>
                        </div>
                        <div class="row">
                            <div class="container text-center">
                                <hr />
                                <div class=" text-center btn-group w-75 mt-2 p-3" role="group">
                                    <button type="button" class="btn btn-primary btn-lg" id="saveCatAllEdits-catId-${i}" onclick="saveEditedCat(${i})">Save</button>
                                    <button type="button" class="btn btn-secondary btn-lg" id="cancelCatAllEdits-catId-${i}" onclick="cancelEdit(${i})">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        `
        catsEditContainer.appendChild(parentDiv);
    })
}
function editCat(catId) {
    //showing details for the cat user clicked on:
    let currentCatEditContainer = document.getElementById(`editCatId-${catId}`);
    catsEditContainer.classList.remove('hidden')
    currentCatEditContainer.classList.remove('hidden');
    //change name:
    const showEditCatNameInput = document.getElementById(`showCatNameInput-catId-${catId}`);
    showEditCatNameInput.addEventListener('click', () => {
        showEditCatNameInput.parentNode.nextElementSibling.classList.toggle('active');
    })
    //handle name save: editCatNameInput-catId-
    const saveNameBtn = document.getElementById(`saveCatName-catId-${catId}`);
    saveNameBtn.addEventListener('click', () => {
        const chosenCatName = document.getElementById(`newCatNameInput-catId-${catId}`);
        let newCatName = chosenCatName.value;
        console.log('newCatName: ', newCatName);
        let catNameInput = document.getElementById(`editCatNameInput-catId-${catId}`);
        catNameInput.value = newCatName;
        showEditCatNameInput.parentNode.nextElementSibling.classList.remove('active');
    })
    //change breed: 
    const showEditCatBreedList = document.getElementById(`showCatBreedList-catId-${catId}`);
    showEditCatBreedList.addEventListener('click', () => {
        showEditCatBreedList.parentNode.nextElementSibling.classList.toggle('active')
    })
    //handle breed save: 
    const saveBreedBtn = document.getElementById(`saveCatBreed-catId-${catId}`);
    saveBreedBtn.addEventListener('click', () => {
        const chosenCatBreed = document.getElementById(`editCatBreed-catId-${catId}`);
        let newBreed = chosenCatBreed.options[chosenCatBreed.selectedIndex].text;
        let catBreedInput = document.getElementById(`editCatBreedTextInput-catId-${catId}`);
        catBreedInput.value = newBreed;
        showEditCatBreedList.parentNode.nextElementSibling.classList.remove('active');
    })
    //Spay / nuetured status:
    const showSpayStatList = document.getElementById(`showSpayStatList-catId-${catId}`);
    showSpayStatList.addEventListener('click', () => {
        showSpayStatList.parentNode.nextElementSibling.classList.toggle('active')
    })
    // handle Spay / nuetured save: 
    const saveSpayStatusBtn = document.getElementById(`saveCatSpayStat-catId-${catId}`);
    saveSpayStatusBtn.addEventListener('click', () => {
        const chosenSpayStatus = document.getElementById(`editCatSpayedNeutered-catId-${catId}`);
        let newSpayStatus = chosenSpayStatus.options[chosenSpayStatus.selectedIndex].text;
        let spayStatusInput = document.getElementById(`editSpayStatusTextInput-catId-${catId}`);
        spayStatusInput.value = newSpayStatus;
        showSpayStatList.parentNode.nextElementSibling.classList.remove('active');
    });
    //Shots status:
    const showShotsStatList = document.getElementById(`showShotsStatList-catId-${catId}`);
    showShotsStatList.addEventListener('click', () => {
        showShotsStatList.parentNode.nextElementSibling.classList.toggle('active')
    })
    // handle Shots save:
    const saveShotsStatusBtn = document.getElementById(`saveCatShotsStat-catId-${catId}`);
    const shots_date_container = document.querySelector('.shots_dates_container');
    const allDateFields = shots_date_container.querySelectorAll('input[type="date"]');
    saveShotsStatusBtn.addEventListener('click', () => {
        const chosenShotsStatus = document.getElementById(`editCatShotStatusList-catId-${catId}`);
        if (chosenShotsStatus.value === "No" || chosenShotsStatus.value == "Unknown") {
            shots_date_container.classList.add('hidden');
            showShotsStatList.parentNode.nextElementSibling.classList.remove('active');
            let newShotsStatus = chosenShotsStatus.options[chosenShotsStatus.selectedIndex].text;
            let shotsStatusInput = document.getElementById(`editShotStatusTextInput-catId-${catId}`);
            shotsStatusInput.value = newShotsStatus;
        } else {
            shots_date_container.classList.remove('hidden');
            allDateFields.forEach((field) => {
                field.removeAttribute('disabled');
            });
            let newShotsStatus = chosenShotsStatus.options[chosenShotsStatus.selectedIndex].text;
            let shotsStatusInput = document.getElementById(`editShotStatusTextInput-catId-${catId}`);
            shotsStatusInput.value = newShotsStatus;
            showShotsStatList.parentNode.nextElementSibling.classList.remove('active');
        }

    })
    //edit Medication status:
    const showMedsStatusList = document.getElementById(`showMedsStatList-catId-${catId}`);
    showMedsStatusList.addEventListener('click', () => {
        showMedsStatusList.parentNode.nextElementSibling.classList.toggle('active');
    });
    // handle Meds status save:
    const saveMedsStatusBtn = document.getElementById(`saveCatMedsStat-catId-${catId}`);
    saveMedsStatusBtn.addEventListener('click', () => {
        const chosenMedsStatus = document.getElementById(`editCatMedicationStat-catId-${catId}`);
        let newMedsStatus = chosenMedsStatus.options[chosenMedsStatus.selectedIndex].text;
        let medStatusInput = document.getElementById(`editMedsStatTextInput-catId-${catId}`);
        medStatusInput.value = newMedsStatus;
        showMedsStatusList.parentNode.nextElementSibling.classList.remove('active');
    })
    //edit Gender:
    const showGenderListBtn = document.getElementById(`showCatGenderList-catId-${catId}`);
    showGenderListBtn.addEventListener('click', () => {
        showGenderListBtn.parentNode.nextElementSibling.classList.toggle('active')
    })
    // handle Gender save:saveCatGender-catId-1
    const saveGenderBtn = document.getElementById(`saveCatGender-catId-${catId}`);
    saveGenderBtn.addEventListener('click', () => {
        const chosenGender = document.getElementById(`editCatGenderList-catId-${catId}`);
        let newGender = chosenGender.options[chosenGender.selectedIndex].text;
        let genderInput = document.getElementById(`editGenderTextInput-catId-${catId}`);
        genderInput.value = newGender;
        showGenderListBtn.parentNode.nextElementSibling.classList.remove('active');
    });
    // global cancel for local changes (hiding the edit value form):
    const localCancelBtn = document.getElementsByClassName('cancelLocalEditBtn');
    for (let i = 0; i < localCancelBtn.length; i++) {
        localCancelBtn[i].addEventListener('click', () => {
            localCancelBtn[i].parentNode.parentElement.classList.remove('active');
        })
    }
}
function saveEditedCat(catId) {
    let catsData = JSON.parse(localStorage.getItem('cats'));
    let cat = catsData.find(cat => cat.id === catId);
    if (cat) {
        cat.name = document.getElementById(`editCatNameInput-catId-${catId}`).value;
        cat.breed = document.getElementById(`editCatBreedTextInput-catId-${catId}`).value;
        cat.spayStatus = document.getElementById(`editSpayStatusTextInput-catId-${catId}`).value;
        cat.shotStatus = document.getElementById(`editShotStatusTextInput-catId-${catId}`).value;
        cat.gender = document.getElementById(`editGenderTextInput-catId-${catId}`).value;
        cat.genericNotes = document.getElementById(`editCatNotes-catId-${catId}`).value;
        cat.medicationStat = document.getElementById(`editMedsStatTextInput-catId-${catId}`).value;
        cat.medicalnotes = document.getElementById(`editCatMedicalNotes-catId-${catId}`).value;
        console.log(cat.spayedNeutered)
        // Save the updated array back to localStorage
        localStorage.setItem('cats', JSON.stringify(catsData));
        location.reload();
    } else {
        console.log('Cat with the specified ID not found');
    }
}

function cancelEdit(catId) {
    console.log(catId)
    let thisParent = document.getElementById(`editCatId-${catId}`);
    thisParent.classList.remove('active');
    thisParent.classList.add('hidden');
    console.log('test cancel click')
    document.getElementById('editCatsWrapper').classList.add('hidden');
}
// handling healthTracker:
function idRowCounter() {
    for (let i = 0; i < catsData.length; i++) {
        console.log('i: ', i)
    }
}
const healthTrackerPageEl = document.getElementById('healthTracker');
healthTrackerPageEl.innerHTML = '';
if (!catsData) {
    console.log('no cats found in localStorage');
} else {
    catsData.forEach((cat, i) => {
        let weightTracker = cat.weightTracker;
        const createWeightRecordRow = (record, recordIndex) => `
            <tr>
                <td><strong>${recordIndex}</strong></td>
                <td>${record.takenOn}</td>
                <td class="recordedWeight-${i}">${record.weight}</td>
                <td class="weightChangeCell-${i}"></td>
            </tr>
        `;
        //generate all the rows!!!
        let rowsHTML = '';
        Object.keys(weightTracker).forEach((recordKey, Index) => {
            rowsHTML += createWeightRecordRow(weightTracker[recordKey], Index);
        });
        let keys = Object.keys(weightTracker);
        let lastKey = keys[keys.length - 1];
        let latestWeight = weightTracker[lastKey].weight;
        let parentDiv = document.createElement('div');

        parentDiv.classList.add(`healthTrackerForCatId-${i}`, 'hidden');
        parentDiv.setAttribute('id', 'healthTrackerForCatId-' + i);
        parentDiv.innerHTML = `
            <div class="row">
                <div class="col position-relative ">
                     <p>Weight Tracking for <strong>${cat.name} </strong><button class="float-end btn btn-sm btn-primary" id="addWeightRecordBtn-${i}">Add Weight</button></p>
                     <hr />
                     <table class="table healthTrackerWeightRecTable" id="weightRecordsTable-catId-${i}">
                        <thead>
                            <th>#</th>
                            <th>Date</th>
                            <th>Weight</th>
                            <th>Change</th>
                        </thead>
                        <tbody id="weightRecordsTableBody-catId-${i}">
                            ${rowsHTML}
                        </tbody>
                     </table>
                     <!-- <button class="btn btn-primary" id="addWeightRecordBtn-${i}">Add Weight</button> -->
                     <div class="addWeightRecord" id="addWeightRecord-catId-${i}">
                        <form action="#" method="POST" name="addWeightRecordForm">
                            <div class="row">
                                <div class="col">
                                    <div class="input-group mb-3">
                                        <span class="input-group-text ">Weight</span>
                                        <input type="number" class="form-control" id="addWeightRecord-weight-catId-${i}" name="addWeightRecord-weight-catId-${i}">
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text ">Date</span>
                                        <input type="date" class="form-control" id="addWeightRecord-date-catId-${i}" name="addWeightRecord-weight-catId-${i}">
                                    </div>
                                    <div class="text-center btn-group w-100 mt-2 p-3" role="group">
                                        <button type="button" class="btn btn-primary btn-lg" id="saveWeightRecord-catId-${i}" >Save</button>
                                        <button type="button" class="btn btn-secondary btn-lg cancelHealthTrackerRec cancelWeightRecord-${i}">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                     </div>
                </div>
                <div class="col position-relative ">
                    <p>Meds Tracking for <strong>${cat.name} </strong> <button class="float-end btn btn-sm btn-primary" id="addMedicationBtn-${i}">Add Medication</button></p>
                    <hr />
                    <div class="medRecordEntries">
                        <div class="row">
                            <div class="col">
                                <table class="table healthTrackerMedRecTable" id="medicationRecordsTable-catId-${i}">
                                    <thead>
                                        <th>#</th>
                                        <th>Medication</th>
                                        <th>Dosage</th>
                                        <th>Date</th>
                                    </thead>
                                    <tbody id="medicationRecordsTableBody-catId-${i}">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="addMedication" id="addMedication-catId-${i}">
                        <form action="#"1 method="POST" name="addMedicationForm">
                            <div class="row">
                                <div class="col">
                                    <div class="input-group mb-3">
                                        <span class="input-group-text ">Medication</span>
                                        <input type="text" class="form-control" id="addMedication-medication-catId-${i}" name="addMedication-medication-catId-${i}">
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text ">Current Weight:</span>
                                        <input type="text" class="form-control " name="currentWeight-catId-${i}" id="currentWeight-catId-${i}" value="${latestWeight}" disabled/>
                                        <span class="input-group-text ">lbs</span>
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text ">Ratio</span>
                                        <input type="text" class="form-control" id="addMedication-ratio-catId-${i}" name="addMedication-ratio-catId-${i}">
                                        <span class="input-group-text ">Give:</span>
                                        <input type="text" class="form-control" disabled id="addMedication-giveCat-catId-${i}" name="addMedication-giveCat-catId-${i}" value="">
                                        <span class="input-group-text ">ml</span>
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text ">Date</span>
                                        <input type="date" class="form-control" id="addMedication-date-catId-${i}" name="addMedication-date-catId-${i}">
                                    </div>
                                    <div class="text-center btn-group w-100 mt-2 p-3" role="group">
                                        <button type="button" class="btn btn-primary btn-lg" id="saveMedication-catId-${i}" >Save</button>
                                        <button type="button" class="btn btn-secondary btn-lg cancelMedication-${i}">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
            <div class="row">
                <div class="col text-center position-absolute bottom-0">
                    <button class="btn btn-secondary" id="closeHealthTracker-${i}" onclick="closeHealthTracker(${i})">Close Health Tracker</button>
                </div>
            </div>
        `;

        healthTrackerPageEl.appendChild(parentDiv);
        //adding medication:
        const showMedicationBtn = document.getElementById(`addMedicationBtn-${i}`);
        showMedicationBtn.addEventListener('click', () => {
            let sibling = showMedicationBtn.parentElement.nextElementSibling.nextElementSibling.nextElementSibling;
            sibling.classList.toggle('active');
        })
        //calculating dosage by latest weight record:
        let ratioValueEl = document.getElementById(`addMedication-ratio-catId-${i}`);
        let ratioValue = ratioValueEl.value;
        ratioValueEl.addEventListener('change', () => {
            ratioValue = ratioValueEl.value;
            let giveValueEl = document.getElementById(`addMedication-giveCat-catId-${i}`);
            let giveDosage = ratioValue * latestWeight;
            giveDosage = giveDosage.toFixed(1);
            giveValueEl.value = giveDosage;
        })
        //adding weight record:
        const showWeightTrackerBtn = document.getElementById(`addWeightRecordBtn-${i}`);
        showWeightTrackerBtn.addEventListener('click', () => {
            let sibling = showWeightTrackerBtn.parentElement.nextElementSibling.nextElementSibling.nextElementSibling;
            sibling.classList.toggle('active');
        });
        let weightValues = document.getElementsByClassName(`recordedWeight-${i}`);

        let initWeight = weightTracker[Object.keys(weightTracker)[0]].weight;
        let changeTableCell = document.getElementsByClassName(`weightChangeCell-${i}`);
        for (let i = 0; i < changeTableCell.length; i++) {
            let weightDifference = weightValues[i].textContent - initWeight;
            weightDifference = weightDifference.toFixed(2);
            if (weightDifference <= 0) weightDifference = '--'
            changeTableCell[i].textContent = weightDifference;
        }
        function closeAddWeightRecordPopup(i) {
            let sibling = showWeightTrackerBtn.parentElement.nextElementSibling.nextElementSibling.nextElementSibling;
            sibling.classList.remove('active');
        }
        //taking weight and date:
        function addWeightRecordToTable(catId, weightRecord) {
            let table = document.getElementById(`weightRecordsTable-catId-${catId}`);
            let row = table.insertRow();
            let idCell = row.insertCell();
            let dateCell = row.insertCell();
            let weightCell = row.insertCell();
            let changeCell = row.insertCell();

            idCell.textContent = weightRecord.id;
            dateCell.textContent = weightRecord.takenOn;
            weightCell.textContent = weightRecord.weight;
            //changeCell.innerHTML = ` -- `;
        }
        //save weight record:
        const saveWeightRecordBtn = document.getElementById(`saveWeightRecord-catId-${i}`);
        saveWeightRecordBtn.addEventListener('click', () => {
            let newWeightRecord = document.getElementById(`addWeightRecord-weight-catId-${i}`).value;
            let newWeightRecordDate = document.getElementById(`addWeightRecord-date-catId-${i}`).value;
            let catsData = JSON.parse(localStorage.getItem('cats'));
            let cat = catsData.find(cat => cat.id === i);
            if (!newWeightRecord) {
                alert('Please enter a weight');
            } else if (cat) {
                // create new record id
                const newRecordId = `record${Object.keys(cat.weightTracker).length}`;
                // Add new record to cat's weightTracker
                cat.weightTracker[newRecordId] = {
                    id: Object.keys(cat.weightTracker).length,
                    weight: newWeightRecord,
                    takenOn: newWeightRecordDate
                };
                // Update cats data in localStorage
                localStorage.setItem('cats', JSON.stringify(catsData));
                if (cat && cat.weightTracker) {
                    // Assuming the latest record is the last one added
                    let latestRecordKey = Object.keys(cat.weightTracker).pop();
                    let latestRecord = cat.weightTracker[latestRecordKey];
                    // Add this record to the table
                    addWeightRecordToTable(i, latestRecord);
                }
                closeAddWeightRecordPopup(i);
            }
        });
        //cancel:
        const cancelMedRecordBtn = document.querySelector(`.cancelMedication-${i}`);
        cancelMedRecordBtn.addEventListener('click', () => {
            let sibling = cancelMedRecordBtn.parentElement.parentElement.parentElement.parentElement.parentElement;
            sibling.classList.remove('active');
        })
        const cancelWeightRecordBtn = document.querySelector(`.cancelWeightRecord-${i}`);
        cancelWeightRecordBtn.addEventListener('click', () => {
            let sibling = cancelWeightRecordBtn.parentElement.parentElement.parentElement.parentElement.parentElement;
            sibling.classList.remove('active');
        });
    })
}
//showing healthTracker:
function showHealthTracker(catId) {
    let currentCatHealthTrackerContainer = document.getElementById(`healthTrackerForCatId-${catId}`);
    healthTrackerPageEl.classList.remove('hidden');
    currentCatHealthTrackerContainer.classList.remove('hidden');
}
//close health tracker:
function closeHealthTracker(catId) {
    let currentCatHealthTrackerContainer = document.getElementById(`healthTrackerForCatId-${catId}`);
    healthTrackerPageEl.classList.add('hidden');
    currentCatHealthTrackerContainer.classList.add('hidden');
}