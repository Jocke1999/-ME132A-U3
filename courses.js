//globala variablar
let courses = DATABASE.courses;

// skapar ett id "result" som innehåller titel och totala credits 
function renderCourse(id) {
    let div = document.createElement("div");
    let courses = DATABASE.courses[id];
    div.classList = "result";
    div.innerHTML =
    `<header><u>${courses.title} (total credits: ${courses.totalCredits})</u></header>
    <div>
        <h3>Course Responsible:</h3>
        <div id="resteachers">${findResponsible(courses)}</div>
        <br>
        <h3>Teachers:</h3>
        <div id="teachers">${findTeachers(courses)}</div>
        <br>
        <h3>Students:</h3>
        <div id="students">
        ${findStudents(courses)}</div>
        <br>
        <div id="border"></div>
    </div>
          `
    return div;
}

function renderCourses (courses) {
    let coursesElement = document.getElementById("result");
    for (let course of courses) {
        let courseElement = renderCourse(course.courseId);
        coursesElement.appendChild(courseElement);
    }
}

function findResponsible (courses) {
let responsibleBox = []
        for (let i = 0; i < DATABASE.teachers.length; i++) {
        let div = document.createElement("div")
        if (DATABASE.teachers[i].teacherId == courses.courseResponsible) {
            let text = div.innerHTML = `
            <div id="responsibleteacher"><h4>${DATABASE.teachers[i].firstName} ${DATABASE.teachers[i].lastName} (${DATABASE.teachers[i].post})</h2>`
            responsibleBox.push(text);

        } 
    }
    return responsibleBox.toString().split(",").join(""); 
}     

// skapat en loop där man hittar alla lärare
function findTeachers(courses) {
    let teacherBox = [];
    for (let i = 0; i < DATABASE.teachers.length; i++) {
        let div = document.createElement("div");
        for ( let x = 0; x < courses.teachers.length; x++)
        if (DATABASE.teachers[i].teacherId == courses.teachers[x]) {
            let text = div.innerHTML = `
            <div id="findteachers"><h4>${DATABASE.teachers[i].firstName} ${DATABASE.teachers[i].lastName} (${DATABASE.teachers[i].post})  </h4></div>`
            teacherBox.push(text);
        } else if (DATABASE.teachers[i].teacherId == courses.teachers[x]) {
            let text = div.innerHTML = `
            <div id="findteachers"><h4>${DATABASE.teachers[i].firstName} ${DATABASE.teachers[i].lastName} (${DATABASE.teachers[i].post})  </h4></div>`
            teacherBox.push(text);
        }
    }
    return teacherBox.toString().split(",").join("");
} 
// skapat en loop där man hittar alla elever
 function findStudents(courses) {
    let studentBox = [];
    for (let i = 0; i < DATABASE.students.length; i++) {
        let div = document.createElement("div");
        for ( let x = 0; x <DATABASE.students[i].courses.length; x++)
        if (DATABASE.students[i].courses[x].courseId == courses.courseId && DATABASE.students[i].courses[x].passedCredits == courses.totalCredits) {
            let text = div.innerHTML = `
            <div class="done"><h4>${DATABASE.students[i].firstName} ${DATABASE.students[i].lastName} (${DATABASE.students[i].courses[x].passedCredits} credits)  </h4>
            <p>${DATABASE.students[i].courses[x].started.semester} ${DATABASE.students[i].courses[x].started.year}</div>`
            studentBox.push(text);
        } else if (DATABASE.students[i].courses[x].courseId == courses.courseId){
            let text = div.innerHTML = `
            <div class="notdone"><h4>${DATABASE.students[i].firstName} ${DATABASE.students[i].lastName} (${DATABASE.students[i].courses[x].passedCredits} credits)  </h4>
            <p>${DATABASE.students[i].courses[x].started.semester} ${DATABASE.students[i].courses[x].started.year}</div>`
            studentBox.push(text);
        }
    }
    return studentBox.toString().split(",").join("");
} 

// toLowerCase för att användningen av små samt stora bokstäver ska kunna skrivas ( skrivs flera gånger i koden)
function searchCourse() {
    return input.value.toLowerCase();
}

let input = document.getElementById("course-search");
//skapar en keyUp funktion för att användaren ska kunna integrera med sökfältet
input.addEventListener("keyup", courseSearch);

//renderar/framkallar kursen utifrån att man sökt i sökfältet
function courseSearch() {
    let coursesArray = []
    for (let i = 0; i < courses.length; i++){
        document.getElementById("result").innerHTML = ""
        if ("" == searchCourse()) {
            document.getElementById("result").innerHTML = ""
        } else if (courses[i].title.toLowerCase().includes(searchCourse())) {
            coursesArray.push(courses[i]);
        }
    }

    renderCourses(coursesArray)
}

function submit () {
    let coursesArray = []
    for (let i = 0; i < courses.length; i++) {
        if (courses[i].courses.toLowerCase().includes(searchCourse)) {
            coursesArray.push(courses[i]);
        }
    }
    renderCourses(coursesArray)
}

input.addEventListener("submit", submit);

//Skapar en dark/light mode funktion där "knappen/button" skapas till en eventListener 
function darkMode() {
    var element = document.body;
    const darkMode = localStorage.getItem("darkMode")
    element.classList.toggle("darkMode");

    if (JSON.parse(darkMode) == true) {
        element.classList.remove("darkMode");
        localStorage.setItem("darkMode", JSON.stringify(false));
    } 
    else if (JSON.parse(darkMode) == false) {
        element.classList.add("darkMode");
        localStorage.setItem("darkMode", JSON.stringify(true));
    }
}

const btn = document.querySelector('.btn')
btn.addEventListener('click', darkMode);

//direkt kod
renderCourses(DATABASE.courses);