import useHookForm from "../../compents/hooks/UseHookForm";
import { NewPass } from "../../api/api";
import { Box, Button } from "@mui/material";
import Form from "../../compents/hook-forms/Form";
import { ControlledTextField } from "../../compents/hook-forms/TextFieldForm";
import PassRegistrationSchema from "./PassRegistrationSchema";
import { toast } from "react-toastify";

const EditPass = () => {
  const initialValues = {
    registryDate: "",
    antennaId: "",
    fishId: "",
  };

  const FORM_ID = "NewPass";

  const { methods } = useHookForm(
    initialValues,
    PassRegistrationSchema,
    "onSubmit"
  );

  const handleSubmit = async (formValues) => {
    await NewPass(formValues)
      .then((response) => {
        toast.success("Passagem cadastrado com sucesso");
        methods.reset();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Erro ao cadastrar passagem");
        methods.reset();
      });
  };

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" width="100%">
      <Form id={FORM_ID} methods={methods} onSubmit={handleSubmit}>
        <ControlledTextField
          name="registryDate"
          control={methods.control}
          label="Data de Registro"
          sx={{ width: "48%", margin: "5px" }}
        />
        <ControlledTextField
          name="antennaId"
          control={methods.control}
          label="Id da Antena"
          sx={{ width: "48%", margin: "5px" }}
        />
        <ControlledTextField
          name="fishId"
          control={methods.control}
          label="Id do Peixe"
          sx={{ width: "48%", margin: "5px" }}
        />

        <Box textAlign="center">
          <Button
            variant="contained"
            type="submit"
            form={FORM_ID}
            color={"primary"}
          >
            Cadastrar
          </Button>
        </Box>
      </Form>
    </Box>
  );
};
export default EditPass;
