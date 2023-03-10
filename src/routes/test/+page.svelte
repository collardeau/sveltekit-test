<script>
	export let form;
</script>

<form method="POST" action="?/test">
	<label for="userText">Your Text</label>
	<textarea id="userText" name="userText" placeholder="Enter text here..." value="" required />

	<label for="tone">Tone:</label>
	<select id="tone" name="tone">
		<option value="Friendly">Friendly</option>
		<option value="Professional">Professional</option>
		<option value="Formal">Formal</option>
	</select>

	<button type="submit">Submit</button>
</form>

{#if form?.success}
	<div>
		{form.response}
	</div>
{/if}
