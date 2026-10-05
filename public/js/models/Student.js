export class Student {
  constructor(data) {
    Object.assign(this, data);
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
