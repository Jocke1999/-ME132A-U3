"use strict";

//En wrapper som ska framställa resultaten

let results_wrapper = document.getElementById("#results_wrapper")


//Key up funktion

function onKeyUp() {
    console.log(this.value);
    let foundStudent = DATABASE.students
        .filter((student) => student.lastName.toLowerCase().includes(input.value))
    console.log(foundStudent)
    document.querySelector("#results_wrapper").innerHTML = "";
    renderStudents(DATABASE);
}

//Söka på efternamnen med input.value 

let input = document.querySelector("input");
input.addEventListener("keyup", onKeyUp);

//Rendera och lägger in HTML element 

function renderStudents(data) {

    for (let i = 0; i < data.students.length; i++) {
        let elementStudent = document.createElement("div")
        elementStudent.innerHTML = `
            <div id="container">
                <h2>${data.students[i].firstName} ${data.students[i].lastName} (total: ${data.students[i].courses.passedCredits} )</h2>
                <p> Courses: </p>
            </div>
             `;
        document.querySelector("#wrapper").appendChild(elementStudent);
    }
}
