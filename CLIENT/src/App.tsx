import { useTheme } from './hooks/useTheme';
import { Router } from './components/routes/Router';

export const App = () => {
	useTheme();

	return <Router />;
};