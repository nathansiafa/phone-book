import {domElements} from './base';

export const getInput = () => domElements.contactInput.value;

export const clearInput = () => domElements.contactInput.value = '';

export const renderContact = contact =>  {

    let numbersString = '';

    contact.numbers.forEach((number, index) => {
        index + 1 < contact.numbers.length ? numbersString += number + ', ' : numbersString += number;
    });

    const markup = `
        <li class="list-contact" data-contactId="${contact.id}">
            <div class="contact-div">                         
                <p class="name">${contact.name}</p>
                <span class="contact">${numbersString}</span>
            </div>
            <a class="delete-btn"><i class="fas fa-trash"></i></a>
        </li>
    `;

    domElements.contactList.insertAdjacentHTML('beforeend', markup);
    
};

export const removeContact = id => {

    const contact = document.querySelector(`[data-contactid=${id}]`);
    
    contact.parentElement.removeChild(contact);

};

const createPaginationButton = (page, type) => `
    <button class="btn btn-${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
        <i class="fas fa-hand-point-${type === 'prev' ? 'left': 'right'}"></i>
        <span class="page">Page ${type === 'prev' ? page - 1 : page + 1}</span>
    </button>
`;

const renderPaginationButtons = (page, numberOfContacts, contactsPerPage) => {

    // Round pages
    let pages = Math.ceil(numberOfContacts / contactsPerPage);

    let button = '';
    
    // if we are on the first page
    if(page === 1 && pages > 1){
        //Only button to go to next page
        button = createPaginationButton(page, 'next');
    } 
    // somewhere in the middle
    else if(page < pages){

        //Both buttons
        button = `
            ${createPaginationButton(page, 'prev')}
            ${createPaginationButton(page, 'next')}
        `;
    } 
    // if we are on the last page
    else if(page === pages && pages > 1){
        //Only button to go to previous page
        button = createPaginationButton(page, 'prev');
    }

    domElements.paginationButtons.insertAdjacentHTML('afterbegin', button);

};

export const renderResult = (contacts, page = 1, contactsPerPage = 4) => {

    const start = (page - 1) * contactsPerPage;
    const end = page * contactsPerPage;

    //Sort contacts by last created
    let sortedContacts = contacts.slice().reverse();

    // Display contacts to page (4 each)
    sortedContacts.slice(start, end).forEach(renderContact); 

    // Display pagination buttons
    renderPaginationButtons(page, sortedContacts.length, contactsPerPage);

}; 

export const clearResults = () => {
    domElements.contactList.innerHTML = '';
    domElements.paginationButtons.innerHTML = '';
};