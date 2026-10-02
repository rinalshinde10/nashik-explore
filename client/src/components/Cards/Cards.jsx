import Button from "../Button/Button";

function Cards({
    title,
    description,
    icon,
    buttonText,
    onClick
}) {
    return (
        <div className="category-card">

            {/* CATEGORY ICON */}
            {icon && (
                <div className="category-icon">
                    <img src={icon} alt={title} />
                </div>
            )}

            {/* CATEGORY TITLE */}
            <h3>{title}</h3>

            {/* CATEGORY DESCRIPTION */}
            <p>{description}</p>

            {/* CATEGORY BUTTON */}
            {buttonText && (
                <Button
                    className="category-button"
                    onClick={onClick}
                >
                    {buttonText}
                </Button>
            )}

        </div>
    );
}

export default Cards;