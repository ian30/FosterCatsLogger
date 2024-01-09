//if no shelter in localstorage, add demo ones:
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
        }
    }
    getDemoDataIfNoShelters();
})
const openShelters = document.getElementById('sheltersBtn');
let sheltersData = JSON.parse(localStorage.getItem('shelters'));
let shelterTableBody = document.querySelector('#sheltersTable tbody');
shelterTableBody.innerHTML = '';
//open shelters page
openShelters.addEventListener('click', () => {
    closeActivePage();
    firstPage.classList.toggle('blur-background');
    document.getElementById('sheltersWrapper').classList.toggle('hidden');
    document.getElementById('sheltersWrapper').classList.toggle('active');
    if (!sheltersData) {
        alert_alt(`No shelters found, a new local shelter database will be created on this device. Click anywhere to dismiss this message.`, 'No Shelters', 'success');
        //sheltersData = [];
        getDemoDataIfNoShelters();
        localStorage.setItem('shelters', JSON.stringify(sheltersData));
        const addNewShelterBtn = document.getElementById('addNewShelterBtn');
        console.log('no shelters in localStorage');
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
            id.innerHTML = i + 1;
            name.innerHTML = shelter.name;
            contact.innerHTML = shelter.contact;
            address.innerHTML = shelter.address;
            city.innerHTML = shelter.city;
            state.innerHTML = shelter.state;
            zip.innerHTML = shelter.zip;
            phone.innerHTML = shelter.phone;
            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(contact);
            console.log('shelter: ', shelter);
        })
        console.log('shelters found in localStorage');
    }
})
