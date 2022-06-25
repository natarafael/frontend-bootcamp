import useHookForm from "../../compents/hooks/UseHookForm";
import {NewAntenna} from "../../api/api";
import {Box, Button, Switch, Typography} from "@mui/material";
import Form from "../../compents/hook-forms/Form";
import {ControlledTextField} from "../../compents/hook-forms/TextFieldForm";
import {useState} from "react";
import AntennaRegistrationSchema from "./AntennaRegistrationSchema";

const EditAntenna = () => {

    const initialValues = {
        latitude:"",
        longitude:"",
        installationDate:"",
        uninstallDate:"",
    }
    const [checked, setChecked] = useState(false);

    const FORM_ID = "NewAntenna";

    const {methods} = useHookForm(
        initialValues,
        AntennaRegistrationSchema,
        'onSubmit');


    const handleSubmit = async (formValues) => {
        try {
            console.log(formValues);
             await NewAntenna(formValues).then(response => console.log(response.data)).catch(error => console.log(error));
            //toast.success("Antena cadastrada com sucesso");
            console.log("Ok")
            methods.reset();
        } catch {
           // toast.error("Falha ao cadastrar antena");
            console.log("Erro")
            methods.reset();
        }
    };

    return (
        <Box display="flex" flexDirection="row" flexWrap="wrap" width="100%" >
            <Form id={FORM_ID} methods={methods} onSubmit={handleSubmit} >

                    <ControlledTextField
                        name="latitude"
                        control={methods.control}
                        label="Latitude"
                        sx={{width: "48%", margin:'5px'}}
                    />
                    <ControlledTextField
                        name="longitude"
                        control={methods.control}
                        label="Longitude"
                        sx={{width: "48%", margin:"5px"}}
                    />
                    <ControlledTextField
                        name="installationDate"
                        control={methods.control}
                        label="Data de instalação"
                        sx={{width: "48%", margin:"5px"}}
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
    )
}
export default EditAntenna;

