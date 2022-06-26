import * as Yup from 'yup';


const StatusRegistrationSchema =
    Yup.object({
    observations: Yup.string().required('O nome da antena é obrigatório'),
    antennaID: Yup
        .number()
        .required('O id da antena é obrigatório'),
    status: Yup
        .string()
        .required('O status da antena é obrigatório'),
    statusChangeDate: Yup
        .date()
        .required('A data de alteração do status é obrigatória'),
})
export default StatusRegistrationSchema;