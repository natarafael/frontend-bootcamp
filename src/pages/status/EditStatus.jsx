import useHookForm from "../../compents/hooks/UseHookForm";
import {NewStatus} from "../../api/api";
import {Box, Button,Typography,Switch} from "@mui/material";
import Form from "../../compents/hook-forms/Form";
import {ControlledTextField} from "../../compents/hook-forms/TextFieldForm";
import StatusRegistrationSchema from "./StatusRegistrationSchema";
import {toast} from "react-toastify";
import {useState} from "react";
import Flatpickr from "react-flatpickr";

const EditStatus = () => {

    const initialValues = {
        observations:"",
        antennaID:"",
        status:"",
        statusChangeDate:"",
    }

    const [checked, setChecked] = useState(false);
    const [date, setDate] = useState(new Date("2022-06-28T02:45:00.000"));

    const FORM_ID = "NewStatus";

    const {methods} = useHookForm(
        initialValues,
        StatusRegistrationSchema,
        'onSubmit');


    const handleSubmit = async (formValues) => {
             await NewStatus(formValues)
                 .then(response => {
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
                <Typography marginLeft={1}>
                    Data de mudança do status
                </Typography>
                <Flatpickr
                    data-enable-time
                    defaultValue={"2022-06-12T00:00:00.000Z"}
                    value={date}
                    onChange={() => {
                        setDate(date)
                        methods.setValue("statusChangeDate", date);
                    }}
                    style={{ width: "46%", margin: "3px", height: "52px", marginTop: "5px", backgroundColor: "#BDE0FE", border: "1px solid #768C9F", borderRadius: "5px", paddingLeft: "15px" }}
                />
                    <Typography variant="inherit" p={2}>
                        Status da Antena
                        <Switch
                            checked={checked}
                            onChange={() => {
                                setChecked(!checked)
                                methods.setValue('status', !checked)
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
export default EditStatus;

