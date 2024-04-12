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
    console.log("calculate results")
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
    console.log(maxTally, maxCharacter)
    displayResult(maxCharacter);

    
}
function displayResult(character) {
    const resultImage = $('#result-image');
    const resultDescription = $('#result-description');

    let imagePath = '';
    let descriptionText = '';

    switch(character) {
        case 'A':
            imagePath = 'harvey.jpeg';
            descriptionText = "Harvey Specter - You're confident and charismatic, with a knack for getting what you want.";
            break;
        case 'B':
            imagePath = 'mikeross.jpeg';
            descriptionText = "Mike Ross - You're intelligent and resourceful, using your knowledge to navigate challenges.";
            break;
        case 'C':
            imagePath = 'donna.jpg';
            descriptionText = "Donna Paulsen - You're the heart of your group, valued for your loyalty and emotional intelligence.";
            break;
        case 'D':
            imagePath = 'jess.jpg';
            descriptionText = "Jessica Pearson - You're a born leader, ambitious and always thinking several steps ahead.";
            break;
        default:
            descriptionText = "It's a tie! You share traits with multiple characters.";
            imagePath = ''; // Ensure this is handled gracefully in your UI
            break;
    }

    if(imagePath) {
        resultImage.show().attr('src', imagePath); // Show and set the image if there is one
    } else {
        resultImage.hide(); // Hide the image element if no imagePath is set
    }
    
    resultDescription.text(descriptionText);
    console.log("end of display result")
    showModal();
}






function showModal() {
    console.log("show modal function")
    const quizResultModal = $('#quiz-result');
    console.log(quizResultModal)
    // Correctly use jQuery methods for setting CSS properties
    quizResultModal.css({
        'display': 'flex',
        'opacity': 1,
        'transform': 'scale(1)'
    });
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
  