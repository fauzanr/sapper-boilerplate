<script>
  import { goto, stores } from '@sapper/app'
  
	const { session } = stores()
	
	export let segment;

	async function logout () {
		const res = await fetch('http://localhost:3000/api/auth/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		})
		const json = await res.json()

		if(json === 'ok') {
			window.location.href = '/login'
		} else {
			alert('??')
		}
	}
</script>

<nav>
	<ul>
		<li><a aria-current="{segment === undefined ? 'page' : undefined}" href=".">home</a></li>
		<li><a aria-current="{segment === 'about' ? 'page' : undefined}" href="about">about</a></li>

		{#if $session.authenticated === true}
			<li><a aria-current="{segment === 'profile' ? 'page' : undefined}" href="profile">profile</a></li>
			<li><a href="/" on:click|preventDefault={logout}>logout</a></li>
		{:else}
			<li><a aria-current="{segment === 'login' ? 'page' : undefined}" href="login">login</a></li>
		{/if}
	</ul>
</nav>

<style>
	nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>