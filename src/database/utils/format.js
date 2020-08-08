function getSubject(subject) {
    const arrayPosition = +subject - 1
    return subjects[arrayPosition]
}

function convertHoursToMinutos(time){
   const [hour, minutes] = time.split(":")
   return Number((hour * 60) + minutes)
}

const subjects = [
    "Artes",
    "Ciências",
    "Biologia",
    "Educação Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
    "Física",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutos
}