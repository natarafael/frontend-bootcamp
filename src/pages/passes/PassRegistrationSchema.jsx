import * as Yup from "yup";

const PassRegistrationSchema = Yup.object({
  registryDate: Yup.date().required("A Data de Registro é obrigatória"),
  antennaId: Yup.number().required("O Id da Antena é obrigatório"),
  fishId: Yup.number().required("O Id do Peixe é obrigatório"),
});
export default PassRegistrationSchema;
