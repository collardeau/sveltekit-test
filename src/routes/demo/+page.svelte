<script>
	import { enhance } from '$app/forms';

	export let data; // data from +page.server.js
	export let form; // data from form submission

	// handling form submission
	let loading = false;
	const submit = (stuff) => {
		loading = true;
		return async ({ update }) => {
			update();
			loading = false;
		};
	};

	// test out snapshot
	// works with back/forward browser buttons (not with links?)
	let userText = '';
	export const snapshot = {
		capture: () => {
			return {
				userText
			};
		},
		restore: (obj) => {
			userText = obj.userText;
		}
	};
</script>

<section>
	<h2>Loaded Data</h2>
	{#each data.posts as post}
		<div>
			<h5>{post.title}</h5>
		</div>
	{/each}
	{#if data?.error}
		<div>
			{data.error}
		</div>
	{/if}
</section>

<section>
	<h2>Form Post Request</h2>
	<form method="POST" action="?/test" use:enhance={submit}>
		<label for="userText">Your Text</label>
		<textarea
			id="userText"
			name="userText"
			placeholder="Enter text here..."
			bind:value={userText}
			required
		/>
		<button type="submit">Submit</button>
	</form>
	{#if loading}
		<div>Loading...</div>
	{/if}
	{#if form?.success}
		<div>
			{form.message}
		</div>
	{/if}
	{#if form?.error}
		<div>
			{form.error}
		</div>
	{/if}
</section>
