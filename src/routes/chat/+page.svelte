<script>
	// form data
	let tone = 'neutral';
	let content = 'What was the closest ever Formula 1 championship?';

	// state
	let loading = false;
	let answer = '';

	async function handleSubmit() {
		loading = true;
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
			answer = data.chatResponse.content;
			loading = false;
			console.log('Response:', data);
		} catch (error) {
			console.error('Error:', error);
			loading = false;
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

<br />

<section>
	{#if loading}
		<div>Loading...</div>
	{/if}
	{#if answer}
		<p>
			{answer}
		</p>
	{/if}
</section>
