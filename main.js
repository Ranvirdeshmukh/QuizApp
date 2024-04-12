// Ranvir Deshmukh 
// Lab-2 
$(document).on('change', '.answer-option input[type="radio"]', function() {
    let questionBlock = $(this).closest('.question'); 

    questionBlock.find('.answer-option').removeClass('active').addClass('dim');

    $(this).closest('.answer-option').removeClass('dim').addClass('active');
});



function constructQuiz(data) {
    let quizHtml = '';
    // Iterate over questions in data to construct HTML
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


  document.querySelector('.submit-btn').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default form submission behavior
    if (areAllQuestionsAnswered()) {
        calculateResults(); // Call calculateResults only if all questions are answered
    } else {
        alert('Please answer all questions.'); 
    }
   // Show the modal with animation
   showModal();
});

// document.addEventListener('DOMContentLoaded', () => { // Ensures the script runs after the DOM is fully loaded
//     document.querySelector('.submit-btn').addEventListener('click', function(e) {
//         e.preventDefault(); // Prevent default form submission behavior
//         if (areAllQuestionsAnswered()) {
//             calculateResults(); // Call calculateResults only if all questions are answered
//         } else {
//             alert('Please answer all questions.'); // Provide feedback if not all questions are answered
//         }
//     });

// })

function areAllQuestionsAnswered() {
    const questions = document.querySelectorAll('.question');
    let allAnswered = true;
    questions.forEach(question => {
        if (!question.querySelector('input[type="radio"]:checked')) {
            allAnswered = false; // If any question is not answered, set allAnswered to false
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



document.querySelectorAll('.answer-option input[type="radio"]').forEach(input => {
    input.addEventListener('change', function() {
        let selectedQuestion = this.name;
        
        // Remove active and dim classes from all options of the same question
        document.querySelectorAll(`.answer-option input[name="${selectedQuestion}"]`).forEach(siblingInput => {
            siblingInput.parentElement.classList.remove('active', 'dim');
        });
        
        // Add active class to the selected label
        this.parentElement.classList.add('active');
        
        // Add dim class to other labels
        document.querySelectorAll(`.answer-option input[name="${selectedQuestion}"]:not(:checked)`).forEach(siblingInput => {
            siblingInput.parentElement.classList.add('dim');
        });

        // Check if all questions are answered after making a new selection
        // if (areAllQuestionsAnswered()) {
        //     // If all questions are answered, calculate and display the results
        //     calculateResults();
        // }
    });
});

function areAllQuestionsAnswered() {
    const questions = document.querySelectorAll('.question');
    for (let question of questions) {
        if (!question.querySelector('input[type="radio"]:checked')) {
            // If any question does not have a selected answer, return false
            return false;
        }
    }
    // If all questions have a selected answer, return true
    return true;
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
  