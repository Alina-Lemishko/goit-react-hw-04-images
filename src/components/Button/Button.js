import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <div className={s.ButtonWrap}>
      <button type="button" className={s.Button} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
