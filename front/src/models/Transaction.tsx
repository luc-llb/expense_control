/**
 * Transaction model
 */
export class Transaction {
    id: number;
    description: string;
    value: number;
    type: number;
    personId: number;
    constructor(id: number, description: string, value: number, type: number, personId: number) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.type = type;
        this.personId = personId;
    }
}