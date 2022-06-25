import useHookForm from "../../compents/hooks/UseHookForm";
import {NewFish} from "../../api/api";
import {Box, Button, Switch, Typography} from "@mui/material";
import Form from "../../compents/hook-forms/Form";
import {ControlledTextField} from "../../compents/hook-forms/TextFieldForm";
import {useState} from "react";
import FishRegistrationSchema from "./FishRegistrationSchema";

const EditFish = () => {

    const initialValues = {
        pittag:"",
        scientificName:"",
        commonName:"",
        totalLength:"",
        captureLocation:"",
        releaseWeight: "",
        releaseDate:"",
        releaseLocation:"",
        standardLength: "",
        dnaSample:"",
        recapture:false
    }
    const [checked, setChecked] = useState(false);

    const FORM_ID = "NewFish";

    const {methods} = useHookForm(
        initialValues,
        FishRegistrationSchema,
        'onSubmit');


    const handleSubmit = async (formValues) => {
        try {
            console.log(formValues);
             await NewFish(formValues).then(response => console.log(response.data)).catch(error => console.log(error));
            //toast.success("Usuário cadastrado com sucesso");
            console.log("Ok")
            methods.reset();
        } catch {
           // toast.error("Falha ao cadastrar usuário");
            console.log("Erro")
            methods.reset();
        }
    };

    return (
        <Box display="flex" flexDirection="row" flexWrap="wrap" width="100%" >
            <Form id={FORM_ID} methods={methods} onSubmit={handleSubmit} >

                    <ControlledTextField
                        name="pittag"
                        control={methods.control}
                        label="Pittag"
                        sx={{width: "48%", margin:'5px'}}
                    />
                    <ControlledTextField
                        name="scientificName"
                        control={methods.control}
                        label="Nome Científico"
                        sx={{width: "48%", margin:"5px"}}
                    />
                    <ControlledTextField
                        name="commonName"
                        control={methods.control}
                        label="Nome Comum"
                        sx={{width: "48%", margin:"5px"}}
                    />
                    <ControlledTextField
                        name="totalLength"
                        control={methods.control}
                        label="Comprimento Total"
                        sx={{width: "48%", margin:"5px"}}
                    />
                    <ControlledTextField
                        name="captureLocation"
                        control={methods.control}
                        label="Local de captura"
                        sx={{width: "48%", margin:"5px"}}
                    />
                    <ControlledTextField
                        name="releaseWeight"
                        control={methods.control}
                        label="Peso de soltura"
                        sx={{width: "48%", margin:"5px"}}
                    />
                    <ControlledTextField
                        name="releaseDate"
                        control={methods.control}
                        label="Data de soltura"
                        sx={{width: "48%", margin:"5px"}}
                    />
                    <ControlledTextField
                        name="releaseLocation"
                        control={methods.control}
                        label="Local de soltura"
                        sx={{width: "48%", margin:"5px"}}
                    />
                    <ControlledTextField
                        name="standardLength"
                        control={methods.control}
                        label="Comprimento Padrão"
                        sx={{width: "48%", margin:"5px"}}
                    />
                    <ControlledTextField
                        name="dnaSample"
                        control={methods.control}
                        label="Código da amostra de DNA"
                        sx={{width: "48%", margin:"5px"}}
                    />
                <Typography variant="inherit" p={2}>
                    Recaptura?
                    <Switch
                        checked={checked}
                        onChange={() => {
                            setChecked(!checked)
                            methods.setValue('recapture', !checked)
                        }}
                        inputProps={{ 'aria-label': 'controlled' }}
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
    )
}
export default EditFish;

