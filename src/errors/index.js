export class BodyGardError extends Error {
  constructor(message, status) {
    super(message)
    this.message = message
    this.status = status
  }
}

export class Unauthorized extends BodyGardError {
  constructor() {
    super('Unauthorized resource', 403)
  }
}

export class BadCredentials extends BodyGardError {
  constructor() {
    super('Bad credentials', 404)
  }
}
