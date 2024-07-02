const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "=", "^", "(", ")", "π"];
let output = "";
let lastResult = ""; // Variable to store the last calculated result

// Define function to calculate based on button clicked.
const calculate = (btnValue) => {
  display.focus();
  if (btnValue === "=" && output !== "") {
    // Replace '%' with '/100' before evaluating.
    output = output.replace("%", "/100");
    // Replace '^' with '**' for exponentiation before evaluating.
    output = output.replace("^", "**");
    // Replace 'π' with 'Math.PI' before evaluating.
    output = output.replace(/π/g, "*Math.PI");
    try {
      lastResult = eval(output);
      output = lastResult.toString(); // Convert result to string for display
    } catch {
      output = "Error";
    }
  } else if (btnValue === "AC") {
    output = "";
  } else if (btnValue === "DEL") {
    // If DEL button is clicked, remove the last character from the output.
    output = output.toString().slice(0, -1);
  } else if (btnValue === "π" && output==="") {
    // If 'π' button is clicked, directly insert Math.PI into the output.
    output = 3.14;
  } else {
    // If output is empty and button is a special character (excluding brackets), do nothing.
    if (output === "" && specialChars.includes(btnValue) && btnValue !== "(" && btnValue !== ")") return;
    output += btnValue;
  }
  display.value = output;
};

// Add event listener to buttons, call calculate() on click.
buttons.forEach((button) => {
    // Button click listener calls calculate() with dataset value as argument.
    button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});

// Function to display the last calculated result
const displayLastResult = () => {
  display.value = lastResult.toString(); // Ensure last result is converted to string
};

// Example of using a button to display last result
const lastResultButton = document.getElementById("lastResultButton");
lastResultButton.addEventListener("click", displayLastResult);
