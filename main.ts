// main.ts
import { FormValues, FormValidator } from './FormValidator';
import { sampleData } from './SampleData';

class Controller {
  private validator: FormValidator;

  constructor(private view: View) {
    this.validator = new FormValidator();
    this.view.bindSubmit(this.handleSubmit.bind(this));
    this.view.bindPasswordClick(this.handlePasswordClick.bind(this));
  }

  private handleSubmit(values: FormValues) {
    const isValid = this.validator.validate(values);

    if (isValid) {
      const found = sampleData.some(sample => sample.username === values.username && sample.password === values.password);
      if (found) {
        this.view.showSuccessMessage();
      } else {
        this.view.showErrorMessage("Invalid username or password");
      }
    } else {
      this.view.showErrorMessage("Please fill out all fields");
    }
  }

  private handlePasswordClick() {
    alert("Please enter your password");
  }
}

class View {
  private form: HTMLFormElement;
  private usernameInput: HTMLInputElement;
  private passwordInput: HTMLInputElement;
  private errorContainer: HTMLDivElement;

  constructor() {
    this.form = document.getElementById("registrationForm") as HTMLFormElement;
    this.usernameInput = document.getElementById("username") as HTMLInputElement;
    this.passwordInput = document.getElementById("password") as HTMLInputElement;
    this.errorContainer = document.getElementById("errorContainer") as HTMLDivElement;
  }

  public bindSubmit(handler: (values: FormValues) => void) {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const values: FormValues = {
        username: this.usernameInput.value.trim(),
        password: this.passwordInput.value.trim(),
      };
      handler(values);
    });
  }

  public bindPasswordClick(handler: () => void) {
    this.passwordInput.addEventListener("click", handler);
  }

  public showErrorMessage(message: string) {
    this.errorContainer.textContent = message;
  }

  public showSuccessMessage() {
    alert("Login successful!");
    this.form.reset();
  }
}

const view = new View();
const controller = new Controller(view);
