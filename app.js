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
    //membuat logika apabila nama salah program akan tutup
    if(!validator.isAlpha(name,'en-US',{ignore: ' '})== true){
        console.log('Your name is wrong format');
        rl.close()
        return(false)
    }

    const email = await question('what is your email? ')
    if (!validator.isEmail(email) == true) {
        console.log('Your email is wrong format');
        rl.close()
        return(false)
    }

    const tlp = await question('what is your number phone? ')
    if (!validator.isMobilePhone(tlp, 'id-ID') == true) {
        console.log('Your number phone is wrong format');
        rl.close()
        return(false)
    }

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

        //menampilkan data ke terminal
        console.log(`Your name         : ${name}`);
        console.log(`Your Email        : ${email}`);
        console.log(`Your phone number : ${tlp}`);
    rl.close()
}

//memanggil fungsi main
main()