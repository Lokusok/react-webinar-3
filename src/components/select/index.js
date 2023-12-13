import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

import SelectItem from "../select-item";

function Select(props) {
  const onSelect = (e) => {
    props.onChange(e.target.value);
  };

  const renders = {
    options: (options) => {
      const elems = [];
      let depth = 0;

      const open = (items) => {
        items.forEach((item) => {
          elems.push(<SelectItem key={item.value} item={item} depth={depth} />);

          if (item.children) {
            depth++;
            open(item.children);
            depth--;
          }
        });
      };

      open(options);

      return elems;
    }
  };

  return (
    <select className="Select" value={props.value} onChange={onSelect}>
      {renders.options(props.options)}
    </select>
  )
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string
  })).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func
};

Select.defaultProps = {
  onChange: () => {
  }
}

export default memo(Select);
