import uniqid from 'uniqid';

export default class Contact {

    constructor () {
        
        this.contacts = [];
    }

    addContact (contact) {

        this.contacts.push(contact);

        // Persists contacts to local storage
        this.storeData();

        return contact;
    }

    deleteContact (id) {

        // Find contact 
        const contact = this.contacts.findIndex(contact => contact.id === id);

        // Delete contact
        this.contacts.splice(contact, 1);
    }

    prepareContact (contact)
    {
        // Seperate name from contacts
        let splitContact = contact.split(',');

        // Get name from splitContact
        let name = splitContact[0];

        // Remove possible spaces and seperate contact numbers
        let contacts = splitContact[1].trim().split('/');

        // Create new contact object
        let newContact = {name: name, numbers: [...contacts], id: uniqid()};
        
        // Return new contact object
        return newContact;
    }

    storeData () {

        localStorage.setItem('contacts', JSON.stringify(this.contacts));

    }

    readStorage () {

        const storage = JSON.parse(localStorage.getItem('contacts'));
    
        if (storage) this.contacts = storage;

    }
}