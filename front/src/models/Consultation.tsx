/**
 * Consultation model.
 * This model is used to store the data of a consultation. 
 * Used in Overview page.
 */
export class Consultation {
    personName: string;
    incomes: number;
    invoices: number;
    total: number;
    constructor(personName: string, incomes: number, invoices: number, total: number) {
        this.personName = personName;
        this.incomes = incomes;
        this.invoices = invoices;
        this.total = total;
    }
}