import React, { useImperativeHandle } from 'react';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setVisibility } from '../reducers/togglableReducer';


const Togglable = React.forwardRef((props, ref) => {
  // const [visibility, setVisibility] = useState(false);
  const dispatch = useDispatch();
  const visibility = useSelector((state) => state.togglable);

  const showWhenVisible = { display: visibility ? '' : 'none' };
  const hideWhenVisible = { display: visibility ? 'none' : '' };

  const toggleVisibility = () => {
    dispatch(setVisibility(!visibility));
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>

      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
  buttonLabel: propTypes.string.isRequired,
};


export default Togglable;