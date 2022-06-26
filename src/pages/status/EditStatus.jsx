import useHookForm from "../../compents/hooks/UseHookForm";
import {NewStatus} from "../../api/api";
import {Box, Button} from "@mui/material";
import Form from "../../compents/hook-forms/Form";
import {ControlledTextField} from "../../compents/hook-forms/TextFieldForm";
import StatusRegistrationSchema from "./StatusRegistrationSchema";
import {toast} from "react-toastify";

const EditStatus = () => {

    const initialValues = {
        observations:"",
        antennaID:"",
        status:"",
        statusChangeDate:"",
    }

    const FORM_ID = "NewStatus";

    const {methods} = useHookForm(
        initialValues,
        StatusRegistrationSchema,
        'onSubmit');


    const handleSubmit = async (formValues) => {
            console.log(formValues);
             await NewStatus(formValues)
                 .then(response => {
                     console.log(response.data);
                     toast.success("Status cadastrado com sucesso");
                        methods.reset();
                 }).catch(error => {
                     console.log(error);
                        toast.error("Falha ao cadastrar status");
                        methods.reset();
                 });
    };

    return (
        <Box display="flex" flexDirection="row" flexWrap="wrap" width="100%" >
            <Form id={FORM_ID} methods={methods} onSubmit={handleSubmit} >

                    <ControlledTextField
                        name="observations"
                        control={methods.control}
                        label="Nome da antena"
                        sx={{width: "48%", margin:'5px'}}
                    />
                    <ControlledTextField
                        name="antennaID"
                        control={methods.control}
                        label="Id da antena"
                        sx={{width: "48%", margin:"5px"}}
                    />
                    <ControlledTextField
                        name="status"
                        control={methods.control}
                        label="Status da antena"
                        sx={{width: "48%", margin:"5px"}}
                    />
                      <ControlledTextField
                        name="statusChangeDate"
                        control={methods.control}
                        label="Data de alteração do status"
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
export default EditStatus;

