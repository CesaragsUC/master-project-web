import { FormGroup } from '@angular/forms';

export class GenericValidator {

    constructor(private validationMessages: ValidationMessages) { }

    processMesages(container: FormGroup): { [key: string]: string } {

        let messages: { [key: string]: string } = {};

        for (let controlKey in container.controls) {

             // verifica se a propriedade é do objeto e não veio por herança
            if (container.controls.hasOwnProperty(controlKey)) {

                // pega o controle do formulário
                let c = container.controls[controlKey];

                if (c instanceof FormGroup) {

                    let childMessages = this.processMesages(c);
                    
                    // Object.assign() é usado para copiar os valores de todas as propriedades próprias enumeráveis de um ou mais objetos de origem para um objeto destino. Ele retorna o objeto destino.
                    Object.assign(messages, childMessages);

                } else {
                    if (this.validationMessages[controlKey]) {

                        messages[controlKey] = '';

                        if ((c.dirty || c.touched) && c.errors) {

                            Object.keys(c.errors).map(messageKey => {

                                if (this.validationMessages[controlKey][messageKey]) {
                                    
                                    // concatena as mensagens de erro
                                    messages[controlKey] += this.validationMessages[controlKey][messageKey] + '<br />';
                                }
                            });
                        }
                    }
                }
            }
        }
        return messages;
    }
}

// Interface que contém as mensagens de validação
export interface DisplayMessage {
    [key: string]: string
}

// Interface que contém  os tipos de validação. ex: required, minlength, maxlength
export interface ValidationMessages {
    [key: string]: { [key: string]: string } 
}
