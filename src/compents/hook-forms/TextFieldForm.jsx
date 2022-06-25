import * as React from "react";
import {Controller} from "react-hook-form";
import {TextField} from "@mui/material";


export const ControlledTextField = (props) => {

    return (
        <Controller
            name={props.name}
            control={props.control}
            rules={props.rules}
            defaultValue={props.defaultValue || ""}
            render={({
                         field: { onChange, onBlur, name: fieldName, value },
                         fieldState: { error },

                     }) => (
                    <TextField
                        {...props}
                        helperText={error ? error.message : null}
                        onChange={onChange}
                        error={!!error}
                        value={value}
                        onBlur={onBlur}
                        name={fieldName}
                        defaultValue={undefined}
                    />
            )}
        />
    );
};