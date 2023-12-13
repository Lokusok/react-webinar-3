import "./style.css"
import PropTypes from "prop-types";

function SelectItem({ item, depth }) {
  const depthIdentity = Array(depth).fill('- ').join('').trim();

  return (
    <option value={item.value}>{depthIdentity} {item.title}</option>
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
