//Bestämmer att "inputStudent" ska sparas utifrån "student-search " i HTML
let inputStudent = document.getElementById('student-search');

//Skapar en funktion där man ska hitta studenterna utfrån deras efternamn och även med små bokstäver 
function findStudents () {
    let student = DATABASE.students
    .filter(student => student.lastName.toLowerCase().includes(inputStudent.value))
    .map(student => student.firstName + ' ' + student.lastName + " (total: " + + " credits");
    return student;
}

//Skapar en "tryck" funktion där keyUp visar alla studenter. 
inputStudent.addEventListener('keyup' , function () {
    let foundStudent = findStudents ();
    document.getElementById("results").innerHTML = "";
    createElement(foundStudent);
//Om "input fältet" är tomt ska det inte visas några element från HTML
    if (inputStudent.value == ""){
        document.getElementById("results").innerHTML = "";
    }
});

//Renderar(framkallar) alla studenter  
function renderStudent (student) {
    let results = document.getElementById("results");
    let div = document.createElement("div");

    div.innerHTML = student;
    results.appendChild(div);
}
//Skapar student elementen 
function createElement (students) {
    for (let student of students){
        renderStudent(student);
    }
}