import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default class Calc extends Component {
  state = {
    display: '',
    currentOperand: '',
    previousOperand: '',
    operator: null,
  };

  handleClick = (item) => {
    const { display, currentOperand, previousOperand, operator } = this.state;

    if (typeof item === 'number') {
      this.setState({
        display: display + item,
        currentOperand: currentOperand + item,
      });
    } else if (item === '+' || item === '-' || item === 'x' || item === '/') {
      this.setState({
        previousOperand: currentOperand,
        currentOperand: '',
        operator: item,
        display: display + ' ' + item + ' ',
      });
    } else if (item === '=') {
      let result;
      const current = parseFloat(currentOperand);
      const previous = parseFloat(previousOperand);

      switch (operator) {
        case '+':
          result = previous + current;
          break;
        case '-':
          result = previous - current;
          break;
        case 'x':
          result = previous * current;
          break;
        case '/':
          result = previous / current;
          break;
        default:
          return;
      }

      this.setState({
        display: result.toString(),
        currentOperand: result.toString(),
        previousOperand: '',
        operator: null,
      });
    }
    else if (item === 'R') {
        this.setState ({
            display: '',
            currentOperand: '',
            previousOperand: '',
            operator: null,
          });
    }
    else if (item === '<--') {
        this.setState({
            display: display.slice(0, -1),
            currentOperand: currentOperand.slice(0, -1),
          });
    }
  };

  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "+", "-", "x", "/", "=","R","<--"];

  render() {
    return (
      <Grid container spacing={3}>
        {/* Display Area */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {this.state.display}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Grid of Clickable Items */}
        {this.items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item}>
            <Card>
              <CardActionArea onClick={() => this.handleClick(item)}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {item}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
}
