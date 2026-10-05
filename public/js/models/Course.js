export class Course {
  constructor(data) {
    Object.assign(this, data);
  }

  get displayName() {
    return `${this.code} · ${this.description}`;
  }
}
