type IncomeRange = {
    min: number;
    max: number;
    rate: number;
};

const taxBrackets: IncomeRange[] = [
    { min: 2400000, max: 5000000, rate: 0.15 },
    { min: 5000000, max: 20000000, rate: 0.18 },
    { min: 20000000, max: 50000000, rate: 0.20 },
    { min: 50000000, max: Infinity, rate: 0.22 }
];

const baseRate = 0.13;
const baseIncomeLimit = 2400000;

export function calculateTax(income: number): number {
    if (income <= baseIncomeLimit) {
        return income * baseRate;
    }

    let tax = baseIncomeLimit * baseRate;
    for (const bracket of taxBrackets) {
        if (income > bracket.min) {
            const taxableIncome = Math.min(income, bracket.max) - bracket.min;
            tax += taxableIncome * bracket.rate;
        } else {
            break;
        }
    }
    
    return tax;
}
