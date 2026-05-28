console.log("Forio frontend is connected successfully.");

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

        if (q1 && q1.value === "A") {
            score++;
        } else {
            mistakes.push("Question 1: Correct answer is A: General Data Protection Regulation (GDPR) is a law designed to protect personal data and privacy.");
        }

         if (q2 && q2.value === "True") {
            score++;
        } else {
            mistakes.push("Question 2: Correct answer is True: Organisations that follow laws such as the GDPR, securely gather, preserve and analyse digital evidence without tampering and are admissible in court are legally compliant.");
        }

         if (q3 && q3.value === "General Data Protection Regulation") {
            score++;
        } else {
            mistakes.push("Question 3: Correct answer is General Data Protection Regulation");
        }

         if (q4 && q4.value === "A") {
            score++;
        } else {
            mistakes.push("Question 4: Correct answer is A: ISO 27001");
        }

         if (q5 && q5.value === "True") {
            score++;
        } else {
            mistakes.push("Question 5: Correct answer is True: Organisations must ensure evidence is collected and stored correctly during investigations or else they will face legal fines and penalties");
        } 
         const quizResult = {
            username: localStorage.getItem("username"),
            quizName: "quiz3",
            score: score,
            total: 5,
            mistakes: mistakes
        };

         localStorage.setItem("quizResult", JSON.stringify(quizResult));

         fetch("http://localhost:3000/save-result", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body:JSON.stringify(quizResult)
        });
    });
    
}

const savedResults = document.getElementById("saved-results");
const username = localStorage.getItem("username");

if (savedResults && username) {
    fetch(`http://localhost:3000/results/${username}/quiz3`)
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
