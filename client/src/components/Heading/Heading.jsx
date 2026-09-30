function Heading({ title, subtitle }) {
    return (
        <div className="heading">
            <h2 className="heading-title">{title}</h2>

            {subtitle && (
                <p className="heading-subtitle">
                    {subtitle}
                </p>
            )}
        </div>
    );
}

export default Heading;