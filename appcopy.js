'use strict'


//import library readline
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//import library validator
const validator = require('validator');

//import library filesystem
const fs = require('fs');
const { default: test } = require('node:test');

//mmebuat logika apakah folder data sudah dibuat atau belum
const dirPath = './data'
if(!fs.existsSync(dirPath)){

    //membuat folder
    fs.mkdirSync(dirPath);
}

//membuat logika apakah file constacts.json sudah dibuat atau belum
const dataPath = './data/contacts.json'
if(!fs.existsSync(dataPath)){

    //membuat file
    fs.writeFileSync(dataPath,'[]','utf-8')
}

//pertanyaan
// rl.question('What is your name? ', (name) => {
//     rl.question('What is your email? ', (email) => {
//         rl.question('What is your number phone? ', (tlp) => {

//             //menampilkan hasil inputan nama
//             console.log(`Your name : ${name}`);

//             //membuat logika email dan tlp benar
//             if(validator.isEmail(email) == true && validator.isMobilePhone(tlp,'id-ID') == true){

//                 //membuat variable untuk menampung nilai
//                 const contact = {name,email,tlp};

//                 //membaca file JSON
//                 const file = fs.readFileSync('data/contacts.json','utf8');

//                 //mengubah file txt menjadi format JSON
//                 const contacts = JSON.parse(file);

//                 //memasukan data kedalam format json
//                 contacts.push(contact);

//                 //menuliskan data kedalam file contacts.json
//                 fs.writeFileSync('data/contacts.json',JSON.stringify(contacts));

//                 //menampilkan hasil masukan data ke terminal
//                 console.log(`Your Email : ${email}`);
//                 console.log(`Your Phone : ${tlp}`);
//             }

//             //membuat logika apabila email salah
//             if(validator.isEmail(email) == false){
//                 console.log(`Your email is wrong`);
//             }

//             //membuat logika apabila telpon salah
//             if(validator.isMobilePhone(tlp,'id-ID') == false){
//                 console.log(`Your Phone number is wrong`);
//             }
//             console.log('Thank you');

//             //menghentikan program
//             rl.close();
//         })
//     })
// })

// function input(prompt) {
//     return new Promise((callbackFn, errorFn) => {
//         rli.question(prompt, (uinput)=> {
//             callbackFn(uinput);
//         }, ()=> {
//             errorFn();
//         });
//     });
// }

const question = (questions,feedback) => {
    return new Promise((resolve, reject) => {
      rl.question(questions, (answer) => {
        var email, tlp, name
        if(validator.isEmail(answer) == true){
          if(validator.isMobilePhone(answer) == true){
            email = answer
            tlp = answer

            if(name != null && email != null && tlp != null){
              const contact = {nama,email,tlp};
              const file = fs.readFileSync('data/contacts.json','utf8');
              const contacts = JSON.parse(file);
              contacts.push(contact);
              fs.writeFileSync('data/contacts.json',JSON.stringify(contacts));
              }
          }
        }
        else{
            name = answer
        }
        
        resolve()
      })
    })
  }

  const main = async () => {
    await question('what is your name? ','your name : ')
    await question('what is your email? ','your email : ')
    await question('what is your number phone? ','your number phone : ')

    rl.close()
  }

  main()