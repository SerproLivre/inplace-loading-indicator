
import '../assets/react-toolbox/theme.css';
const theme = require('../assets/react-toolbox/theme.js');

import * as React from 'react';
import { Card } from 'react-toolbox/lib/card/Card';
import { CardMedia  } from 'react-toolbox/lib/card/CardMedia';
import { CardTitle  } from 'react-toolbox/lib/card/CardTitle';
import { CardText  } from 'react-toolbox/lib/card/CardText';
import { CardActions } from 'react-toolbox/lib/card/CardActions';




import { Button } from 'react-toolbox/lib/button/Button';
/*

<CardActions theme={theme}>
        <Button label="Action 1" />
        <Button label="Action 2" />
      </CardActions>
*/

const dummyText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.';

export class CardExample extends React.Component<{}, {}> {
  render() {
    return (<Card style={{ width: '350px' }} theme={theme}>
      <CardTitle
        avatar="https://placeimg.com/80/80/animals"
        title="Avatar style title"
        subtitle="Subtitle here"
      />
      <CardMedia
        aspectRatio="wide"
        image="https://placeimg.com/800/450/nature"
      />
      <CardTitle
        title="Title goes here"
        subtitle="Subtitle here"
      />
      <CardText>{dummyText}</CardText>
      <CardActions theme={theme}>
        <Button label="Action 1" />
        <Button label="Action 2" />
      </CardActions>
    </Card>);
  }
}
