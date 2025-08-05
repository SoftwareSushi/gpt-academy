import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';

function App() {
	return (
		<ThemeProvider>
			<Layout />
		</ThemeProvider>
	);
}

export default App;
