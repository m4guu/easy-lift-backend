abstract class DomainError extends Error {
  protected constructor(
    readonly message: string,
    readonly code: number,
    readonly id: string,
  ) {
    super(message);
  }

  toJSON() {
    return {
      message: this.message,
      id: this.id,
      code: this.code,
    };
  }
}

export default DomainError;
