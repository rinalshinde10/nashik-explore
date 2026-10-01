
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

            <div className="category-icon">

                {icon}

            </div>


            {/* CATEGORY TITLE */}

            <h3>
                {title}
            </h3>


            {/* CATEGORY DESCRIPTION */}

            <p>
                {description}
            </p>


            {/* CATEGORY BUTTON */}

            <Button
                className="category-button"
                onClick={onClick}
            >
                {buttonText}
            </Button>


        </div>

    );

}


export default Cards;

