<script lang="ts">
	export let role = '';
	export let message = '';

	const imgSrc = role === 'assistant' ? '/alfred-headshot.png' : '/batman-headshot.png';
	const name = role === 'assistant' ? 'Alfred' : 'Batman';
</script>

<li class="flex py-4">
	<img class="h-10 w-10 rounded-full" src={imgSrc} alt="" />
	<div class="ml-3">
		<p class="text-sm font-medium text-gray-900">{name}</p>
		<p class="text-sm text-gray-500">{message}</p>
	</div>
</li>
