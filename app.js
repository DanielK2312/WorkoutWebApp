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
        "x-rapidapi-key": "da218c5424mshceb3831c457b02bp13f634jsn3accf1324c16",
        "x-rapidapi-host": "andruxnet-random-famous-quotes.p.rapidapi.com"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        let output = '';
        data.forEach(element => {
          // console.log(element.quote);
          output += `<h5>${element.quote}</h5>`;
        });
        // dynamically add quotes to html doc
        document.getElementById('quote').innerHTML = output;
        document.getElementById('word-container').style.width = '300px';
        document.getElementById('word-container').style.border = '15px solid';
        document.getElementById('word-container').style.padding = '50px';
        document.getElementById('word-container').style.margin = '20px';
        document.getElementById('word-container').style.float = 'right';
        document.getElementById('word-container').style.marginTop = '-300px';
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
  } else {
    // eventually want to change this, alerts are oogly
    alert("Invalid Input");
  }
})
