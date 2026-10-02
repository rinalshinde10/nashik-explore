import "./Footer.css";

function Footer() {
    return (
        <div className="footer">
            <p className="text">© {new Date().getFullYear()} Flora Explorer. All rights reserved.</p>
        </div>
    )
}

export default Footer;