export enum AuthorizationOptions {
  NAME_LENGTH = 20,
  PASSWORD_LENGTH = 8,
}

export const EMAIL_VALIDATION =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export enum PaginationOptions {
  dots = "...",
}

export enum INDICATORS {
  alive = "Alive",
  dead = "Dead",
  unknown = "unknown",
}
