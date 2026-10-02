import "./Search.css";

function Search({
    value = "",
    onChange,
    placeholder = "Search...",
    disabled = false,
    className = ""
}) {
    return (
        <div className={`search-container ${className}`}>
            <span className="search-icon">⌕</span>

            <input
                type="search"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className="search-input"
                aria-label={placeholder}
            />

            {value && (
                <button
                    type="button"
                    className="search-clear"
                    onClick={() =>
                        onChange?.({
                            target: {
                                value: ""
                            }
                        })
                    }
                    aria-label="Clear search"
                    title="Clear search"
                >
                    ×
                </button>
            )}
        </div>
    );
}

export default Search;