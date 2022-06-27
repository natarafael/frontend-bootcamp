import * as Yup from "yup";

export const FishSearchSchema = Yup.object({
    filteredBy: Yup.string().required("Obrigatório"),
    field: Yup.string().required("Obrigatório"),
});