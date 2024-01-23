let secretNumberList = [];
let numbersLimit = 100;
let secretNumber = createRandomNumber();
let userAttempts = 1;

function textEditor(tag, text) {
    let field = document.querySelector(tag);
    field.innerHTML = text;
    responsiveVoice.speak(text, 'Brazilian Portuguese Female', {rate:1.2});
}

function welcomeMessage() {
    textEditor('h1', 'Bem-vindo ao jogo!');
    textEditor('p', 'Escolha um número de 1 a 100');
}

function clearField() {
    attempt = document.querySelector('input');
    attempt.value = '';
}

function verifyAttempt() {
    let attempt = document.querySelector('input').value;
    
    if (attempt == secretNumber) {
        let wordAttempts = userAttempts > 1 ? 'tentativas' : 'tentativa';
        textEditor('h1', 'Parabéns');
        textEditor('p', `Você descobriu o número com ${userAttempts} ${wordAttempts}!`);
        document.getElementById('reset').removeAttribute('disabled');
        document.getElementById('try').setAttribute('disabled', true)
    } else {
        if (attempt > secretNumber) {
            textEditor('p', `O número é menor que ${attempt}.`);
        } else {
            textEditor('p', `O número é maior que ${attempt}.`);
        }
        userAttempts++;
        clearField();
    }
}

function createRandomNumber() {
    let chosenNumber = parseInt(Math.random() * numbersLimit + 1);
    let elementsInList = secretNumberList.length;

    if (elementsInList == numbersLimit) {
        secretNumberList = [];
    }

    if (secretNumberList.includes(chosenNumber)) {
        return createRandomNumber();
    } else {
        secretNumberList.push(chosenNumber);
        return chosenNumber;
    }
}

function resetGame() {
    secretNumber = createRandomNumber();
    clearField();
    userAttempts = 1;
    welcomeMessage();
    document.getElementById('reset').setAttribute('disabled', true);
    document.getElementById('try').removeAttribute('disabled');
}

welcomeMessage();
