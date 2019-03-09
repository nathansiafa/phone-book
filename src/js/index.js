import Contact from './models/Contact';
import {domElements, domElementsStrings} from './views/base';
import * as contactView from './views/contactView';

const state = {};

const contactController = () => 
{

    if(!state.contacts) state.contacts = new Contact();

    // Get contact input
    let contactInput = contactView.getInput();

    //
    let preparedContact = state.contacts.prepareContact(contactInput);

    // Save contact
    state.contacts.addContact(preparedContact);

    contactView.clearResults();

    // Display add contact to the dom
    contactView.renderResult(state.contacts.contacts);

    // Clear contact input
    contactView.clearInput();

};

domElements.contactForm.addEventListener('submit', event => {
    event.preventDefault();

    contactController();
});

window.addEventListener('load', () => {

    // Add focus on contactInput
    domElements.contactInput.focus();

    state.contacts = new Contact();

    // Read contacts from storage if any
    state.contacts.readStorage();

    // Display contacts on page
    contactView.renderResult(state.contacts.contacts);
});

domElements.paginationButtons.addEventListener('click', event => {

    event.preventDefault();
    
    const btn = event.target.closest('.btn');

    if (btn) {

        const goToPage = parseInt(btn.dataset.goto, 10);

        contactView.clearResults();
        contactView.renderResult(state.contacts.contacts, goToPage);
    }
});

domElements.contactList.addEventListener('click', event => {

    const id = event.target.closest(domElementsStrings.listContactString).dataset.contactid;

    //Delete contact
    state.contacts.deleteContact(id);

    // Remove contact from ui
    contactView.removeContact(id);
});