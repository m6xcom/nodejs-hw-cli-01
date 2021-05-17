import fs from "fs/promises";
import path from "path";

const argv = process.argv;
const contactsPath = path.join("db/contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    console.table(parsedContacts);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);

    console.log(
      parsedContacts.filter(
        (contact) => JSON.stringify(contact.id) === contactId
      )
    );
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(
        parsedContacts.filter(
          (contact) => JSON.stringify(contact.id) !== contactId
        ),
        null,
        2
      )
    );
  } catch (error) {
    console.log(error);
  }
}

async function addContact(id, name, email, phone) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    const newContact = { id, name, email, phone };
    parsedContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(parsedContacts, null, 2));
  } catch (error) {
    console.log(error);
  }
}

export default { listContacts, getContactById, removeContact, addContact };
