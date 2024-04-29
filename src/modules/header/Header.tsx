import './Header.scss'
import { logout } from '../../actions'
import Exit from '../../ui/img/exit.png'

function Header() {
    return (
        <div className="header">
            <div className="header__row">
                <div className="header__title">TestApp</div>
                <div className="header__navigation">
                    <button className="navigation__logout" onClick={logout}>
                        <img alt="#" src={Exit} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export { Header }
