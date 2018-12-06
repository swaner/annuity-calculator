/**
 * @param {number} amount - Total loan amount
 * @param {number} months - Loan period in months
 * @param {number} interestRate - Interest rate in decimal (0.02)
 * @link https://sv.wikipedia.org/wiki/Annuitetslån
 */
const annuityTable = function (amount, months, interestRate) {
    const result = [];

    let _amount = amount;
    let _months = months;

    let annuity = calculateAnnuity(_amount, _months, interestRate);
    
    for (let i = 1; i <= months; i++) {
        let interestFee = _amount * interestRate;
        let amortize = annuity - interestFee;

        result.push({
            month: i,
            loan: _amount,
            interestFee,
            amortize,
            annuity,
        });

        _amount -= amortize;
    }

    return result;
}

/**
 * @param {number} amount - Total loan amount
 * @param {number} months - Loan period in months
 * @param {number} interestRate - Interest rate in decimal (0.02)
 * @param {function} selector - Callback function that receives a table row, should return property
 */
const avgSum = function (amount, months, interestRate, selector) {
    let sum = 0;
    const table = annuityTable(amount, months, interestRate);

    table.forEach((row) => sum += selector(row));

    return sum / months;
}

/**
 * @param {number} amount - Total loan amount
 * @param {number} months - Loan period in months
 * @param {number} interestRate - Interest rate in decimal (0.02)
 */
export function calculateAnnuity(amount, months, interestRate) {
    const negNumberOfPeriods = -Math.abs(months);
    
    const annuity = (amount * interestRate)
        / (1 - (Math.pow(1 + interestRate, negNumberOfPeriods)));
        
    return Math.round(annuity);
}

/**
 * @param {number} amount - Total loan amount
 * @param {number} months - Loan period in months
 * @param {number} interestRate - Interest rate in decimal (0.02)
 */
export function calculateAvgInterestCost(amount, months, interestRate) {
    return Math.round(avgSum(amount, months, interestRate, (row) => row.interestFee));
}

/**
 * @param {number} amount - Total loan amount
 * @param {number} months - Loan period in months
 * @param {number} interestRate - Interest rate in decimal (0.02)
 */
export function calculateAvgAmortizeCost(amount, months, interestRate) {
    return Math.round(avgSum(amount, months, interestRate, (row) => row.amortize));
}

export function getAnnuityTable(amount, months, interestRate) {
    return annuityTable(amount, months, interestRate);
}