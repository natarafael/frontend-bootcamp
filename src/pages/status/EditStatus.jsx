import useHookForm from "../../compents/hooks/UseHookForm";
import {NewStatus} from "../../api/api";
import {Box, Button, Switch, Typography} from "@mui/material";
import Form from "../../compents/hook-forms/Form";
import {ControlledTextField} from "../../compents/hook-forms/TextFieldForm";
import {useState} from "react";
import StatusRegistrationSchema from "./StatusRegistrationSchema";

const EditStatus = () => {

    const initialValues = {
        observations:"",
        antennaIdentifier:"",
        status:"",
        statusChangeDate:"",
    }
    const [checked, setChecked] = useState(false);

    const FORM_ID = "NewStatus";

    const {methods} = useHookForm(
        initialValues,
        StatusRegistrationSchema,
        'onSubmit');


    const handleSubmit = async (formValues) => {
        try {
            console.log(formValues);
             await NewStatus(formValues).then(response => console.log(response.data)).catch(error => console.log(error));
            //toast.success("Status de antena cadastrado com sucesso");
            console.log("Ok")
            methods.reset();
        } catch {
           // toast.error("Falha ao cadastrar status de antena");
            console.log("Erro")
            methods.reset();
        }
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
                        name="antennaIdentifier"
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

