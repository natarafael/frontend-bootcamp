import useHookForm from "../../compents/hooks/UseHookForm";
import {NewPass} from "../../api/api";
import {Box, Button, Switch, Typography} from "@mui/material";
import Form from "../../compents/hook-forms/Form";
import {ControlledTextField} from "../../compents/hook-forms/TextFieldForm";
import {useState} from "react";
import PassRegistrationSchema from "./PassRegistrationSchema";

const EditPass = () => {

    const initialValues = {
        registryDate:"",
        antennaIdentifier:"",
        fishIdentifier:"",

    }
    const [checked, setChecked] = useState(false);

    const FORM_ID = "NewPass";

    const {methods} = useHookForm(
        initialValues,
        PassRegistrationSchema,
        'onSubmit');


    const handleSubmit = async (formValues) => {
        try {
            console.log(formValues);
             await NewPass(formValues).then(response => console.log(response.data)).catch(error => console.log(error));
            //toast.success("Passagem cadastrado com sucesso");
            console.log("Ok")
            methods.reset();
        } catch {
           // toast.error("Falha ao cadastrar a Passagem");
            console.log("Erro")
            methods.reset();
        }
    };

    return (
        <Box display="flex" flexDirection="row" flexWrap="wrap" width="100%" >
            <Form id={FORM_ID} methods={methods} onSubmit={handleSubmit} >

                    <ControlledTextField
                        name="registryDate"
                        control={methods.control}
                        label="Data de Registro"
                        sx={{width: "48%", margin:'5px'}}
                    />
                    <ControlledTextField
                        name="antennaIdentifier"
                        control={methods.control}
                        label="Id da Antena"
                        sx={{width: "48%", margin:"5px"}}
                    />
                    <ControlledTextField
                        name="fishIdentifier"
                        control={methods.control}
                        label="Id do Peixe"
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
export default EditPass;

