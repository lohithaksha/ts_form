// FormValidator.ts
export interface FormValues {
  username: string;
  password: string;
}

export class FormValidator {
  public validate(values: FormValues): boolean {
    if (!values.username.trim() || !values.password.trim()) {
      return false;
    }
    return true;
  }
}
