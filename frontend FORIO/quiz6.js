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
            mistakes.push("Question 1: Correct answer is A: There are many departments that work together to support incident investigations such as; the IT teams, security teams, management and legal teams.");
        }

         if (q2 && q2.value === "True") {
            score++;
        } else {
            mistakes.push("Question 2: Correct answer is True");
        }

         if (q3 && q3.value === "Business Continuity") {
            score++;
        } else {
            mistakes.push("Question 3: Correct answer is business continuity: Business continuity is an organisation’s ability to continue operating during and after disruptions such as cyber attacks.");
        }

         if (q4 && q4.value === "C") {
            score++;
        } else {
            mistakes.push("Question 4: Correct answer is C: A lack of training, increases the risk of human error and puts the organsisation at risk.");
        }

         if (q5 && q5.value === "True") {
            score++;
        } else {
            mistakes.push("Question 5: Correct answer is True: It is important that forensic readiness is integrated into an organisation's cybersecurity strategy and that departments work together to support incident investigations and protect digital evidence.");

        }

         const quizResult = {
            username: localStorage.getItem("username"),
            quizName: "quiz6",
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
    fetch(`http://localhost:3000/results/${username}/quiz6`)
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
