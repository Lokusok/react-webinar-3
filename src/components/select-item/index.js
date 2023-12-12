import PropTypes from 'prop-types';

function SelectItem({ item, depth }) {
  const depthIdentity = depth > 0 ? Array(depth).fill('-') : [];

  return (
    <option value={item.value}>{depthIdentity.join('')} {item.title}</option>
  )
}

SelectItem.propTypes = {
  item: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string
  })
};

SelectItem.defaultProps = {
  depth: 0,
};

export default SelectItem;
