<script>
	import Header from '$lib/components/Header.svelte';
	import Menu from '$lib/components/Menu.svelte';
	import ArticleItem from '$lib/components/ArticleItem.svelte';
	import Footer from '$lib/components/Footer.svelte';
  import transferwiseLogo from "$lib/images/transferwise-logo.jpg"
  import timezones from "$lib/images/timezones.jpg"
	import "../app.scss";
  import CustomNotification from '$lib/CustomNotification.svelte';
	import NotificationsDisplay from 'svelte-notifications';
</script>

<style>
:global(.position-top-right.default-position-style-top-right) {
	padding: 10px;
	width: 300px;
}
</style>

<NotificationsDisplay item={CustomNotification}>
<div class="flex justify-center blog">
  <div class="flex-grow max-w-full lg:max-w-screen-lg">
    <Header />
    <Menu />
    <div class="flex flex-col px-2 sm:px-0">
      <slot />
    </div>
    <Footer />    
  </div>
</div>
</NotificationsDisplay>
