import styled from 'styled-components';

import SpaceM from 'assets/sppicture.png';

export const BgColor = styled.div`
  background-color: black;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const BannerM = styled.div`
  background-image: url(${SpaceM});
  display: flex;
  background-position-x: 30%;
  background-size: cover;
  height: 400px;
  margin: 0;
  padding: 0;
`;
