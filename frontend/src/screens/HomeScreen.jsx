import { Link } from 'react-router-dom';

function HomeScreen() {
  return (
    <div id="homeScreenContainer">
      <div className="paralax-container" id="header">
        <div className="img-header">
          <div className="welcome">
            <span>
              <Link to="/Shop" className="shop-link">
                GO SHOP!
              </Link>
            </span>
            <img className="disk" src="" alt="" />
          </div>
        </div>

        <div className="skew-abajo"></div>
      </div>
      <section className="about-me">
        <div className="info-container">
          <div className="sibillingContainer">
            <div className="socialMediaContainerSibilling"></div>
            <div className="socialMediaContainer">
              <ul className="socialMediaContainer__list">
                <li className="socialMediaContainer__list-item">
                  <Link>
                    <i className="fa-brands fa-facebook socialMediaContainer__list-item-icon"></i>
                  </Link>
                </li>
                <li className="socialMediaContainer__list-item">
                  <div className="socialMediaContainer__list-item-a">
                    <i className="fa-brands fa-instagram socialMediaContainer__list-item-icon"></i>
                  </div>
                </li>
                <li className="socialMediaContainer__list-item">
                  <Link>
                    <i className="fa-brands fa-linkedin socialMediaContainer__list-item-icon"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <h1 data-dark>About us:</h1>
          <p data-dark>
            We are mexican flip flop factory If you are searching quality for
            distribution and personal wearing we invite you to know our flip
            flops with unique models for all. Fllip flops are escencial in our
            beach trips, pool partys, weekends in your home and more. Its an
            excelent product to satisfy multiple needs.
          </p>
        </div>
      </section>

      <section id="session1" className="section">
        <div className="slider">
          <div className="slider-slides">
            <div className="slider-slide active">
              <img src={'/images/flipflops-style3.png'} alt="Javascript" />
            </div>
            <div className="slider-slide">
              <img src={'/images/flipflops-style1.png'} alt="CSS" />
            </div>
            <div className="slider-slide">
              <img src={'/images/flipflops-style2.png'} alt="HTML" />
            </div>
            <div className="slider-slide">
              <img src={'/images/flipflops-style4.png'} alt="MERN" />
            </div>
            <div className="slider-btns">
              <a className="prev" href="#">
                &laquo;
              </a>
              <a className="next" href="#">
                &raquo;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="our-projects">
        <div className="deg-background"></div>

        <div className="ejeZproject">
          <div className="container-project">
            <div className="project-title">
              <h2>CATHEGORIES</h2>
            </div>
            <div className="project-img">
              <img src="/images/men.png" alt="" />
              <img src="/images/woman.png" alt="" />
              <img src="/images/kids.png" alt="" />
            </div>
          </div>
        </div>
      </section> */}
      {/* <section id="session3" className="section"></section>
      <section id="session4" className="section"></section>
      <section id="session5" className="section"></section>
      <section id="session6" className="section"></section>
      <section id="session7" className="section"></section>
      <section id="session8" className="section"></section>
      <section id="session9" className="section"></section>
      <section id="session10" className="section"></section>

      <section id="session11" className="section"></section>
      <section id="session12" className="section"></section> */}
    </div>
  );
}

export default HomeScreen;
