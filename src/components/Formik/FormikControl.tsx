import Input, { InputProps } from "./Input";

interface FormikControlProps extends InputProps {
    control: string;
    inputType?: string;
    label: string;
    name: string;
    options?: { key: string ; value: string;  }[];
    placeholder?:string;
}

const FormikControl = (props: FormikControlProps) => {
    const { control, ...rest } = props;

    switch (control) {
        case 'input':
            return <Input {...rest} />
        // case 'textarea':
        //     return <Textarea {...rest}/>
        // case 'select':
        //     return <Select {...rest}/>
        // case 'radio':
        //     return <RadioButtons {...rest}/>
        // case 'checkbox':
        //     return <CheckboxGroup {...rest}/>
        // case 'date':
        //     return <DatePicker {...rest}/> 
        default: return null;
    }
}
export default FormikControl;