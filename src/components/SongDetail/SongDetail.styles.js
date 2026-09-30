import styled from "styled-components";
import { Link } from "react-router-dom";
export const DetailContainer = styled.div`
  padding: 20px;
  margin-top: 20px;
  border: 1px solid #dddddd;
  border-radius: 12px;
  background-color: #ffffff;
`;
export const DetailTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 15px;
`;
export const DetailText=styled.p`
  margin: 5px 0;
`;
export const BackLink = styled(Link)`
  display: inline-block;
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.primary};
`;