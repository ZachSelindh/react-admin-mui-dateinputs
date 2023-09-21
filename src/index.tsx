import React from 'react';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import Picker from './components/Pickers';

export const DateInput = props => <Picker PickerComponent={MobileDatePicker} {...props} />;

export const TimeInput = props => <Picker PickerComponent={MobileTimePicker} {...props} />;

export const DateTimeInput = props => <Picker PickerComponent={MobileDateTimePicker} {...props} />;
