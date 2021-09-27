<script>
export let date;

const parsedDate = new Date(date)
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = parsedDate.toLocaleDateString('en-US', options)
</script>

<div class="flex flex-grow justify-end text-sm">
<em>{formattedDate}</em>
</div>
