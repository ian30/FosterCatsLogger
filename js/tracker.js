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
                        <tbody>
                            <tr>
                                <td>${i}</td>
                                <td>${cat.weightTakenOn}</td>
                                <td>${cat.weight}</td>
                                <td>--</td>
                            </tr>
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
                                        <button type="button" class="btn btn-primary btn-lg" id="saveWeightRecord-catId-${i}">Save</button>
                                        <button type="button" class="btn btn-secondary btn-lg cancelWeightRecord-${i}">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                     </div>
                </div>
                <div class="col">
                    <p>Medication Tracking for <strong>${cat.name} </strong> <button class="float-end btn btn-sm btn-primary" id="addMedicationBtn-${i}">Add New Medication</button></p>
                    <hr />
                   
                </div>
            </div>
            <div class="row">
                <div class="col text-center position-absolute bottom-0">
                    <button class="btn btn-secondary" id="closeHealthTracker-${i}" onclick="closeHealthTracker(${i})">Close Health Tracker</button>
                </div>
            </div>
        `
        healthTrackerPageEl.appendChild(parentDiv);
        //adding weight record:
        const showWeightTrackerBtn = document.getElementById(`addWeightRecordBtn-${i}`);
        showWeightTrackerBtn.addEventListener('click', () => {
            let sibling = showWeightTrackerBtn.parentElement.nextElementSibling.nextElementSibling.nextElementSibling;
            sibling.classList.toggle('active');
        });
        //taking weight and date:

        //save weight record:
        const saveWeightRecordBtn = document.getElementById(`saveWeightRecord-catId-${i}`);
        saveWeightRecordBtn.addEventListener('click', () => {
            let newWeightRecord = document.getElementById(`addWeightRecord-weight-catId-${i}`).value;
            let newWeightRecordDate = document.getElementById(`addWeightRecord-date-catId-${i}`).value;
            console.log('newWeightRecord: ', newWeightRecord);
            console.log('newWeightRecordDate: ', newWeightRecordDate);
            let catsData = JSON.parse(localStorage.getItem('cats'));
            let cat = catsData.find(cat => cat.id === catId);
            if (cat) {

            }
        })
        //cancel:
        const cancelWeightRecordBtn = document.querySelector(`.cancelWeightRecord-${i}`);
        cancelWeightRecordBtn.addEventListener('click', () => {
            let sibling = cancelWeightRecordBtn.parentElement.parentElement.parentElement.parentElement.parentElement;
            sibling.classList.remove('active');
        });
    })
}


function showHealthTracker(catId) {
    let currentCatHealthTrackerContainer = document.getElementById(`healthTrackerForCatId-${catId}`);
    healthTrackerPageEl.classList.remove('hidden');
    //console.log('current ', currentCatHealthTrackerContainer)
    currentCatHealthTrackerContainer.classList.remove('hidden');
}
//close health tracker:
function closeHealthTracker(catId) {
    let currentCatHealthTrackerContainer = document.getElementById(`healthTrackerForCatId-${catId}`);
    healthTrackerPageEl.classList.add('hidden');
    currentCatHealthTrackerContainer.classList.add('hidden');
}