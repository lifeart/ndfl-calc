import { Component, tracked } from '@lifeart/gxt';
import { Input } from '@/components/Input';
import { TaxDetails } from '@/components/TaxDetails';
import { toRubles } from '@/utils/intl';
import { calculateTax, calculateTaxDetails } from '@/utils/tax';

const minSalary = 0;

export default class App extends Component {
  @tracked
  salary = 15_000;
  updateSalary = (e: Event) => {
    const value = (e.target as HTMLInputElement).valueAsNumber ?? minSalary;
    this.salary = Math.abs(isNaN(value) ? minSalary: value);
  };
  get netSalary() {
    return (this.salary - (this.yearlyTax / 12)).toFixed(2);
  }
  get totalNetSalary() {
    return (this.yearlySalary - this.yearlyTax).toFixed(2);
  }
  get monthlyTax() {
    return (this.yearlyTax / 12).toFixed(2);
  }
  get yearlySalary() {
    return this.salary * 12;
  }
  get yearlyTax() {
    return calculateTax(this.yearlySalary);
  }
  get details() {
    return calculateTaxDetails(this.yearlySalary);
  }
  <template>
    <section>
      <h2 class='text-orange-300' style.margin-bottom='20px'>
       НДФЛ калькулятор</h2>
      <small class='text-gray-500'>Узнайте сколько налогов вы платите с вашей зарплаты по прогрессивной шкале</small>
      <p>
        <Input 
          type="number"
          placeholder="Ваша месячная зарплата"
          min="0"
          max="3000000"
          step="1000"
          @value={{this.salary}}
          @onInput={{this.updateSalary}}
          autofocus />
      </p>
    

    <div class="text-left p-4">
  <p class="mb-2">
    <strong class="font-bold">Годовая зарплата:</strong> {{toRubles this.yearlySalary}}
  </p>
  <p class="mb-2">
    <strong class="font-bold">НДФЛ за год:</strong> {{toRubles this.yearlyTax}}
  </p>
  <p class="mb-2">
    <strong class="font-bold">НДФЛ за месяц:</strong> {{toRubles this.monthlyTax}}
  </p>
  <p class="mb-2">
    <strong class="font-bold">На руки в месяц:</strong> {{toRubles this.netSalary}}
  </p>
    <p class="mb-2">
    <strong class="font-bold">На руки за год:</strong> {{toRubles this.totalNetSalary}}
  </p>
</div>


  <TaxDetails @data={{this.details}} />

    </section>
  </template>
}
