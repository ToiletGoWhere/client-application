import React from "react";
import { connect } from "dva";
import stylescss from "./UpdateProfile.css";
import styled from "styled-components";
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { updateProfileServer } from "../services/webServices";

const ToiletOptionsContainer = styled.div`
  background-color: #f2f2f2;
  width: 100%;
  height: 740px;
  left: 0;
  bottom: 0;
  position: fixed;
`;

const categories = [
  {
    value: 'female',
    label: 'Female',
  },
  {
    value: 'male',
    label: 'Male',
  },
  {
    value: 'nursing',
    label: 'Nursing',
  },
  {
    value: 'accesible',
    label: 'Accessible',
  },
];
const styles = theme => ({
  menu: {
    width: 200,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

const ConfirmationButton = styled.div`
  height: 40px;
  width: 353px;
  border-radius: 5px;
  padding-top: 8px;
  left: 50%;
  transform: translate(-50%, 50%);
  cursor: pointer;
  background: linear-gradient(
    -45deg,
    #4169e1,
    #7363d6,
    #925dc8,
    #a858ba,
    #b855ab,
    #c3549c
  );
  text-align: center;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  box-sizing: border-box;
  position: absolute;
`;

class UpdateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'hai',
      labelWidth: 0,
      category: '1',
      username: '',
    };
  }
  componentDidMount() { }
  componentWillUnmount() { }

  handleChangeText = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleSubmit = event => {
    console.log("handleSubmit function called");
    console.log(this.state['category']);
    console.log(this.state['username']);
    const updateProfile = async () => {
      const payload = {
        username: this.state['username'],
        toiletType: this.state['category'],
      }
      const response = await updateProfileServer(payload);
      console.log(response);
    };
    updateProfile();
  }
  render() {
    const { classes } = this.props;
    return (
      <ToiletOptionsContainer>
        <form autoComplete="off">
          <div className={stylescss.textField}>
            <TextField
              id="outlined-helperText"
              label="Username"
              value={this.state.username}
              className={classes.textField}
              onChange={this.handleChangeText('username')}
              margin="normal"
              fullWidth
              variant="outlined"
            />
          </div>
          <p></p>
          <div className={stylescss.textField}>
            <TextField
              id="outlined-select-category"
              select
              label="Preferred Toilet Type"
              className={classes.textField}
              value={this.state.category}
              onChange={this.handleChangeText('category')}
              fullWidth
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
              variant="outlined"
            >
              {categories.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <ConfirmationButton
            onClick={() => this.handleSubmit()}
            type="primary"
            htmlType="submit"
          >
            Confirm
          </ConfirmationButton>
        </form>
      </ToiletOptionsContainer>
    );
  }
}

UpdateProfile.propTypes = {};

function mapStateToProps(state) {
  return state;
}

UpdateProfile = withStyles(styles, { withTheme: true })(UpdateProfile);
export default connect(mapStateToProps)(UpdateProfile);