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
if (!fs.existsSync(dirPath)) {

    //membuat folder
    fs.mkdirSync(dirPath);
}

//membuat logika apakah file constacts.json sudah dibuat atau belum
const dataPath = './data/contacts.json'
if (!fs.existsSync(dataPath)) {

    //membuat file
    fs.writeFileSync(dataPath, '[]', 'utf-8')
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




//membuat fungsi question untuk pertanyaan
const question = (questions) => {
    return new Promise((resolve, reject) => {
        //membuat pertanyaan
        rl.question(questions, (answer) => {
            //mengembalikan nilai answer
            resolve(answer)
        })
    })
}
//membuat fungsi main asynchronous
const main = async () => {
    //memanggil fungsi question, dan membuat pertanyaan
    const name = await question('what is your name? ')
    const email = await question('what is your email? ')
    const tlp = await question('what is your number phone? ')

    //membuat logika apabila email dan tlp benar
    if (validator.isEmail(email) == true && validator.isMobilePhone(tlp, 'id-ID') == true && validator.isAlpha(name,'en-US',{ignore: ' '})) {

        //membuat variable untuk menampung nilai
        const contact = { name, email, tlp };

        //membaca file JSON
        const file = fs.readFileSync('data/contacts.json', 'utf8');

        //mengubah file txt menjadi format JSON
        const contacts = JSON.parse(file);

        //memasukan data kedalam format json
        contacts.push(contact);

        //menuliskan data kedalam file contacts.json
        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    }

    if(!validator.isAlpha(name,'en-US',{ignore: ' '})== true){
        console.log('your name is wrong format');
    }else{
        console.log(`your name is ${name}`);
    }

    //membuat logika apabila email salah
    if (!validator.isEmail(email) == true) {
        console.log('Your is wrong format');
    }
    else {
        console.log(`Your Email : ${email}`);
    }

    //membuat logika apabila tlp salah
    if (!validator.isMobilePhone(tlp, 'id-ID') == true) {
        console.log('Your is number phone wrong format');
    }
    else {
        console.log(`Your number phone : ${tlp}`);
    }

    //membuat logika apabila email dan tlp salah
    if (validator.isEmail(email) != true && validator.isMobilePhone(tlp, 'id-ID') != true) {
        console.log('Your Email is wrong format');
        console.log('Your phone number is wrong format');
    }
    //memberhentikan program
    rl.close()
}

//memanggil fungsi main
main()