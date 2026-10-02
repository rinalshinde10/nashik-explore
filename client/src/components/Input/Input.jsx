function Input({
    type = "text",
    name,
    value,
    onChange,
    placeholder = "",
    disabled = false,
    required = false,
    className = "",
    ...props
}) {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={`common-input ${className}`}
            {...props}
        />
    );
}

export default Input;