// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')

const suppliesPerCup = {
    'espresso': {
        'water': 250,
        'milk': 0,
        'coffee beans': 16,
        'disposable cups': 1,
        'USD': -4,
    },
    'espresso dopio': {
        'water': 350,
        'milk': 0,
        'coffee beans': 16,
        'disposable cups': 2,
        'USD': -4,
    },
    'latte': {
        'water': 350,
        'milk': 75,
        'coffee beans': 20,
        'disposable cups': 1,
        'USD': -7,
    },
    'cappuccino': {
        'water': 200,
        'milk': 100,
        'coffee beans': 12,
        'disposable cups': 1,
        'USD': -6,
    }
}

let currentSupplies = {
    'water': 400,
    'milk': 540,
    'coffee beans': 120,
    'disposable cups': 9,
    'USD': 550,
}

function fill() {
    let msg = (UOM, UNIT) => `Write how many ${UOM} of ${UNIT} you want to add:\n`
    currentSupplies['water'] += Number(input(msg('ml', 'water')))
    currentSupplies['milk'] += Number(input(msg('ml', 'milk')))
    currentSupplies['coffee beans'] += Number(input(msg('grams', 'coffee beans')))
    currentSupplies['disposable cups'] += Number(input('Write how many disposable cups you want to add:\n'))
}

function showCurrentSupplies() {
    console.log(`The coffee machine has:
${currentSupplies['water']} ml of water
${currentSupplies['milk']} ml of milk
${currentSupplies['coffee beans']} g of coffee beans
${currentSupplies['disposable cups']} disposable cups
$${currentSupplies['USD']} of money`)
}

const withdrawCash = function () {
    console.log(`I gave you $${currentSupplies['USD']}`);
    currentSupplies['USD'] = 0;
}

function buy() {
    function hasSuppliesFor(beverage) {
        for (let ingredient in currentSupplies) {
            if (ingredient === 'USD') {
                continue;
            }
            if (currentSupplies[ingredient] < suppliesPerCup[beverage][ingredient]) {
                console.log(`Sorry, not enough ${ingredient}!`);
                return main();
            }
        }
        console.log('I have enough resources, making you a coffee!');
        return 1
    }

    function brewCoffee(coffee) {
        for (let ingredient in currentSupplies) {
            currentSupplies[ingredient] -= suppliesPerCup[coffee][ingredient];
        }
    }

    let beverages = {
        1: 'espresso', 2: 'latte', 3: 'cappuccino', 4: 'espresso dopio'
    }
    let option = input('What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, 4 - espresso dopio, back - to main menu:\n');
    if (option === 'back') {
        return main()
    }

    let beverage = beverages[option];
    if (hasSuppliesFor(beverage)) {
        brewCoffee(beverage);
    }

}

function chooseAction() {
    while (true) {
        switch (input('Write action (buy, fill, take, remaining, exit):\n')) {
            case 'buy':
                buy();
                break;
            case 'fill':
                fill();
                break;
            case 'take':
                withdrawCash();
                break;
            case 'remaining':
                showCurrentSupplies();
                break;
            case 'exit':
                process.exit();
                break;
            default:
                console.log('Invalid input');
                return chooseAction();
        }
    }
}

function main() {
    chooseAction();
}
main();
