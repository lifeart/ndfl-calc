import { Component } from '@lifeart/gxt';
import { toRubles } from '@/utils/intl';
export class TaxDetails extends Component {
  <template>
    <div class='p-4'>
      <h2 class='text-xl font-bold mb-4'>Детали налогообложения</h2>
      <table class='min-w-full'>
        <thead>
          <tr>
            <th class='py-2 px-4 text-left'>Уровень налогообложения</th>
            <th class='py-2 px-4 text-left'>Сумма (руб)</th>
            <th class='py-2 px-4 text-left'>Налог (руб)</th>
          </tr>
        </thead>
        <tbody>
          {{#each @data as |details|}}
            <tr class='border-t'>
              <td class='py-2 px-4 text-left'>{{details.bracket}}</td>
              <td class='py-2 px-4'>{{toRubles details.amount}}</td>
              <td class='py-2 px-4'>{{toRubles details.tax}}</td>
            </tr>
          {{/each}}
        </tbody>
      </table>
    </div>
  </template>
}
