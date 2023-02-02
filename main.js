window.addEventListener('load', (event) => {

    let containerCards = document.querySelector('.container-cards');

    let btnShowContacts = document.querySelector('#showContactsBtn');

    let btnAddContact = document.querySelector('#addContactBtn');

    let btnRemoveContact = document.querySelector('#removeContactBtn');

    let btnSearchContact = document.querySelector('#searchContactBtn');

    let nameInput = document.querySelector('#nameInput');

    let numberInput = document.querySelector('#numberInput');

    // Variabile d'appoggio
    let confirm = false;



    // FETCH 
    fetch('./friends.json').then((response) => response.json()).then((contacts) => {

        // FUNCTION SHOW
        function showContacts(array) {

            containerCards.innerHTML = ``;

            containerCards.classList.add('bg-container-cards');

            array.forEach((contact) => {

                let card = document.createElement('div');

                card.classList.add('col-12', 'col-md-6', 'col-lg-3', 'my-3');

                card.innerHTML = `
                                        <div class="card">

                                            <div class="card-body text-start d-flex flex-column justify-content-between">
                                                <h5 class="card-title">${contact.name}</h5>

                                                <div class="card-footer-custom d-flex justify-content-between align-items-center">
                                                    <a href="tel:+39${contact.phone}" title="Call ${contact.name}"><h6 class="card-text fw-bolder">+39 ${contact.phone}</h6></a>
                                                    <span>
                                                    <i class="fa-solid fa-ban" title="Delete Contact"></i>
                                                    </span>
                                                </div>
                                            </div>

                                        </div>

                                    `;

                containerCards.appendChild(card);

            });

            let icons = document.querySelectorAll('.fa-ban');

            icons.forEach((icon, index) => {

                icon.addEventListener('click', () => {



                    let name = array[index].name;

                    removeContact(name);

                    if (contacts.length == 0) {

                        btnShowContacts.innerHTML = `Address Book Empty 📵`;

                    }

                });

            });

        };

        // FUNCTION ADD
        function addContact(newName, newNumber) {

            if (newNumber.length == 10) {

                newNumber = Number(newNumber);

                contacts.push({ name: newName, phone: newNumber });

                showContacts(contacts);

                nameInput.value = ``;

                numberInput.value = ``;

                btnShowContacts.innerHTML = `Hide Contacts 🙈`;

            } else {

                alert('Please enter a VALID number');

            }

        };

        // FUNCTION REMOVE
        function removeContact(removedName) {

            let names = contacts.map((contact) => contact.name.toLowerCase());

            let index = names.indexOf(removedName.toLowerCase());

            if (index > -1) {

                contacts.splice(index, 1);

                showContacts(contacts);

                btnShowContacts.innerHTML = `Hide Contacts 🙈`;

            } else {

                alert('Contact not present in the address book! 🤪');

                btnShowContacts.innerHTML = `View Contacts 👀`;

            }

        }

        // FUNCTION SEARCH CONTACT

        function searchContact(searchedName) {


            let filtered = contacts.filter((contact) => searchedName.toLowerCase() == contact.name.toLowerCase());

            if (filtered.length > 0) {

                showContacts(filtered);

            } else {

                alert('Contact not present in the address book! 🤪');

            }

        };





        // Btn SHOW CARS
        btnShowContacts.addEventListener('click', () => {

            if (confirm == false) {

                confirm = true;

                showContacts(contacts);

                btnShowContacts.innerHTML = `Hide Contacts 🙈`;

            } else {

                confirm = false;

                containerCards.innerHTML = ``;

                btnShowContacts.innerHTML = `View Contacts 👀`;

                containerCards.classList.remove('bg-container-cards');

            }

        });

        // Btn ADD CONTACT
        btnAddContact.addEventListener('click', () => {

            if (nameInput.value != '' && numberInput.value != '') {

                confirm = true;

                addContact(nameInput.value, numberInput.value);

            } else {

                alert('Y must enter name and number!');

            }

        });

        // Btn REMOVE CONTACT
        btnRemoveContact.addEventListener('click', () => {

            confirm = true;

            removeContact(nameInput.value);

            nameInput.value = '';

        });

        // Btn SEARCH CONTACT

        btnSearchContact.addEventListener('click', () => {

            confirm = true;

            searchContact(nameInput.value);

            nameInput.value = '';

        })

    });


    // BACKGROUND PARTICLES EFFECT
    Particles.init({
        selector: '.background',
        maxParticles: 25,
        sizeVariations: 20,
        speed: 1.8,
        color: '#ffee00',
        minDistance: 350,
        connectParticles: true
    });

    // const addressBook = {

    //     contacts: [

    //         { name: 'Frenk Garrone', number: 3445248725 },
    //         { name: 'Luca Tagliabue', number: 3318882777 },
    //         { name: 'Andrea Barontini', number: 3988547152 },
    //         { name: 'Andrea Carraro', number: 3289825147 },
    //         { name: 'Alice De Luca', number: 3479647531 },
    //         { name: 'Bruno Ravera', number: 3255574339 }

    //     ],

    //     showContacts: function (array) {

    //         containerCards.innerHTML = ``;

    //         array.forEach((contact) => {

    //             let card = document.createElement('div');

    //             card.classList.add('col-12', 'col-md-6', 'col-lg-3', 'my-3');

    //             card.innerHTML = `

    //                                     <div class="card">

    //                                         <div class="card-body text-start d-flex flex-column justify-content-between">
    //                                             <h5 class="card-title">${contact.name}</h5>

    //                                             <div class="card-footer-custom d-flex justify-content-between align-items-center">
    //                                                 <a href="tel:+39${contact.number}" title="Call ${contact.name}"><h6 class="card-text fw-bolder">+39 ${contact.number}</h6></a>
    //                                                 <span>
    //                                                 <i class="fa-solid fa-ban" title="Delete Contact"></i>
    //                                                 </span>
    //                                             </div>
    //                                         </div>

    //                                     </div>

    //                                 `;

    //             containerCards.appendChild(card);

    //         });


    //         let icons = document.querySelectorAll('.fa-ban');

    //         icons.forEach((icon, index) => {

    //             icon.addEventListener('click', () => {

    //                 let name = array[index].name;

    //                 this.removeContact(name);

    //                 if (addressBook.contacts.length == 0) {

    //                     btnShowContacts.innerHTML = `NO Contacts 📵`;

    //                 }

    //             });

    //         });

    //     },

    //     addContact: function (newName, newNumber) {

    //         if (newNumber.length == 10) {

    //             newNumber = Number(newNumber);

    //             this.contacts.push({ name: newName, number: newNumber });

    //             this.showContacts(this.contacts);

    //             nameInput.value = ``;

    //             numberInput.value = ``;

    //             btnShowContacts.innerHTML = `Hide Contacts 🙈`;

    //         } else {

    //             alert('Please enter a VALID number! 🤨');


    //         }

    //     },

    //     removeContact: function (removedName) {

    //         let names = this.contacts.map((contact) => contact.name.toLowerCase());

    //         let index = names.indexOf(removedName.toLowerCase());

    //         if (index > -1) {

    //             this.contacts.splice(index, 1);

    //             this.showContacts(this.contacts);

    //         } else {

    //             alert('Contact not present! 🤪');

    //         }

    //     },

    //     searchContact: function (searchedName) {



    //         let filtered = this.contacts.filter((contact) => searchedName.toLowerCase() == contact.name.toLowerCase());

    //         if (filtered.length > 0) {

    //             this.showContacts(filtered);

    //             btnShowContacts.innerHTML = `Hide Contacts 🙈`;

    //         } else {

    //             btnShowContacts.innerHTML = `View Contacts 👀`;

    //             alert('Contact not present in the address book! 🤪');

    //         }

    //     }

    // }

    // // Btn SHOW CARS
    // btnShowContacts.addEventListener('click', () => {

    //     if (confirm == false) {

    //         confirm = true;

    //         addressBook.showContacts(addressBook.contacts);

    //         btnShowContacts.innerHTML = `Hide Contacts 🙈`;

    //     } else {

    //         confirm = false;

    //         containerCards.innerHTML = ``;

    //         btnShowContacts.innerHTML = `View Contacts 👀`;

    //     }

    // });

    // // Btn ADD CONTACT
    // btnAddContact.addEventListener('click', () => {

    //     if (nameInput.value != '' && numberInput.value != '') {

    //         confirm = true;

    //         addressBook.addContact(nameInput.value, numberInput.value);

    //     } else {

    //         alert('Y must enter name and number! 😬');

    //     }



    // });

    // // Btn REMOVE CONTACT
    // btnRemoveContact.addEventListener('click', () => {

    //     confirm = true;

    //     addressBook.removeContact(nameInput.value);

    //     btnShowContacts.innerHTML = `Hide Contacts 🙈`;

    //     nameInput.value = '';

    //     btnShowContacts.innerHTML = `View Contacts 👀`;

    // });

    // // Btn SEARCH CONTACT
    // btnSearchContact.addEventListener('click', () => {

    //         confirm = true;

    //         addressBook.searchContact(nameInput.value);

    //         nameInput.value = '';

    // });

});