import "./header.css";
import logo from "../assets/mlab-logo.png";

function Header() {
  return (
    <>
      <header className="headerContainer">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="heading">
          <h1 id="heading">EMPLOYEE REGISTRATION</h1>
        </div>
      </header>
    </>
  );
}

export default Header;
