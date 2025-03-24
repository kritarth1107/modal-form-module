export class ModalFormError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
        this.name = 'ModalFormError';
    }
}
