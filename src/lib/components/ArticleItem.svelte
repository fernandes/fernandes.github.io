<script>
export let image;
export let title;
export let imageCaption;
export let imageAltText;
export let tags;
export let date;
export let href;
export let excerpt = "";
</script>

<style>
.article-image {
	/* min-width: 300px; */
	/* width: 300px; */
}
</style>

<article class="px-2 mt-10">
	<div class="">
		<a class="" href="{href}">
			<h1 class="text-3xl josefin">{title}</h1>
		</a>
		<div class="flex flex-col text-gray-600 pt-1 pb-2">
			<div class="flex pb-1">
				<svg
					class="w-5 mr-2"
					focusable="false"
					viewBox="0 0 24 24"
					aria-hidden="true"
					role="presentation"
					fill="currentColor"
					>
					<path fill="none" d="M0 0h24v24H0V0z" />
					<g>
						<path
							d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9
							2-2V5c0-1.1-.9-2-2-2zm0 18H4V10h16v11zm0-13H4V5h16v3z" />
					</g>
				</svg>
				<div>
					{date}
				</div>
			</div>
			<div class="flex pb-1">
				<svg
					class="w-5 mr-2"
					focusable="false"
					viewBox="0 0 24 24"
					aria-hidden="true"
					role="presentation"
					fill="currentColor"
					>
					<path
						d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z" />
					<path fill="none" d="M0 0h24v24H0z" />
				</svg>
				{tags}
			</div>
		</div>
	</div>
	<!-- article image and excerpt -->
	<div class="">
		<div class="" wrap="wrap">
			<!-- article image -->
			<div class="mr-0 sm:mr-4">
				<div class="">
					<figure class="w-full sm:w-96 sm:float-left article-image mr-0 sm:mr-6 mb-1">
						<a href="{href}">
							<img
								class="w-full"
								src="{image}"
								alt="{imageAltText}" />
						</a>
						<figcaption class="text-right text-xs">{imageCaption}</figcaption>
					</figure>
				</div>
			</div>
			<!-- aritcle excerpt -->
			<div>
				<p class="text-justify">
					{@html excerpt}
					<a class="text-indigo-600" href="{href}">[ read more ]</a>
				</p>
			</div>
		</div>
	</div>
</article>
