//let catData = JSON.parse(localStorage.getItem('cats'));
const editCatTriggerEl = document.querySelectorAll("[id^='editCatId-']");

editCatTriggerEl.forEach((cat, index) => {
    this.addEventListener('click', () => {
        setTimeout(() => {
            document.getElementById('editCatsWrapper').classList.add('hidden')
        }, 2500)
        setTimeout(() => {
            console.log('Hello, world!');
        }, 3000);
        // console.log('catId: ', index);
        // return false;
    })

});
let editCatWrapperEl = document.querySelector('#editCatsWrapper');
catsData.forEach((cat, index) => {
    const catId = index;
    const catName = cat.name;
    const catBreed = cat.breed;
    const catDOB = cat.dob;
    const catWeight = cat.weight;
    const catWeightTakenOn = cat.addNewCatWeightTakenOn;
    const catGender = cat.gender;
    const catGenNotes = cat.genericNotes;
    const catMedNotes = cat.medicalnotes;
    const catMedStatus = cat.medicationStat;
    const shotStatus = cat.shotStatus;
    const spayStatus = cat.spayStatus;

    //build form with cat details: 
    editCatWrapperEl.innerHTML = `
        <div class="editCatid-${catId}">
            <div class="container">
                <h3>Editing - ${catName}</h3>
                <div class="row">
                    <div class="col">
                        <strong>Generic Details:</strong>
                        <hr />
                        <div class="form-group">
                            <div class="input-group mb-4">
                                <span class="input-group-text">Name</span>
                                <input type="text" name="editCatName" id="editCatName" class="form-control" value="${catName}">
                            </div>
                        </div>
                        <div class="form-group mb-4">
                            <div class="input-group">
                                <span class="input-group-text">Breed</span>
                                <input type="text" disabled class="form-control" value="${catBreed}" />
                                <button type="button" class="btn btn-primary" id="showCatBreedList" onclick="">Change</button>
                            </div>
                            <div class="edit-catBreed-list" id="editCatBreed-catId-${index}">
                                <select name="editCatBreed" id="editCatBreed" class="form-select">
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
                                    <button type="button" class="btn btn-primary btn-lg" id="saveCatBreed-catId-${index}">Save</button>
                                    <button type="button" class="btn btn-secondary btn-lg" id="btnCancelLocalEdit-catIt-${index}">Cancel</button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `




    //debug:
    // console.log(
    //     'cat id: ', catId + "\n",
    //     'cat name: ', catName + "\n",
    //     'cat breed: ', catBreed + "\n",
    //     'dob: ', catDOB + "\n",
    //     'weight: ', catWeight + "\n",
    //     'weight taken on: ', catWeightTakenOn + "\n",
    //     'sex: ', catGender + "\n",
    //     'notes: ', catGenNotes + "\n",
    //     'med notes: ', catMedNotes + "\n",
    //     'on meds? ', catMedStatus + "\n",
    //     'shots? ', shotStatus + "\n",
    //     'spayed? ', spayStatus

    // )
});

//console.log('catData ', catsData)
// for (let i = 0; i < catsData.length; i++) {
//     let editCatName = catData.catName;
//     //creating element with cat details: 
//     let editCatInnerWrapper = document.createElement('div');
//     editCatInnerWrapper.classList.add(`edit-cat`);
//     editCatInnerWrapper.classList.add(editCatName);
//     editCatInnerWrapper.classList.add(`editCatId-${i}`);
//     editCatWrapperEl.appendChild(editCatInnerWrapper);
//     console.log("i: ", i)
// }


function editCat(catId) {
    //console.log('catid: ', catId);
    const editBtn = document.getElementById(`editCatId-${catId}`);
    console.log('editBtn ', editBtn.id);
    editCatWrapperEl.classList.remove('hidden');
    // catsData.forEach((cat, index) => {
    //     console.log(cat, index);
    // });
}