<script context="module">
  export async function preload (page, { authenticated }) {
    if (authenticated) {
      return
    } else {
      this.redirect(302, 'login')
    }

  }
</script>


<h1>Welcome</h1>
