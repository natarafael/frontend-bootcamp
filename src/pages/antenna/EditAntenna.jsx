import useHookForm from "../../compents/hooks/UseHookForm";
import {NewAntenna} from "../../api/api";
import {Box, Button, Typography} from "@mui/material";
import Form from "../../compents/hook-forms/Form";
import {ControlledTextField} from "../../compents/hook-forms/TextFieldForm";
import AntennaRegistrationSchema from "./AntennaRegistrationSchema";
import {toast} from "react-toastify";
import Flatpickr from "react-flatpickr";
import {useState} from 'react'

const EditAntenna = () => {
    const initialValues = {
        latitude:"",
        longitude:"",
        installationDate:"",
        uninstallDate:"",
    }
    const [date, setDate] = useState(new Date("2022-06-28T02:45:00.000"));

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
                    {/*<ControlledTextField*/}
                    {/*    name="installationDate"*/}
                    {/*    control={methods.control}*/}
                    {/*    label="Data de instalação"*/}
                    {/*    sx={{width: "48%", margin:"5px"}}*/}
                    {/*/>*/}
                <Typography marginLeft={1}>
                    Data de instalação
                </Typography>
                <Flatpickr
                    data-enable-time
                    defaultValue={"2022-06-12T00:00:00.000Z"}
                    value={date}
                    onChange={() => {
                        setDate(date)
                        methods.setValue("installationDate", date);
                    }}
                    style={{ width: "46%", margin: "3px", height: "52px", marginTop: "5px", backgroundColor: "#BDE0FE", border: "1px solid #768C9F", borderRadius: "5px", paddingLeft: "15px" }}
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

