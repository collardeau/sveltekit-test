<script>
	export let data;

	// loaded data
	let msgs = data.messages || [];

	// ui state
	let loading = false;

	// form data
	let tone = 'neutral';
	let content = 'What is the biggest city?';

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
			const answer = data.chatResponse.content;
			msgs = [...msgs, { role: 'user', content }, { role: 'assistant', content: answer }];
			content = '';
			loading = false;
			console.log('Response:', data);
		} catch (error) {
			console.error('Error:', error);
			loading = false;
		}
	}
</script>

<section>
	{#each msgs as msg}
		<div class="message">
			<p>
				{msg.role === 'assistant' ? 'GPT' : 'You'}: {msg.content}
			</p>
		</div>
	{/each}
</section>

<section>
	<section>
		{#if loading}
			<div>Loading...</div>
		{/if}
	</section>
	<form on:submit|preventDefault={handleSubmit}>
		<label for="content">Your Message:</label>
		<textarea id="input-text" bind:value={content} />
		<!-- <label for="tone">Tone:</label>
		<select id="tone" bind:value={tone}>
			<option value="neutral">Neutral</option>
			<option value="positive">Positive</option>
			<option value="negative">Negative</option>
		</select> -->
		<button type="submit">Submit</button>
	</form>
</section>

<style>
	.message {
		margin: 1rem 0;
	}

	.message p {
		margin: 0;
	}
</style>
