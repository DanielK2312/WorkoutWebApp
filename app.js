// pull from a JSON file for excercises, and an enternal API for quotes

class getUIElements {

  // just print motivation dynamically on html
  motivation() {
    document.getElementById('motivation').innerHTML = "<p>Some Motivation to kill your workout!</p>"
  }

  // generate randomQuote after fetching from API
  getRandomQuote() {

    // need to figure out how to get quotes from API
    fetch("https://andruxnet-random-famous-quotes.p.rapidapi.com/?cat=famous", {
      "method": "GET",
      "headers": {
      }
    })
      .then(res => res.json())
      .then(data => {
        const div = document.getElementById('word-container')
        let output = '';
        data.forEach(element => {
          output += `<h5>${element.quote}</h5>`;
        });
        // dynamically add quotes to html doc
        document.getElementById('quote').innerHTML = output;
        div.style.width = '300px';
        div.style.border = '15px solid';
        div.style.padding = '50px';
        div.style.margin = '20px';
        div.style.float = 'right';
        div.style.marginTop = '-300px';
      })
      .catch(err => {
        console.error(err);
      });
  }

  clearField() {
    document.getElementById('input').value = '';
  }

  // gets chest excercises from the url I created
  getChest(url) {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        let output = '';
        let counter = 1;
        data.forEach(element => {
          if (element.body_part === 'Chest') {
            // console.log(element.excercise);
            output += `<h3>Excercise: ${counter}</h3>
                     <li>${element.excercise}</li>
                     <li>${element.sets}</li>
                      `;
            counter++;
          }
        });
        document.getElementById('output').innerHTML = output;
      })
      .catch(err => console.log(err))
  }

  // do the same to get other excercise types
  // gets chest excercises from the url I created
  getBack(url) {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        let output = '';
        let counter = 1;
        data.forEach(element => {
          if (element.body_part === 'Back') {
            // console.log(element.excercise);
            output += `<h3>Excercise: ${counter}</h3>
                     <li>${element.excercise}</li>
                     <li>${element.sets}</li>
                      `;
            counter++;
          }
        });
        document.getElementById('output').innerHTML = output;
      })
      .catch(err => console.log(err))
  }

  getLegs(url) {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        let output = '';
        let counter = 1;
        data.forEach(element => {
          if (element.body_part === 'Legs') {
            // console.log(element.excercise);
            output += `<h3>Excercise: ${counter}</h3>
                     <li>${element.excercise}</li>
                     <li>${element.sets}</li>
                      `;
            counter++;
          }
        });
        document.getElementById('output').innerHTML = output;
      })
      .catch(err => console.log(err))
  }

  // Error message for invalid input
  showAlert = function (message) {
    // create div
    // const div = document.createElement('div');
    const div = document.getElementById('error');
    // add class
    // div.className = `alert ${className}`;
    // Add text
    // div.appendChild(document.createTextNode(message));
    div.innerHTML = `${message}`;
    div.style.background = 'red';
    // Get parent
    const container = document.getElementById('container');

    // get form
    const form = document.getElementById('input');

    // insert alert
    container.insertBefore(div, form);

    // Timeout after 3 sec
    setTimeout(function () {
      document.getElementById('error').remove();
    }, 3000)
  }
}

// instantiate getExcercises class
const elements = new getUIElements();

// add an event listener to the button and get the user text
document.querySelector('.btn1').addEventListener('click', () => {
  // return the text that the user inputs
  const userInput = document.getElementById('input').value;

  // chest excercises only displyed if user puts in chest into text input, make case insensitive
  if (userInput.toUpperCase() === 'chest'.toUpperCase()) {
    // right now, chest excercises added to inner html when button is pressed
    elements.getChest('excercises.json')

    // generate motivation and quote after workout is pasted
    elements.motivation();
    elements.getRandomQuote();
    // clear text box after submitting
    elements.clearField();
  } else if (userInput.toUpperCase() === 'back'.toUpperCase()) {
    // get back excercises
    elements.getBack('excercises.json');
    elements.getRandomQuote();
    elements.clearField();
  } else if (userInput.toUpperCase() === 'legs'.toUpperCase()) {
    // get leg excercises and quotes
    elements.getLegs('excercises.json');
    elements.getRandomQuote();
    elements.clearField();
  } else {
    // alert("Invalid Input");
    elements.showAlert('Invalid Input, Please try again');
  }
});
