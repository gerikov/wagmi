import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

Button.propTypes = {
  text: PropTypes.string,
  props: PropTypes.object,
};

export default Button;
