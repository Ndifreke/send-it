const student = [ {
  name: 'Douglas',
  age: 23
 },
 {
  name: 'Zam',
  age: 30
 },
 {
  name: 'Chime',
  age: 29
 },
 {
  name: 'Victor',
  age: 19
 },
 {
  name: 'Mike',
  age: 35
 },
 {
  name: 'Emery',
  age: 25
 },
]
let sumOfAge = 0;

const ageSum = student.forEach( ( student ) =>  {
 if ( student.age > 25 ) 
  console.log( student.name );
  sumOfAge += student.age; 
})
console.log(sumOfAge)