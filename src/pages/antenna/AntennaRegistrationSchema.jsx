import * as Yup from 'yup';


const AntennaRegistrationSchema =
    Yup.object({
    latitude: Yup
    .string()
    .required('A latitude é obrigatória'),
    longitude: Yup
        .string()
        .required('A longitude é obrigatório'),
    installationDate: Yup
        .date()
        .required('A data de instalação é obriatória'),
    uninstallDate: Yup
        .string()
})
export default AntennaRegistrationSchema;