import useHookForm from "../../compents/hooks/UseHookForm";
import {NewAntenna} from "../../api/api";
import {Box, Button} from "@mui/material";
import Form from "../../compents/hook-forms/Form";
import {ControlledTextField} from "../../compents/hook-forms/TextFieldForm";
import AntennaRegistrationSchema from "./AntennaRegistrationSchema";
import {toast} from "react-toastify";

const EditAntenna = () => {

    const initialValues = {
        latitude:"",
        longitude:"",
        installationDate:"",
        uninstallDate:"",
    }

    const FORM_ID = "NewAntenna";

    const {methods} = useHookForm(
        initialValues,
        AntennaRegistrationSchema,
        'onSubmit');


    const handleSubmit = async (formValues) => {
        await NewAntenna(formValues)
            .then(response => {
                toast.success("Antena cadastrado com sucesso");
                methods.reset();
            }).catch(error => {
                console.log(error);
                toast.error("Falha ao cadastrar Antena");
                methods.reset();
            });
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
                <ControlledTextField
                    name="uninstallDate"
                    control={methods.control}
                    label="Data de desativação"
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

