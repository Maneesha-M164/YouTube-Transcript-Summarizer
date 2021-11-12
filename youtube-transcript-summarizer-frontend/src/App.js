import './App.css';
import BackendAPI from './components/BackendApi';


function App() {
	return (
		<div className="App">
			<header className="App-header">
				<h1>YouTube Transcript Summarizer</h1>
				<pre><b>----------------------------</b></pre>
				<BackendAPI />
			</header>
			{/* <footer className="footer">
				Made by - 19IT121 Venis Prajapati And 19IT114 Virag Patel
			</footer> */}
		</div>
	);
}

export default App;
