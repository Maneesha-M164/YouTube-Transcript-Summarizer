import braille from 'braille';
import React from 'react';
import Tabs from "./Tabs";

class BackendAPI extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			error: null,
			isLoaded: false,
			isLoading: false,
			failedMessage: null
		};
	}

	handleChange = (event) => {

		this.setState({ [event.target.name]: event.target.value });
	}

	handleSubmit = (event) => {

		this.setState({
			isLoading: true,
			isLoaded: false
		});

		var FinalURL = `http://127.0.0.1:5000/api/?video_url=${this.state.name}`

		fetch(FinalURL)
			.then(res => res.json())
			.then(
				(result) => {
					if (result.data.message === "Success") {
						this.setState({
							isLoaded: true,
							isLoading: false,
							message: result.data.message,
							englishTranscript: result.data.eng_summary,
							hindiTranscript: result.data.hind_summary,
							gujaratiTranscript: result.data.guj_summary,
							originalTextLength: result.data.original_txt_length,
							summarizedTextLength: result.data.final_summ_length,
							brailleText: braille.toBraille(result.data.eng_summary)
						});
					} else {
						this.setState({
							isLoaded: true,
							isLoading: false,
							failedMessage: result.data.error
						});
					}
				},

				(error) => {
					alert('An Error occured: ' + this.state);
					this.setState({
						isLoaded: true,
						isLoading: false,
						error: error
					});
				}
			)

		event.preventDefault();
	}

	stopAudio = () => {

		window.speechSynthesis.pause();
	}

	textToAudio = () => {

		var synth = window.speechSynthesis;
		var utterance = new SpeechSynthesisUtterance(this.state.englishTranscript);
		synth.speak(utterance);

	}

	render() {

		const { isLoaded, isLoading, message, englishTranscript, hindiTranscript, gujaratiTranscript, brailleText, originalTextLength, summarizedTextLength } = this.state;

		if (isLoading) {

			return (
				<>
					<form onSubmit={this.handleSubmit}>
						<label>
							Video URL:
							<input className="input-1" type="url" value={this.state.value} name="name" onChange={this.handleChange} required autoComplete="off" />
						</label>
						<input className="submit-1" type="submit" value="Summarize Video" />
					</form>
					<div className="lds-ripple"><div></div><div></div></div>
					<Tabs>
						<div label="English">
							English Summarized Text Will be Shown Here...
						</div>
						<div label="Hindi">
							Hindi Summarized Text Will be Shown Here...
						</div>
						<div label="Gujarati">
							Gujarati Summarized Text Will be Shown Here...
						</div>
						<div label="Braille">
							{braille.toBraille("Braille Summarized Text Will be Shown Here...")}
						</div>
					</Tabs>
				</>
			);
		} else if (isLoaded) {

			if (message === "Success") {

				return (
					<>
						<form onSubmit={this.handleSubmit}>
							<label>
								Video URL:
								<input className="input-1" type="url" value={this.state.value} name="name" onChange={this.handleChange} required autoComplete="off" />
							</label>
							<input className="submit-1" type="submit" value="Summarize Video" />
						</form>
						<p>{originalTextLength} <i className="arrow right"></i>{" "} {summarizedTextLength}</p>

						<div>
							<button className="btn-1" type="button" onClick={this.textToAudio}>Speak</button>
							<button className="btn-1" type="button" onClick={this.stopAudio}>Stop</button>
						</div>
						<Tabs>
							<div label="English">
								{englishTranscript}
							</div>
							<div label="Hindi">
								{hindiTranscript}
							</div>
							<div label="Gujarati">
								{gujaratiTranscript}
							</div>
							<div label="Braille">
								{brailleText}
							</div>
						</Tabs>
					</>
				);
			}

			else {

				return (
					<>
						<form onSubmit={this.handleSubmit}>
							<label>
								Video URL:
								<input className="input-1" type="url" value={this.state.value} name="name" onChange={this.handleChange} required autoComplete="off" />
							</label>
							<input className="submit-1" type="submit" value="Summarize Video" />
						</form>
						<div>
							<br />
							An Error occured: {this.state.failedMessage}.
						</div>
						<Tabs>
							<div label="English">
								English Summarized Text Will be Shown Here...
							</div>
							<div label="Hindi">
								Hindi Summarized Text Will be Shown Here...
							</div>
							<div label="Gujarati">
								Gujarati Summarized Text Will be Shown Here...
							</div>
							<div label="Braille">
								{braille.toBraille("Braille Summarized Text Will be Shown Here...")}
							</div>
						</Tabs>
					</>
				);
			}

		}

		else {

			return (
				<>
					<form onSubmit={this.handleSubmit}>
						<label>
							Video URL:
							<input className="input-1" type="url" value={this.state.value} name="name" onChange={this.handleChange} required autoComplete="off" />
						</label>
						<input className="submit-1" type="submit" value="Summarize Video" />
					</form>
					<p>Original Length Before Summarization <i className="arrow right"></i> Final Length After Summarization</p>
					<Tabs>
						<div label="English">
							English Summarized Text Will be Shown Here...
						</div>
						<div label="Hindi">
							Hindi Summarized Text Will be Shown Here...
						</div>
						<div label="Gujarati">
							Gujarati Summarized Text Will be Shown Here...
						</div>
						<div label="Braille">
							{braille.toBraille("Braille Summarized Text Will be Shown Here...")}
						</div>
					</Tabs>
				</>
			);
		}

	}
}

export default BackendAPI;