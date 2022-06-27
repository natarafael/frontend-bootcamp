import useHookForm from "../../compents/hooks/UseHookForm";
import { GetFishById,NewFish } from "../../api/api";
import { Box, Button, Switch, Typography } from "@mui/material";
import Form from "../../compents/hook-forms/Form";
import { ControlledTextField } from "../../compents/hook-forms/TextFieldForm";
import { useEffect,useState } from "react";
import FishRegistrationSchema from "./FishRegistrationSchema";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { updateFish } from "../../api/api";

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
  const [idEdit, setIdEdit] = useState(null);
  const location = useLocation();

  const FORM_ID = "NewFish";

  const { methods } = useHookForm(
    initialValues,
    FishRegistrationSchema,
    "onSubmit"
  );

  const handleSubmit = async (formValues) => {
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

  const handleUpdate = async (id, formValues) => {
    console.log(id);
    // await updateFish(id, formValues)
    //   .then((response) => {
    //     console.log(response.data);
    //     toast.success("Peixe atualizado com sucesso");
    //     methods.reset();
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     toast.error("Falha ao atualizar peixe");
    //     methods.reset();
    //   });
  };

  useEffect(() => {
    if (location.state) {
      console.log(location.state.id);
      setIdEdit(location.state.id);

      const fetchFishById = async () => {
        await GetFishById(location.state.id)
          .then((response) => {
            console.log(response.data);
            methods.setValue("pittag", response.data.pittag);
            methods.setValue("scientificName", response.data.scientificName);
            methods.setValue("commonName", response.data.commonName);
            methods.setValue("totalLength", response.data.totalLength);
            methods.setValue("captureLocation", response.data.captureLocation);
            methods.setValue("releaseWeight", response.data.releaseWeight);
            methods.setValue("releaseDate", response.data.releaseDate);
            methods.setValue("releaseLocation", response.data.releaseLocation);
            methods.setValue("standardLength", response.data.standardLength);
            methods.setValue("dnaSample", response.data.dnaSample);
            methods.setValue("recapture", response.data.recapture);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      fetchFishById();
    }
  }, [location.state]);return (
    <>
      <Box display="flex" flexDirection="row" flexWrap="wrap" width="100%">
        <Form id={FORM_ID} methods={methods} onSubmit={idEdit ? handleUpdate :handleSubmit}
  >        <ControlledTextField
            name="pittag"
            control={methods.control}
            label="Pittag"disabled={idEdit ? true : false}
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
          <ControlledTextField
            name="releaseDate"
            control={methods.control}
            label="Data de soltura"
            sx={{ width: "48%", margin: "5px" }}
          />
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
  );
};
export default EditFish;
