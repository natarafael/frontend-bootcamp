import useHookForm from "../../compents/hooks/UseHookForm";
import { NewPass } from "../../api/api";
import {Box, Button, Typography} from "@mui/material";
import Form from "../../compents/hook-forms/Form";
import { ControlledTextField } from "../../compents/hook-forms/TextFieldForm";
import PassRegistrationSchema from "./PassRegistrationSchema";
import { toast } from "react-toastify";
import Flatpickr from "react-flatpickr";
import{useState} from 'react'

const EditPass = () => {
  const initialValues = {
    registryDate: "",
    antennaId: "",
    fishId: "",
  };
  const [date, setDate] = useState(new Date("2022-06-28T02:45:00.000"));

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
        <Typography marginLeft={1}>
          Data de Registro
        </Typography>
        <Flatpickr
            data-enable-time
            defaultValue={"2022-06-12T00:00:00.000Z"}
            value={date}
            onChange={() => {
              setDate(date)
              methods.setValue("registryDate", date);
            }}
            style={{ width: "46%", margin: "3px", height: "52px", marginTop: "5px", backgroundColor: "#BDE0FE", border: "1px solid #768C9F", borderRadius: "5px", paddingLeft: "15px" }}
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
