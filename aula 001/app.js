let People = {
  nome: "Bruno",
  idade: 15,
  sexo: "Masculino"
}

var profission = "Programattion"
var experience = 4

console.log(`${People.nome}: ${People.idade} anos`)

function ConcatProf(a, b, c){
  return console.log(`${a.nome} trabalha com ${b} a ${c} anos`)
}

console.log(ConcatProf(People, profission, experience));
