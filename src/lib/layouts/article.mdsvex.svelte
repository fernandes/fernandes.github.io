<script>
import "./syntax.scss"
</script>

<style>
:global(article.markdown h1) {
  @apply mt-2;
  @apply block;
  @apply text-3xl;
  @apply text-center;
  @apply leading-8;
  @apply font-extrabold;
  @apply tracking-tight;
  @apply text-gray-900;
  /* @apply sm:text-4xl; */
  border-bottom: none !important;
}

:global(article.markdown h1 > a) {
  font-weight: 800 !important;
  font-size: 2.25rem;
  line-height: 2.5rem;
}

:global(
  article.markdown h1 > a,
  article.markdown h2 > a,
  article.markdown h3 > a,
  article.markdown h4 > a,
  article.markdown h5 > a,
  article.markdown h6 > a
) {
  color: #111827 !important;
  text-decoration: none !important;
}

:global(article.markdown h2 > a) {
  color: #111827;
  font-weight: 700 !important;
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  line-height: 1.3333333;
}

:global(
  article.markdown h1 > a:hover,
  article.markdown h2 > a:hover,
  article.markdown h3 > a:hover,
  article.markdown h4 > a:hover,
  article.markdown h5 > a:hover,
  article.markdown h6 > a:hover
) {
  text-decoration: underline !important;
}

:global(article.markdown img) {
  @apply rounded-lg;
}

:global(article.markdown table) {
  @apply min-w-full;
  @apply divide-y;
  @apply divide-gray-200;
}
:global(article.markdown table td) {
  @apply px-6;
  @apply py-4;
  @apply whitespace-nowrap;
  @apply text-sm;
  @apply font-medium;
  @apply text-gray-900;
}
</style>

<div class="relative pb-16 pt-4 bg-white overflow-hidden">
  <div class="relative px-2">
    <div class="mt-6 prose max-w-none prose-indigo prose-md text-gray-500">
      <article class="markdown">
        <slot />
      </article>
    </div>
  </div>
</div>
