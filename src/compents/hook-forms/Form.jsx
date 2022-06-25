import React from 'react';
import {FormProvider} from 'react-hook-form';
import {Box} from "@mui/material";

const Form = (props) => {

    const {
        children,
        methods,
        onSubmit,
        id
    } = props;


    return (
        <Box width="100%">
            <FormProvider {...methods}>
                <form id={id} onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                    {children}
                </form>
            </FormProvider>
        </Box>
    )

}

export default Form;