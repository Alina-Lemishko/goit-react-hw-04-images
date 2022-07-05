import PropTypes from 'prop-types';

const RejectedItem = ({ error }) => {
  return <p>{error}</p>;
};

export default RejectedItem;

RejectedItem.propTypes = {
  error: PropTypes.string,
};
