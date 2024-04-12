// Ranvir Deshmukh 
// Lab-2 
$(document).ready(function() {
    // Load the quiz data and construct the quiz UI
    $.getJSON("data.json").done(function(data) {
        constructQuiz(data);
    }).fail(function() {
        console.error("Error fetching data.json. Please ensure the path is correct and the server is properly configured to serve JSON files.");
    });

    // Event handler for radio button changes to manage answer option visuals
    $(document).on('change', '.answer-option input[type="radio"]', function() {
        let questionBlock = $(this).closest('.question');
        questionBlock.find('.answer-option').removeClass('active').addClass('dim');
        $(this).closest('.answer-option').removeClass('dim').addClass('active');
    });

    // Event listener for the submit button
    $('.submit-btn').on('click', function(e) {
        e.preventDefault();
        if (areAllQuestionsAnswered()) {
            calculateResults();
        } else {
            alert('Please answer all questions.');
        }
    });
});

// Function to dynamically construct the quiz based on data
function constructQuiz(data) {
    let quizHtml = '';
    data.questions.forEach((question, index) => {
        quizHtml += `<div class="question"><h2>${question.question_name}</h2><div class="answers">`;
        question.answers.forEach((answer) => {
            quizHtml += `
                <label class="answer-option">
                    <input type="radio" name="question${index}" value="${answer.outcome}">
                    <div class="answer-content"><span>${answer.text}</span></div>
                </label>`;
        });
        quizHtml += `</div></div>`;
    });

    $(".quiz-content").html(quizHtml);
}

// Function to check if all questions have been answered
function areAllQuestionsAnswered() {
    let allAnswered = true;
    $('.question').each(function() {
        if (!$(this).find('input[type="radio"]:checked').length) {
            allAnswered = false;
        }
    });
    return allAnswered;
}

function calculateResults() {
    const tallies = { A: 0, B: 0, C: 0, D: 0 };
    document.querySelectorAll('input[type="radio"]:checked').forEach(radio => {
        tallies[radio.value]++;
    });

    let maxTally = 0;
    let maxCharacter = '';
    Object.entries(tallies).forEach(([character, tally]) => {
        if (tally > maxTally) {
            maxTally = tally;
            maxCharacter = character;
        }
    });

    displayResult(maxCharacter);

    
}
function displayResult(character) {
    // Get the modal and its components
    const quizResultModal = document.getElementById('quiz-result');
    const resultImage = document.getElementById('result-image');
    const resultDescription = document.getElementById('result-description');
    const closeButton = document.querySelector('.close');

    // Based on the character code ('A', 'B', 'C', 'D'), set the image and description
    switch(character) {
        case 'A': 
            resultImage.src = 'harvey.jpeg'; // Update with correct path
            resultDescription.textContent = "Harvey Specter - You're confident and charismatic, with a knack for getting what you want.";
            break;
        case 'B':
            resultImage.src = 'mikeross.jpeg'; // Update with correct path
            resultDescription.textContent = "Mike Ross - You're intelligent and resourceful, using your knowledge to navigate challenges.";
            break;
        case 'C':
            resultImage.src = 'donna.jpg'; // Update with correct path
            resultDescription.textContent = "Donna Paulsen - You're the heart of your group, valued for your loyalty and emotional intelligence.";
            break;
        case 'D':
            resultImage.src = 'jess.jpg'; // Update with correct path
            resultDescription.textContent = "Jessica Pearson - You're a born leader, ambitious and always thinking several steps ahead.";
            break;
        default:
            resultDescription.textContent = "It's a tie! You share traits with multiple characters.";
            resultImage.style.display = 'none';
    }

    // Display the modal
    quizResultModal.style.display = 'block';

    // Close the modal when the close button is clicked
    closeButton.addEventListener('click', () => {
        quizResultModal.style.display = 'none';
    });

    // Optional: Close the modal if clicked outside of it
    window.addEventListener('click', (event) => {
        if (event.target === quizResultModal) {
            quizResultModal.style.display = 'none';
        }
    });

}





function showModal() {
    const modal = document.querySelector('.modal');
    modal.style.display = 'flex'; // Make the modal display:flex to show it
    setTimeout(() => {
        modal.style.opacity = 1; // Fade to fully visible
        modal.style.transform = 'scale(1)'; // Scale to full size
    }, 10); // Short timeout ensures properties are transitioned from initial state
}



document.querySelector('.close').addEventListener('click', function() {
    const modal = document.querySelector('.modal');
    modal.style.opacity = 0; // Fade out
    modal.style.transform = 'scale(0.7)'; // Scale down
    setTimeout(() => {
        modal.style.display = 'none'; 
    }, 400); 
});

$.getJSON("data.json").done(function(data) {
    constructQuiz(data);
}).fail(function() {
    console.error("Error fetching data.json. Please ensure the path is correct and the server is properly configured to serve JSON files.");
});



// // Assuming the JSON file is in the same directory as your HTML file
// const loadQuizData = async () => {
//     try {
//       const response = await fetch('data.json');
//       const data = await response.json();
//       buildQuiz(data);
//     } catch (error) {
//       console.error("Failed to load quiz data:", error);
//     }
//   };
  
//   const buildQuiz = (data) => {
//     const quizContainer = document.querySelector('.quiz-content'); // Adjust selector as needed
//     let html = '';
  
//     // Dynamically generate HTML for each question
//     data.questions.forEach((question, index) => {
//       html += `
//         <div class="question">
//           <h2>${question.question_name}</h2>
//           <div class="answers">`;
  
//       // Generate answers for each question
//       question.answers.forEach(answer => {
//         html += `
//             <label class="answer-option">
//               <input type="radio" name="question${index}" value="${answer.outcome}" hidden>
//               <div class="answer-content">
//                 <span>${answer.text}</span>
//                 <img src="${answer.img_url}" alt="">
//               </div>
//             </label>`;
//       });
  
//       html += `
//           </div>
//         </div>`;
//     });
  
//     // Append generated HTML to the quiz container
//     quizContainer.innerHTML = html;
  
//   };
  
//   document.addEventListener('DOMContentLoaded', loadQuizData);
  