import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'


const useHookForm = (initialValues, schema, mode) => {

    const methods = useForm({
        defaultValues: initialValues,
        reValidateMode: 'onSubmit',
        resolver: yupResolver(schema),

        mode: mode || 'all'
    })
    return { methods }
}

export default useHookForm;