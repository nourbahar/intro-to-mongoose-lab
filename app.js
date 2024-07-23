require('dotenv').config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
const Customer = require("./models/customer.js");
const prompt = require('prompt-sync')();
console.log('Welcome to the CRM');

const Menu = async () => {
    console.log('What would you like to do?');
    console.log('1. Create a new customer');
    console.log('2. View all customers');
    console.log('3. Update a customer');
    console.log('4. Delete a customer');
    console.log('5. Quit');
    const choice = prompt(' Number of action to run: ');

if (choice === '1') {
        await createCustomer();
    } else if (choice === '2') {
        await viewCustomers();
    } else if (choice === '3') {
        await updateCustomer();
    } else if (choice === '4') {
        await deleteCustomer();
    } else if (choice === '5') {
        console.log('Exiting..');
        return;
    } else {
        console.log('Invalid. Please try again.');
        await Menu();
    }
}

//Functions 

const createCustomer= async() =>{
    const name = prompt('Enter customer name: ');
    const age = prompt('Enter customer age: ');
    const customer = Customer.create({ name, age });
  
    console.log('created successfully!');
}


const viewCustomers= async() =>{
    const customers = await Customer.find({});
      console.log('All Customers:');
      customers.forEach((customer) => {
        console.log(`id: ${customer._id} --  Name: ${customer.name}, Age: ${customer.age}`);
      });
    }


const updateCustomer= async() =>{
    const customers = await Customer.find({});
  console.log('list of customers:');
  customers.forEach((customer) => {
    console.log(`id: ${customer._id} --  Name: ${customer.name}, Age: ${customer.age}`);
  });
  const customerId = prompt('Enter id to update:');
  const customer = await Customer.findById(customerId);
  const newName = prompt(`Enter a new name? (current: ${customer.name})`);
  const newAge = prompt(`Enter a new age? (current: ${customer.age})`);
  
 await Customer.create({newName,newAge});
  console.log('List updated');
  customers.forEach((customer) => {
    console.log(`id: ${customer._id} --  Name: ${customer.name}, Age: ${customer.age}`);
  });
}

const deleteCustomer= async() =>{
    const customers = await Customer.find({});
    console.log('list of customers:');
    customers.forEach((customer) => {
      console.log(`id: ${customer._id} --  Name: ${customer.name}, Age: ${customer.age}`);
    });
    const customerId = prompt('customer to delete: ');
    await Customer.findByIdAndDelete(customerId);
    console.log('deleted successfully.');

  }
Menu();