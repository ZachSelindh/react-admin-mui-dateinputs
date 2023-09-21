import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useInput, FieldTitle, sanitizeInputRestProps, InputHelperText } from 'react-admin';
import InputAdornment from '@mui/material/InputAdornment';
import Event from '@mui/icons-material/Event';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CustomActionBar from './CustomActionBar';

// This code copied from WiXSL/react-admin-date-inputs/blob/mui-pickers-v3/ because the repo host key was not maintained

const leftPad =
    (nb = 2) =>
    value =>
        ('0'.repeat(nb) + value).slice(-nb);
const leftPad4 = leftPad(4);
const leftPad2 = leftPad(2);

/**
 * @param {Date} value value to convert
 * @returns {String} A standardized datetime (yyyy-MM-ddThh:mm), to be passed to an <input type="datetime-local" />
 */
const convertDateToString = value => {
    if (!(value instanceof Date) || isNaN(value.getDate())) {
        return '';
    }

    const yy = leftPad4(value.getFullYear());
    const MM = leftPad2(value.getMonth() + 1);
    const dd = leftPad2(value.getDate());
    const hh = leftPad2(value.getHours());
    const mm = leftPad2(value.getMinutes());
    return `${yy}-${MM}-${dd}T${hh}:${mm}`;
};

// yyyy-MM-ddThh:mm
const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

/**
 * Converts a date from the Redux store, with timezone, to a date string
 * without timezone for use in an <input type="datetime-local" />.
 *
 * @param {Date | String} value date string or object
 */
const formatDateTime = (value: string | Date) => {
    // null, undefined and empty string values should not go through convertDateToString
    // otherwise, it returns undefined and will make the input an uncontrolled one.
    if (null == value || '' === value) {
        return '';
    }

    if (value instanceof Date) {
        return convertDateToString(value);
    }
    // valid dates should not be converted
    if (dateTimeRegex.test(value)) {
        return value;
    }

    return convertDateToString(new Date(value));
};

/**
 * Converts a datetime string without timezone to a date object
 * with timezone, using the browser timezone.
 *
 * @param {String} value Date string, formatted as yyyy-MM-ddThh:mm
 * @return {Date}
 */

const parseDateTime = (value: string) => (value ? new Date(value) : null);

const Picker = props => {
    const {
        PickerComponent,
        removeClear,
        defaultValue,
        format,
        label,
        className,
        options,
        source,
        resource,
        helperText,
        fullWidth,
        inputSize,
        inputVariant,
        margin,
        onChange,
        onOpen,
        onClose,
        parse,
        validate,
        stringFormat,
        ...rest
    } = props;

    const {
        field,
        fieldState: { error, invalid, isTouched },
        formState: { isSubmitted },
        id,
        isRequired,
    } = useInput({
        defaultValue,
        format,
        parse,
        onChange,
        resource,
        source,
        validate,
        ...rest,
    });

    const [fragileValue, setFragileValue] = useState(field.value ? new Date(field.value) : null);

    const handleChange = useCallback(
        value =>
            Date.parse(value)
                ? field.onChange('ISO' === stringFormat ? value.toISOString() : value.toString())
                : field.onChange(null),
        [field, stringFormat]
    );

    const hasError = (isTouched || isSubmitted) && invalid;

    const renderHelperText = false !== helperText || ((isTouched || isSubmitted) && invalid);

    const toolbarActions = removeClear ? ['cancel', 'today', 'accept'] : ['cancel', 'clear', 'today', 'accept'];

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <PickerComponent
                {...sanitizeInputRestProps(rest)}
                {...field}
                {...options}
                id={id}
                label={<FieldTitle label={label} source={source} resource={resource} isRequired={isRequired} />}
                slots={{
                    actionBar: CustomActionBar,
                }}
                slotProps={{
                    textField: {
                        variant: inputVariant,
                        size: inputSize,
                        margin,
                        fullWidth,
                        onBlur: field.onBlur,
                        error: hasError,
                        helperText: renderHelperText ? (
                            <InputHelperText
                                touched={isTouched || isSubmitted}
                                error={error?.message}
                                helperText={helperText}
                            />
                        ) : null,
                        InputProps: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Event />
                                </InputAdornment>
                            ),
                        },
                    },
                    actionBar: {
                        actions: toolbarActions,
                        handleChange,
                        setFragileValue,
                    },
                }}
                className={clsx('ra-input', `ra-input-${source}`, className)}
                value={field.value ? new Date(field.value) : null}
                onChange={(value, context) => setFragileValue(value)}
                onOpen={value => (onOpen && 'function' === typeof onOpen ? onOpen(value) : null)}
                onClose={value => (onClose && 'function' === typeof onClose ? onClose(value) : null)}
                onAccept={value => handleChange(fragileValue)}
            />
        </LocalizationProvider>
    );
};

Picker.propTypes = {
    PickerComponent: PropTypes.object.isRequired,
    removeClear: PropTypes.bool,
    fullWidth: PropTypes.bool,
    format: PropTypes.func,
    parse: PropTypes.func,
    label: PropTypes.string,
    onChange: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    inputSize: PropTypes.string,
    inputVariant: PropTypes.string,
    labelTime: PropTypes.string,
    margin: PropTypes.string,
    variant: PropTypes.string,
    className: PropTypes.string,
    stringFormat: PropTypes.string,
};

Picker.defaultProps = {
    removeClear: false,
    fullWidth: false,
    inputSize: 'small',
    inputVariant: 'filled',
    margin: 'dense',
    stringFormat: 'ISO',
    format: formatDateTime,
    parse: parseDateTime,
    label: '',
    options: {},
    resource: '',
    source: '',
    labelTime: '',
    className: '',
};

export default Picker;
