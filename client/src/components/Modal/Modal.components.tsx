import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  min-width: 300px;
  text-align: center;
`;

export const Icon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  color: #4caf50;
`;

export const Title = styled.h2`
  margin: 0;
  margin-bottom: 8px;
  color: #4caf50;
`;

export const Text = styled.p`
  margin: 0;
  color: #666;
`;

