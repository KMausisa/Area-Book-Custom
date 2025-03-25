export class Person {
  constructor(
    public id: string,
    public name: string,
    public age: number,
    public address: string,
    public phone: string,
    public email: string,
    public notes: string,
    public household: Person[] | null
  ) {}
}
