import "./Home.scss"
import { Header, Footer, Main } from "../../modules"

function Home() {
    return (
        <div className="home">
            <div className="home__column">
                <Header />
                <Main />
                <Footer />
            </div>
        </div>
    )
}

export { Home }
