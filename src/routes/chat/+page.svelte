<script>
	let tone = 'neutral';
	let content = '';

	async function handleSubmit() {
		try {
			const response = await fetch('/api/gpt', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ tone, content })
			});
			const data = await response.json();
			content = '';
			console.log('Response:', data);
		} catch (error) {
			console.error('Error:', error);
		}
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<label for="content">Message:</label>
	<textarea id="input-text" bind:value={content} />
	<label for="tone">Tone:</label>
	<select id="tone" bind:value={tone}>
		<option value="neutral">Neutral</option>
		<option value="positive">Positive</option>
		<option value="negative">Negative</option>
	</select>
	<button type="submit">Submit</button>
</form>
