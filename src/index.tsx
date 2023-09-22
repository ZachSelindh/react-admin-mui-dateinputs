import React from 'react';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import Picker, { PickerProps } from './components/Pickers';

export type DateTimeInputProps = Omit<PickerProps, 'PickerComponent'>;

export const DateInput = (props: DateTimeInputProps) => <Picker PickerComponent={MobileDatePicker} {...props} />;

export const TimeInput = (props: DateTimeInputProps) => <Picker PickerComponent={MobileTimePicker} {...props} />;

export const DateTimeInput = (props: DateTimeInputProps) => (
    <Picker PickerComponent={MobileDateTimePicker} {...props} />
);
