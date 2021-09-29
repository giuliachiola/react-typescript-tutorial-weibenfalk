import React from 'react';

// Styles
import { StyledGender, Wrapper } from './Card.styles';

type Props = {
  id: number;
  name: string;
  imgUrl: string;
  gender: string;
};

const Card: React.FC<Props> = ({ id, name, imgUrl, gender }) => (
  <Wrapper>
    <p>
      {name} - ID: {id}
    </p>
    <img src={imgUrl} alt="" />
    <StyledGender gender={gender} />
  </Wrapper>
);

export default Card;
