import * as Yup from 'yup';


const FishRegistrationSchema =
    Yup.object({
    pittag: Yup
        .string()
        .required('A pittag é obrigatória'),
    scientificName: Yup
        .string()
        .required('O nome científico é obrigatório'),
    commonName: Yup
        .string()
        .required('O nome comum é obrigatório'),
    totalLength: Yup
        .number()
        .required('O comprimento total é obrigatório'),
    captureLocation: Yup
        .string()
        .required('A localização de captura é obrigatória'),
    releaseWeight: Yup
        .number()
        .required('O peso de soltura é obrigatório'),
    releaseDate: Yup
        .date()
        .required('A data de soltura é obrigatória'),
    releaseLocation: Yup
        .string()
        .required('O local de soltura é obrigatório'),
    standardLength: Yup
        .number()
        .required('O comprimento padrão é obrigatório'),
    dnaSample: Yup
        .string()
        .required('O código da amostra de DNA é obrigatório'),
})
export default FishRegistrationSchema;