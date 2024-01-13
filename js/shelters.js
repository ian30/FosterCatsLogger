//if no shelters in localstorage, add demo ones:
document.addEventListener('DOMContentLoaded', () => {
    const demoShelters = [
        {
            "id": 0,
            "name": "Save The Cats AZ",
            "contact": "Barbara",
            "address": "123 Main Street",
            "city": "Phoenix",
            "state": "AZ",
            "zip": "85001",
            "phone": "(602) 555-5555",
        },
        {
            "id": 1,
            "name": "Gratful Hearts",
            "contact": "Amy",
            "address": "123 Main Street",
            "city": "Phoenix",
            "state": "AZ",
            "zip": "85001",
            "phone": "(602) 555-5555",
        }

    ]

    function getDemoDataIfNoShelters() {
        if (!localStorage.getItem('shelters')) {
            localStorage.setItem('shelters', JSON.stringify(demoShelters));
        } else {
            sheltersData = JSON.parse(localStorage.getItem('shelters'));
            return;
        }
    }
    getDemoDataIfNoShelters();
})
// add new shelter clicked:
const addNewShelterBtn = document.getElementById('addNewShelterBtn');
addNewShelterBtn.addEventListener('click', () => {
    document.getElementById('addNewShelterForm').classList.toggle('hidden');
    document.getElementById('addNewShelterForm').classList.toggle('active');
    //cancel add shelter:
    const cancelAddNewShelter = document.getElementById('cancelNewShelterBtn');
    cancelAddNewShelter.addEventListener('click', () => {
        closeActivePage();
        firstPage.classList.toggle('blur-background');
    })
    //save new shelter
    const saveNewShelterBtn = document.getElementById('saveNewShelterBtn');
    saveNewShelterBtn.addEventListener('click', () => {
        let shelterName = document.getElementById('addNewShelterName').value;
        let shelterCity = document.getElementById('addNewShelterCity').value;
        let shelterContact = document.getElementById('addNewShelterContact').value;
        let shelterPhone = document.getElementById('addNewShelterPhone').value;
        if (!shelterName || !shelterCity || !shelterContact || !shelterPhone) {
            alert_alt('All fields are required');
            return;
        }
        let newShelter = {
            id: Date.now(),
            name: shelterName,
            contact: shelterContact,
            city: shelterCity,
            phone: shelterPhone
        }
        sheltersData.push(newShelter);
        localStorage.setItem('shelters', JSON.stringify(sheltersData));
        //clean form inputs:
        document.getElementById('addNewShelterName').value = '';
        document.getElementById('addNewShelterAddress1').value = '';
        document.getElementById('addNewShelterAddress2').value = '';
        document.getElementById('addNewShelterCity').value = '';
        document.getElementById('addNewShelterState').value = '';
        document.getElementById('addNewShelterZip').value = '';
        document.getElementById('addNewShelterContact').value = '';
        document.getElementById('addNewShelterPhone').value = '';
        location.reload();
    })
})
//shelters nav button clicked
const openShelters = document.getElementById('sheltersBtn');
let sheltersData = JSON.parse(localStorage.getItem('shelters'));
let shelterTableBody = document.querySelector('#sheltersTable tbody');
shelterTableBody.innerHTML = '';
openShelters.addEventListener('click', () => {
    firstPage.classList.toggle('blur-background');
    document.getElementById('sheltersWrapper').classList.toggle('hidden');
    document.getElementById('sheltersWrapper').classList.toggle('active');
    if (!sheltersData) {
        alert_alt(`No shelters found, a new local shelter database will be created on this device. Click anywhere to dismiss this message.`, 'No Shelters', 'success');
        //sheltersData = [];
        let blinking = false;
        let blinkClass1 = 'btn-primary';
        let blinkClass2 = 'btn-danger';
        const blinkInterval = setInterval(() => {
            if (blinking) {
                addNewShelterBtn.classList.add(blinkClass1)
                addNewShelterBtn.classList.remove(blinkClass2)
            } else {
                addNewShelterBtn.classList.add(blinkClass2)
                addNewShelterBtn.classList.remove(blinkClass1)
            }
            blinking = !blinking;
        }, 1000);
        setTimeout(() => {
            clearInterval(blinkInterval);
        }, 6000);
    } else {
        //display table
        sheltersData.forEach((shelter, i) => {
            let row = document.createElement('tr');
            let id = document.createElement('td');
            let name = document.createElement('td');
            let contact = document.createElement('td');
            let address = document.createElement('td');
            let city = document.createElement('td');
            let state = document.createElement('td');
            let zip = document.createElement('td');
            let phone = document.createElement('td');
            let more = document.createElement('td');
            id.innerHTML = i + 1;
            name.innerHTML = shelter.name;
            contact.innerHTML = shelter.contact;
            address.innerHTML = shelter.address;
            city.innerHTML = shelter.city;
            state.innerHTML = shelter.state;
            zip.innerHTML = shelter.zip;
            phone.innerHTML = shelter.phone;
            more.innerHTML = `<button class="btn btn-primary disabled btn-sm w-100" id="moreBtnShelterId-${i}">More</button>`;
            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(city);
            row.appendChild(contact);
            row.appendChild(phone);
            row.appendChild(more);
            shelterTableBody.appendChild(row);
        })
    }
})
