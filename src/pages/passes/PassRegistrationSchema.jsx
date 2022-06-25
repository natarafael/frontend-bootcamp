import * as Yup from 'yup';


const PassRegistrationSchema =
    Yup.object({
    registryDate: Yup
        .date()
        .required('A Data de Registro é obrigatória'),
    antennaIdentifier: Yup
        .number()
        .required('O Id da Antena é obrigatório'),
    fishIdentifier: Yup
        .number()
        .required('O Id do Peixe é obrigatório'),

})
export default PassRegistrationSchema;