import { createGlobalStyle } from 'styled-components';
import 'modern-normalize';

export const GlobalStyle = createGlobalStyle`
body {
  padding: 20px;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

b {
margin-right: 10px;
}

button {
  display: inline-block;
  padding: 10px 20px;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: 2px solid #3498db; 
  border-radius: 5px; 
  background-color: #3498db; 
  color: #fff; 
  transition: background-color 0.3s, color 0.3s;}

button:hover {
  background-color: #2980b9; 
  border-color: #2980b9; 
  color: #fff; 
}`;
