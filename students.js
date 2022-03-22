//key up funktion
function onKeyUp() {
    console.log(this.value);
}
let input = document.querySelector("input");
input.addEventListener("keyup", onKeyUp);

//Rendera och lägger in HTML element 

function renderStudents(data) {

    for (let i = 0; i < data.students.length; i++) {
        let elementStudent = document.createElement("div")
        elementStudent.innerHTML = `
            <div id="container">
                <h2>${data.students[i].firstName} ${data.students[i].lastName} (total: ${data.students[i].courses.passedCredits} )</h2>
                <p> Courses </p>
            </div>
             `;
        document.querySelector("#container").appendChild(elementStudent);
    }
}
renderStudents(DATABASE);