function getUserInput() {
    let firstName = cleanString(document.getElementById('FirstName').value.toUpperCase().trim());
    let middleName = cleanString(document.getElementById('MiddleName').value.toUpperCase().trim());
    let lastName = cleanString(document.getElementById('LastName').value.toUpperCase().trim());
    let dateOfBirth = document.getElementById('DatePicker').value;
    let gender = document.getElementById('Gender').value.toLowerCase().trim();

    if (!firstName || !lastName || !dateOfBirth || !gender) {
        alert("Please make sure that you have entered a First Name, Last Name, and DOB.");
        document.getElementById('OutputField').value = "";
        return;
    }

    // Extract date components correctly
    let dateParts = dateOfBirth.split('-'); 
    let birthYear = dateParts[0].charAt(2);  // Extract last 2 digits of YYYY (Correct Fix!)
    let birthMonth = parseInt(dateParts[1], 10);
    let birthDay = dateParts[2];
    let yearDigit = dateParts[0].charAt(3);  // Extract 3rd digit of birth year

    // Adjust birth month for females
    if (gender === 'f') {
        birthMonth += 50;
    }

    // Surname processing: First 5 letters, pad with 9s if needed
    let first = lastName.startsWith("MAC") ? 'MC' + lastName.slice(3, 6) : lastName.slice(0, 5);
    first = first.padEnd(5, '9');

    // Handle initials: First letter of first name + middle name (or 9 if no middle name)
    let initials = firstName.charAt(0) + (middleName ? middleName.charAt(0) : '9');

    // Extract additional surname-based characters
    let eighthChar1 = lastName.length > 1 ? lastName.substr(1, 1) : '9';
    let eighthChar2 = lastName.length > 0 ? lastName.substr(0, 1) : '9';

    // Construct the full driving licence number
    let generatedLicenceNumber = `${first}${birthYear}${birthMonth.toString().padStart(2, '0')}${birthDay}${yearDigit}${initials}9${eighthChar1}${eighthChar2}`;

    document.getElementById('OutputField').value = generatedLicenceNumber;
}

function cleanString(str) {
    return str.normalize("NFD") // Decompose characters into base + diacritics
              .replace(/[^A-Z]/g, ""); // Remove non-alphabetic characters
}

function copyInput() {
    let outputField = document.getElementById('OutputField');
    let originalValue = outputField.value;
    let originalColor = outputField.style.color;

    // Copy to clipboard
    navigator.clipboard.writeText(originalValue).then(() => {
        // Temporarily change the value and color
        outputField.value = "Copied to clipboard";
        outputField.style.color = "grey";

        // Restore after 1 second
        setTimeout(() => {
            outputField.value = originalValue;
            outputField.style.color = originalColor;
        }, 700);
    }).catch(err => {
        console.error("Failed to copy: ", err);
    });
}

function generateRandomDetails() {
    let firstNamesGendersArray = [
        {name: 'Alexander', gender: 'm'}, {name: 'Andrew', gender: 'm'}, {name: 'Angela', gender: 'f'},
        {name: 'Benjamin', gender: 'm'}, {name: 'Beth', gender: 'f'}, {name: 'Carl', gender: 'm'},
        {name: 'Clarissa', gender: 'f'}, {name: 'Callum', gender: 'm'}, {name: 'Demitri', gender: 'm'},
        {name: 'Dianne', gender: 'f'}, {name: 'Evan', gender: 'm'}, {name: 'Eugenie', gender: 'f'},
        {name: 'Frankie', gender: 'm'}, {name: 'Florence', gender: 'f'}, {name: 'Gary', gender: 'm'},
        {name: 'Gloria', gender: 'f'}, {name: 'Henry', gender: 'm'}, {name: 'Henrietta', gender: 'f'},
        {name: 'Ian', gender: 'm'}, {name: 'Isabelle', gender: 'f'}, {name: 'Jamie', gender: 'm'},
        {name: 'Jasmine', gender: 'f'}, {name: 'Karl', gender: 'm'}, {name: 'Karen', gender: 'f'},
        {name: 'Luke', gender: 'm'}, {name: 'Lisa', gender: 'f'}, {name: 'Marcus', gender: 'm'},
        {name: 'Maria', gender: 'f'}, {name: 'Nigel', gender: 'm'}, {name: 'Norma', gender: 'f'},
        {name: 'Oliver', gender: 'm'}, {name: 'Olivia', gender: 'f'}, {name: 'Peter', gender: 'm'},
        {name: 'Pauline', gender: 'f'}, {name: 'Quentin', gender: 'm'}, {name: 'Queenie', gender: 'f'},
        {name: 'Roger', gender: 'm'}, {name: 'Rebecca', gender: 'f'}, {name: 'Rowan', gender: 'm'},
        {name: 'Stephen', gender: 'm'}, {name: 'Samantha', gender: 'f'}, {name: 'Thomas', gender: 'm'},
        {name: 'Toni', gender: 'f'}, {name: 'Uriah', gender: 'm'}, {name: 'Ursula', gender: 'f'},
        {name: 'Victor', gender: 'm'}, {name: 'Victoria', gender: 'f'}, {name: 'William', gender: 'm'},
        {name: 'Wendy', gender: 'f'}, {name: 'Xander', gender: 'm'}, {name: 'Xena', gender: 'f'},
        {name: 'Yannick', gender: 'm'}, {name: 'Yvonne', gender: 'f'}, {name: 'Zachary', gender: 'm'},
        {name: 'Zoe', gender: 'f'},
    ];

    let firstNameRand = firstNamesGendersArray[Math.floor(Math.random() * firstNamesGendersArray.length)];
    document.getElementById('FirstName').value = firstNameRand.name;
    document.getElementById('Gender').value = firstNameRand.gender;

    let lastNamesArray = ["Hill", "Smith", "Jones", "Ballantyne", "Taylor", "Rogers", "Rowley", "Chetwynd", "Steer",
        "Walker", "Embury", "Dorian", "Tate", "Richter", "Arnalds", "Garland", "Owen", "Croft", "Auditore", "Bell",
        "Bonair", "Messenger", "Nobakov", "Orwell", "LaVey", "Manson", "Fish", "Kurten", "Jackson", "Ford", "King",
        "Potter", "Palin"
    ];
    let lastNameRand = lastNamesArray[Math.floor(Math.random() * lastNamesArray.length)];
    document.getElementById("LastName").value = lastNameRand;

    let middleNamesArray = ["James", "Lee", "John", "Grace", "Rose", "Marie", "Ann", "Paul", "Joseph", "Kate"];
    let middleNameRand = Math.random() < 0.5 ? middleNamesArray[Math.floor(Math.random() * middleNamesArray.length)] : "";
    document.getElementById("MiddleName").value = middleNameRand;

    let yearRand = Math.floor(Math.random() * (2003 - 1945 + 1)) + 1945;
    let yearStr = yearRand.toString();

    let monthRand = Math.floor(Math.random() * (12 - 1 + 1)) + 1;
    let monthStr = monthRand.toString().padStart(2, '0');

    let dayRand = Math.floor(Math.random() * (28 - 1 + 1)) + 1;
    let dayStr = dayRand.toString().padStart(2, '0');

    let dateOfBirthRand = `${yearStr}-${monthStr}-${dayStr}`;
    document.getElementById('DatePicker').value = dateOfBirthRand;
}