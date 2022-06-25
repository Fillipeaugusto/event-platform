import { ApolloProvider } from '@apollo/client';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { client } from './lib/apollo';
import { Event } from './pages/Event';
import { Router } from './Router';

function App() {
	return (
		<ApolloProvider client={client}>
			<BrowserRouter>
				<Toaster position="top-right" />
				<Router />
			</BrowserRouter>
		</ApolloProvider>
	);
}

export default App;
