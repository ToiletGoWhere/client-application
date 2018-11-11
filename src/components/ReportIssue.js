import React from 'react';
import { connect } from "dva";
// import styles from "./ReportIssue.css";
import styled from "styled-components";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { reportIssueServer } from "../services/webServices";

const ToiletOptionsContainer = styled.div`
  background-color: #f2f2f2;
  width: 100%;
  height: 400px;
  left: 0;
  bottom: 0;
  position: fixed;
  z-index: 999;
`;

const categories = [
  {
    value: '1',
    label: 'Running out of toilet paper',
  },
  {
    value: '2',
    label: 'Damaged facilities',
  },
  {
    value: '3',
    label: 'Cleanness',
  },
];
const styles = theme => ({
  textFieldCategory: {
    width: '90%',
    marginLeft: '10px',
    marginRight: 'auto',
    color: 'white',
    paddingBottom: 0,
    fontWeight: 500
  },
  categoryLabel: {
    marginLeft: '10px',
    paddingBottom: 0,
    fontWeight: 500
  },
  textFieldIssue: {
    width: '90%',
    marginLeft: '10px',
    marginRight: 'auto',
    paddingBottom: 0,
    fontWeight: 500,
    width: '90%',
  },
  issueLabel: {
    marginLeft: '10px',
    paddingBottom: 0,
    fontWeight: 500
  },
  confirmationButton: {
    marginTop: '10px',
    marginLeft: '285px',
    background: 'rgba(0, 0, 0,0.15)',
    coloe: 'white'
  }
});

class ReportIssue extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   };
  // }
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
    console.log("handleSubmit function called");
    console.log(this.state['category']);
    console.log(this.state['multiline']);
    const reportIssue = async () => {
      const payload = {
        tld: '5be12c031dcb7e2ad6921d39',
        content: this.state['multiline'],
        reportType: this.state['category'],
      }
      const response = await reportIssueServer(payload);
      console.log(response);
    };
    reportIssue();
  }
  render() {
    const { classes } = this.props;
    return (
      <ToiletOptionsContainer>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <div className={classNames(classes.categoryLabel)}>Please select reporting problem category:</div>
          <br />
          <TextField
            id="standard-select-category"
            select
            value={this.state.category}
            onChange={this.handleChangeText('category')}
            className={classNames(classes.textFieldCategory)}
          >
            {categories.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <p></p>
          <div className={classNames(classes.issueLabel)}>Please explain the issue:</div>
          <br />
          <TextField
            id="outlined-multiline-flexible"
            multiline
            rowsMax="8"
            value={this.state.multiline}
            onChange={this.handleChangeText('multiline')}
            variant="outlined"
            className={classNames(classes.textFieldIssue)}
          />
          <Button
            type="primary"
            htmlType="submit"
            className={classNames(classes.confirmationButton)}
          >
            Confirm
          </Button>
        </form>
      </ToiletOptionsContainer>
    );
  }
}
ReportIssue.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return state;
}

// export default connect(mapStateToProps)(ReportIssue);

export default withStyles(styles)(ReportIssue);
