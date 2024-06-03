import { toRubles } from "./intl";

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


interface TaxDetails {
    bracket: string;
    amount: number;
    tax: number;
}

export function calculateTaxDetails(income: number): TaxDetails[] {
    const details: TaxDetails[] = [];

    if (income <= baseIncomeLimit) {
        details.push({
            bracket: `До ${toRubles(baseIncomeLimit)}`,
            amount: income,
            tax: income * baseRate
        });
        return details;
    }

    details.push({
        bracket: `До ${toRubles(baseIncomeLimit)}`,
        amount: baseIncomeLimit,
        tax: baseIncomeLimit * baseRate
    });

    let remainingIncome = income - baseIncomeLimit;
    for (const bracket of taxBrackets) {
        if (remainingIncome > 0) {
            const taxableIncome = Math.min(remainingIncome, bracket.max - bracket.min);
            details.push({
                bracket: `${bracket.min} - ${bracket.max === Infinity ? "бесконечность" : bracket.max} руб`,
                amount: taxableIncome,
                tax: taxableIncome * bracket.rate
            });
            remainingIncome -= taxableIncome;
        } else {
            break;
        }
    }
    
    return details;
}