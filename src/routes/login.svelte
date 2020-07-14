<script context="module">
  export async function preload (page, { authenticated }) {
    if (!authenticated) {
      return
    } else {
      this.redirect(302, 'profile')
    }
  }
</script>

<script>
  import { goto } from '@sapper/app';	

  async function login () {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    const json = await res.json()

    if(json === 'ok') {
      window.location.href = '/profile'
    } else {
      alert('gagal login')
    }
  }
</script>

<button on:click={login}>Login</button>