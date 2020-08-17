import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  input {
    width: 400px;
  }
`;

export const Table = styled.table`
  border: 2px solid #4c2782;
  background-color: #EEE7DB;
  width: 100%;
  text-align: center;
  border-collapse: collapse;

  td th {
    border: 1px solid #AAAAAA;
    padding: 3px 2px;
  }

  tbody td {
    font-size: 16px;
  }

  tr:nth-child(even) {
    background: #77ff95;
  }

  thead {
    background: #4c2782;
  }

  thead th {
    font-size: 19px;
    font-weight: bold;
    color: #FFFFFF;
    text-align: center;
    border-left: 0px solid #4c2782;
  }

  thead th:first-child {
    border-left: none;
  }

  tfoot {
    font-size: 13px;
    font-weight: bold;
    color: #FFFFFF;
    background: #4c2782;
  }

  tfoot, td {
    font-size: 13px;
    color: #000;
  }

  tfoot div {
    text-align: right;
  }

  tfoot div a{
  display: inline-block;
  background: #FFFFFF;
  color: #4c2782;
  padding: 2px 8px;
  border-radius: 5px;
}
`;
