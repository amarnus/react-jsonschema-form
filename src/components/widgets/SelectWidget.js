import React, { PropTypes } from "react";

import { asNumber } from "../../utils";


/**
 * This is a silly limitation in the DOM where option change event values are
 * always retrieved as strings.
 */
function processValue(type, value) {
  if (type === "boolean") {
    return value === "true";
  } else if (type === "number") {
    return asNumber(value);
  }
  return value;
}

function SelectWidget({
  schema,
  id,
  options,
  placeholder,
  value,
  required,
  disabled,
  readonly,
  multiple,
  onChange
}) {
  const {enumOptions} = options;
  return (
    <select
      id={id}
      multiple={multiple}
      className="form-control"
      title={placeholder}
      value={value}
      required={required}
      disabled={disabled}
      readOnly={readonly}
      onChange={(event) => {
        let newValue;
        if (multiple) {
          newValue = [].filter.call(
            event.target.options, o => o.selected).map(o => o.value);
        } else {
          newValue = event.target.value;
        }

        onChange(processValue(schema.type, newValue));
      }}>{
      enumOptions.map(({value, label}, i) => {
        return <option key={i} value={value}>{label}</option>;
      })
    }</select>
  );
}

if (process.env.NODE_ENV !== "production") {
  SelectWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.shape({
      enumOptions: PropTypes.array,
    }).isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    required: PropTypes.bool,
    multiple: PropTypes.bool,
    onChange: PropTypes.func,
  };
}

export default SelectWidget;
