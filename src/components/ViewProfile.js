import React from "react";
import { connect } from "dva";
import styled from "styled-components";
import { withStyles } from '@material-ui/core/styles';

const ToiletOptionsContainer = styled.div`
  background-color: #f2f2f2;
  width: 100%;
  height: 740px;
  left: 0;
  bottom: 0;
  position: fixed;
`;

const styles = theme => ({
  categoryLabel: {
    marginTop: '10px',
    marginLeft: '10px',
    paddingBottom: 0,
    fontWeight: 500,
    fontSize: '20px'
  },
  issueLabel: {
    marginTop: '20px',
    marginLeft: '10px',
    paddingBottom: 0,
    fontWeight: 500,
    fontSize: '20px'
  },
  preloadValue: {
    marginLeft: '10px',
    paddingBottom: 0,
    fontWeight: 500,
    fontSize: '15px'
  }
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
    };
  }
  componentDidMount() { }
  componentWillUnmount() { }
  state = {
    name: 'hai',
    labelWidth: 0,
    category: '1',
    multiline: '',
  };

  handleChangeText = name => event => {
    this.setState({
      [name]: event.target.value,
    });
    // console.log(this.state['category']);
    // console.log(this.state['multiline']);
  };
  handleSubmit = event => {
  }
  render() {
    const { classes } = this.props;
    return (
      <ToiletOptionsContainer>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <div className={classes.issueLabel}>Username:</div>
          <br />
          <p className={classes.preloadValue}>preload username</p>
          <p></p>
          <div className={classes.categoryLabel}>Preferred Toilet Type:</div>
          <br />
          <p className={classes.preloadValue}>preload preferred toilet type</p>
          <ConfirmationButton
            onClick={() => this.handleSubmit()}
            type="primary"
            htmlType="submit"
          // className={classes.confirmationButton}
          >
            Update
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
