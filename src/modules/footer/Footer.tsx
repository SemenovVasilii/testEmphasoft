import "./Footer.scss"
import React from "../../ui/img/react.png"
import Github from "../../ui/img/github.png"

function Footer() {
    return (
        <div className="footer">
            <div className="footer__row">
                <div className="footer__logo">
                    <img alt="#" src={React} />
                </div>
                <button className="footer__github">
                    <a href="https://github.com/SemenovVasilii" className="guthub__link">
                        <img alt="#" src={Github} />
                    </a>
                </button>
            </div>
        </div>
    )
}

export { Footer }
