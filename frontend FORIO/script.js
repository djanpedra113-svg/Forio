
console.log("Forio frontend is connected successfully.");

const loginForm = document.getElementById("login-form");
if(loginForm){loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();
         const username = document.getElementById("username").value;
         fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.token) {
                localStorage.setItem("username", username);
                alert("Login successful!");
                window.location.href = "dashboard.html";
            } else {
                alert(data.message || "Login failed.");
            }
        })
        .catch(error => {
            console.error(error);
            alert("An error occurred while logging in.");
        });
    });
}


const registerForm = document.getElementById("register-form");
if(registerForm){registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: username })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem("username", username);
        window.location.href = "dashboard.html";
    } else {
        alert(data.message);
    }
});};

const submitButton = document.getElementById("submit");
const resultsContainer = document.getElementById("results");
if(submitButton){
    submitButton.addEventListener("click", function () {
        let score = 0;
        let mistakes = [];

        const q1 = document.querySelector('input[name="question1"]:checked');
        const q2 = document.querySelector('input[name="question2"]:checked');
        const q3 = document.querySelector('input[name="question3"]');
        const q4 = document.querySelector('input[name="question4"]:checked');
        const q5 = document.querySelector('input[name="question5"]:checked');

        if (q1 && q1.value === "B") {
            score++;
        } else {
            mistakes.push("Question 1: Correct answer is B: Forensic readiness is defined as an organisation's ability to accurately identify, collect, store and analyse digital evidence.");
        }

         if (q2 && q2.value === "True") {
            score++;
        } else {
            mistakes.push("Question 2: Correct answer is True: Forensic readiness is a critical component of cybersecurity, as it ensures that organisations are prepared to support digital investigations and act accordingly in the event of a cybersecurity incident.");
        }

         if (q3 && q3.value === "Digital evidence") {
            score++;
        } else {
            mistakes.push("Question 3: Correct answer is digital evidence: Digital evidence includes; logs files, emails, images, documents, internet history, database records.");
        }

         if (q4 && q4.value === "B") {
            score++;
        } else {
            mistakes.push("Question 4: Correct answer is B: Correct answer is B: Reduction of investigation costs is a benefit of forensic readiness because it minimises the time digital investigators spend on investigations, costly operational downtime and protects organisations from fines");
        }

         if (q5 && q5.value === "False") {
            score++;
        } else {
            mistakes.push("Question 5: Correct answer is False: Forensic readiness depends on organistations proactive approach to identifying, collecting and preserving data before an incident");
        }

         const quizResult = {
            username: localStorage.getItem("username"),
            quizName: "quiz1",
            score: score,
            total: 5,
            mistakes: mistakes
        };

         localStorage.setItem("quizResult", JSON.stringify(quizResult));

         fetch("http://localhost:3000/save-result", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(quizResult)
})
.then(response => {
    if (!response.ok) {
        throw new Error("Result was not saved.");
    }
    return response.json();
})
.then(data => {
    resultsContainer.innerHTML += `
        <p>Your result has been saved.</p>
    `;
})
.catch(error => {
    console.error("Save error:", error);
    resultsContainer.innerHTML += `
        <p>Your result was shown, but it may not have saved.</p>
    `;
});
            
        });
    }

const savedResults = document.getElementById("saved-results");
const username = localStorage.getItem("username");

if (savedResults && username) {
    fetch(`http://localhost:3000/results/${username}/quiz1`)
        .then(response => response.json())
        .then(result => {
            if (result) {
                const mistakes = JSON.parse(result.mistakes);
                savedResults.innerHTML = `
                    <h2>Your result:</h2>
                    <p><strong>Score:</strong> ${result.score}/${result.total}</p>
                    <p><strong>Mistakes:</strong></p>
                    <p>${mistakes.length === 0 ? "No mistakes made." : mistakes.join("<br>")}</p>
                `;
            }
        });
}