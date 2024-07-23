import React, { useState } from 'react';
import axios from 'axios';
import { ReactTyped as Typed } from 'react-typed';
import styled, { createGlobalStyle } from 'styled-components';
import NavigationBar from './NavigationBar';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #e0f7fa; /* 밝은 민트색 배경 */
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100vw;
  }
`;

const Container = styled.div`
  
  max-width: 1200px; /* 최대 너비를 1200px로 설정 */
  padding: 40px; /* 패딩을 40px로 늘림 */
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* 더 부드러운 그림자 */
  text-align: center;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  overflow-y: auto;
  
`;

const Title = styled.h1`
  color: #A1BBDE; /* 진한 초록색 */
  font-size: 36px; /* 글꼴 크기를 36px로 늘림 */
  margin-bottom: 30px; /* 아래 여백을 30px로 늘림 */
`;

const Form = styled.form`
  gap: 20px; /* 갭을 20px로 늘림 */
  margin-bottom: 30px; /* 아래 여백을 30px로 늘림 */
  width: 100%;
`;

const Input = styled.input`
  padding: 16px; /* 패딩을 16px로 늘림 */
  font-size: 18px; /* 글꼴 크기를 18px로 늘림 */
  border: 1px solid #b0bec5; /* 연한 회색 */
  border-radius: 6px; /* 둥근 모서리 */
  transition: border-color 0.3s;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: #A1BBDE
    outline: none;
  }
`;

const Button = styled.button`
  padding: 16px; /* 패딩을 16px로 늘림 */
  font-size: 18px; /* 글꼴 크기를 18px로 늘림 */
  background-color: #A1BBDE
  color: white;
  border: none;
  margin-top: 20px;
  border-radius: 6px; /* 둥근 모서리 */
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    background-color: #344889; /* 더 진한 초록색 */
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Result = styled.div`
  background-color: #DAE6F4; /* 연한 초록색 */
  padding: 30px; /* 패딩을 30px로 늘림 */
  border-radius: 8px;
  border: 1px solid #DAE6F4; /* 연한 초록색 */
  text-align: left;
  width: 100%;
  box-sizing: border-box;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid #A1BBDE
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  display: inline-block;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const HealthDataAnalyzer = () => {
  const [userId, setUserId] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setUserId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://71nc4lk6kd.execute-api.ap-northeast-2.amazonaws.com/Integration/upload_report', {
        user_id: userId,
      });
      setResult(response.data.response);
    } catch (error) {
      console.error('Error fetching data', error);
      setResult('데이터를 가져오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <GlobalStyle/>
      <NavigationBar/>
      <Container>
        <Title>Health Data Analyzer</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={userId}
            onChange={handleInputChange}
            placeholder="User ID를 입력하세요"
          />
          <Button type="submit">분석하기</Button>
        </Form>
        {loading && <Loader />}
        {result && !loading && (
          <Result>
            <Typed
              strings={[result]}
              typeSpeed={30}
            />
          </Result>
        )}
      </Container>
    </div>
  );
};

export default HealthDataAnalyzer;