const obj = { name: 'mike', mother: { name: 'sara' } };
const {
    name,
    mother: { name: motherName },
} = obj;
console.log(name); //mike
console.log(motherName) //sara
console.log(mother); // 참조에러