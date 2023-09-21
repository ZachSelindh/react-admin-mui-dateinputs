import * as React from 'react';
import { PickersActionBarProps } from '@mui/x-date-pickers/PickersActionBar';
interface CustomPickersActionBarProps extends PickersActionBarProps {
    handleChange: (value: any) => void;
    setFragileValue: React.Dispatch<React.SetStateAction<Date>>;
}
declare const CustomActionBar: (props: CustomPickersActionBarProps) => import("react/jsx-runtime").JSX.Element;
export default CustomActionBar;
