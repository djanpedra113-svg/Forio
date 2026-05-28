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

        if (q1 && q1.value === "B") {
            score++;
        } else {
            mistakes.push("Question 1: Correct answer is B: It is vital that organisations monitor their systems regularly as it helps organisations identify suspicious behaviour quickly.");

        }

         if (q2 && q2.value === "True") {
            score++;
        } else {
            mistakes.push("Question 2: Correct answer is True: Forensic readiness plans and policies should be reviewed and updated regularly to ensure they remain effective.");

        }

         if (q3 && q3.value === "Backups") {
            score++;
        } else {
            mistakes.push("Question 3: Correct answer is backups");
        }

         if (q4 && q4.value === "A") {
            score++;
        } else {
            mistakes.push("Question 4: Correct answer is A: Organisations should document security procedures as it ensures adherence to legal compliance.");
        }

         if (q5 && q5.value === "False") {
            score++;
        } else {
            mistakes.push("Question 5: Correct answer is False: Regularly reviewing policies is important as it allows organisations to respond to potential threats much quicker.");
        }

         const quizResult = {
            username: localStorage.getItem("username"),
            quizName: "quiz5",
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
    fetch(`http://localhost:3000/results/${username}/quiz5`)
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
