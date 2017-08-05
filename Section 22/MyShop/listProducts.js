var faker = require('faker');

console.log('===================');
console.log('WELCOME TO MY SHOP');
console.log('===================');

for(var i = 0; i < 10; i++) {
   var adj = faker.commerce.productAdjective();
   var mat = faker.commerce.productMaterial();
   var prod = faker.commerce.productName();
   var price = faker.commerce.price();
   
   //console.log(adj + ' ' + mat + ' ' + prod + ' - ' + price);
   console.log(prod + ' - $' + price);
}
