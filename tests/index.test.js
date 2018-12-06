import { 
    calculateAnnuity,
    calculateAvgAmortizeCost,
    calculateAvgInterestCost,
    getAnnuityTable
} from '../src/index';

test('a loan of 75000 with an interest of 2% with a repayment time of 12 months should have a annuity of 7092 kr', () => {
    const result = calculateAnnuity(75000, 12, 0.02);
    
    expect(result)
        .toBe(7092);
});

test('a loan of 75000 with an interest of 2% with a repayment time of 12 months should have an average interest cost of 842 kr', () => {
    const result = calculateAvgInterestCost(75000, 12, 0.02);
    
    expect(result)
        .toBe(842);
})

test('a loan of 75000 with an interest of 2% with a repayment time of 12 months should have an average amortize cost of 6251 kr', () => {
    const result = calculateAvgAmortizeCost(75000, 12, 0.02);
    
    expect(result)
        .toBe(6250);
})

test('a loan of 12000 with an interest of 2% with a repayment time of 12 months should have an average amortize cost of 1000 kr', () => {
    const result = calculateAvgAmortizeCost(12000, 12, 0.02);
    expect(result)
        .toBe(1000);
});

test('in a annutity table first month should be calculated from the total amount', () => {
    const result = getAnnuityTable(12000, 12, 0.02);
    expect(result.length)
        .toBe(12);

    expect(result[0].interestFee)
        .toBe(Math.round(12000 * 0.02));
});