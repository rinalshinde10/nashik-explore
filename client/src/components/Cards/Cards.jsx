function Cards({ title, description, icon, buttonText }) {
    return (
        <div className="category-card">

            <div className="category-icon">
                {icon}
            </div>

            <h3>{title}</h3>

            <p>{description}</p>

            <button className="category-button">
                {buttonText}
            </button>

        </div>
    );
}

export default Cards;