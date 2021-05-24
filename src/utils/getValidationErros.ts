import { ValidationError } from 'yup';

interface Errors {
    [key: string]: string;
}

export default function getValidationErros(err: ValidationError): Errors {
    const validationErros: Errors = {};

    err.inner.forEach(error => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        validationErros[error.path!] = error.message;
    });
    return validationErros;
}
