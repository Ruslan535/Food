// function showThis(a, b) {
//     console.log(this);
//     function sum() {
//         console.log(this);
//         return a + b;
//     }

//     console.log(sum());
// }

// showThis(4, 5);

// const obj = {
//     a: 20,
//     b: 30,
//     sum: function() {
//         function shout() {
//             console.log(this);
//         }
//     shout();
//     }
// };
// obj.sum();

// function User(name, age) {
//     name = name;
//     this.age = age;
//     this.sayHello = function() {
//         console.log(`Hello ${name}`);
//     };
// }

// let ruslan = new User('Ruslan', 26);

// ruslan.sayHello();

const person = {
    name: 'Ruslan',
    tel: '+35432526737',
    parent: {
        mom: 'Lubov',
        father: 'Igor'
    }
};

const clone = JSON.parse(JSON.stringify(person));
clone.parent.mom = 'Love';
console.log(clone);