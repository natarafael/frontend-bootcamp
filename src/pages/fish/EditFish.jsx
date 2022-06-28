import React from "react";
import useHookForm from "../../compents/hooks/UseHookForm";
import { NewFish } from "../../api/api";
import {Box, Button, Switch, TextField, Typography} from "@mui/material";
import Form from "../../compents/hook-forms/Form";
import { ControlledTextField } from "../../compents/hook-forms/TextFieldForm";
import { useState } from "react";
import FishRegistrationSchema from "./FishRegistrationSchema";
import { toast } from "react-toastify";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

const EditFish = () => {
  const initialValues = {
    pittag: "",
    scientificName: "",
    commonName: "",
    totalLength: "",
    captureLocation: "",
    releaseWeight: "",
    releaseDate: "",
    releaseLocation: "",
    standardLength: "",
    dnaSample: "",
    recapture: false,
  };
  const [checked, setChecked] = useState(false);
  const [date, setDate] = React.useState(new Date("2022-06-28T02:45:00.000"));

  const FORM_ID = "NewFish";

  const { methods } = useHookForm(
    initialValues,
    FishRegistrationSchema,
    "onSubmit"
  );

  const handleSubmit = async (formValues) => {
    console.log(formValues);
    await NewFish(formValues)
      .then((response) => {
        toast.success("Status cadastrado com sucesso");
        methods.reset();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Falha ao cadastrar status");
        methods.reset();
      });
  };

  return (
    <>
      <Box display="flex" flexDirection="row" flexWrap="wrap" width="100%">
        <Form id={FORM_ID} methods={methods} onSubmit={handleSubmit}>
          <ControlledTextField
            name="pittag"
            control={methods.control}
            label="Pittag"
            sx={{ width: "48%", margin: "5px" }}
          />
          <ControlledTextField
            name="scientificName"
            control={methods.control}
            label="Nome Científico"
            sx={{ width: "48%", margin: "5px" }}
          />
          <ControlledTextField
            name="commonName"
            control={methods.control}
            label="Nome Comum"
            sx={{ width: "48%", margin: "5px" }}
          />
          <ControlledTextField
            name="totalLength"
            control={methods.control}
            label="Comprimento Total (cm)"
            sx={{ width: "48%", margin: "5px" }}
          />
          <ControlledTextField
            name="captureLocation"
            control={methods.control}
            label="Local de captura"
            sx={{ width: "48%", margin: "5px" }}
          />
          <ControlledTextField
            name="releaseWeight"
            control={methods.control}
            label="Peso de soltura (g)"
            sx={{ width: "48%", margin: "5px" }}
          />
          {/*<ControlledTextField*/}
          {/*  name="releaseDate"*/}
          {/*  control={methods.control}*/}
          {/*  label="Data de soltura"*/}
          {/*  sx={{ width: "48%", margin: "5px" }}*/}
          {/*/>*/}
          <ControlledTextField
            name="releaseLocation"
            control={methods.control}
            label="Local de soltura"
            sx={{ width: "48%", margin: "5px" }}
          />
          <ControlledTextField
            name="standardLength"
            control={methods.control}
            label="Comprimento Padrão (cm)"
            sx={{ width: "48%", margin: "5px" }}
          />
          <ControlledTextField
            name="dnaSample"
            control={methods.control}
            label="Código da amostra de DNA"
            sx={{ width: "48%", margin: "5px" }}
          />
          <Box display="flex" flexDirection="column" flexWrap="wrap" >
            <Typography marginLeft={1}>
              Data de soltura
            </Typography>
            <Flatpickr
                data-enable-time
                defaultValue={"2022-06-12T00:00:00.000Z"}
                value={date}
                onChange={() => {
                  setDate(date)
                  methods.setValue("releaseDate", date);
                }}
                style={{ width: "46%", margin: "3px", height: "52px", marginTop: "5px", backgroundColor: "#BDE0FE", border: "1px solid #768C9F", borderRadius: "5px", paddingLeft: "15px" }}
            />
          </Box>
          <Typography variant="inherit" p={2}>
            Recaptura?
            <Switch
              checked={checked}
              onChange={() => {
                setChecked(!checked);
                methods.setValue("recapture", !checked);
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Typography>

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
    </>
  );
};
export default EditFish;
