import Logo from 'assets/chadban.png';
import classes from './Header.module.scss';

const Header = () => (
  <nav>
    <ul className={classes.header}>
      <li>
        <img
          className={classes['header__logo']}
          src={Logo}
          alt="logo"
          width="260px"
          height="80px"
        />
      </li>
      <li>
        <a className={classes['header__buttons']} href="/">
          Fajny
        </a>
      </li>
      <li>
        <a className={classes['header__buttons']} href="/">
          Przycisk
        </a>
      </li>
      <li>
        <a className={classes['header__buttons']} href="/">
          Brachu
        </a>
      </li>
      <li>
        <a
          className={classes['header__buttons']}
          href="/"
          style={{ float: 'right' }}
        >
          Zaloguj
        </a>
      </li>
    </ul>
  </nav>
);

export default Header;
