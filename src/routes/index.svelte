<script>
	import Header from '../components/Header.svelte';
	import Menu from '../components/Menu.svelte';
	import ArticleItem from '../components/ArticleItem.svelte';
	import Footer from '../components/Footer.svelte';
  import transferwiseLogo from "../components/images/transferwise-logo.jpg"
  import timezones from "../components/images/timezones.jpg"
  import cover_blade from "../components/images/blade.jpg"
  import cover_jekyll from "../components/images/jekyll.jpg"
  import cover_crystal from "../components/images/crystal_language.jpg"
</script>

<ArticleItem
  title={"Transferwise"}
  image={transferwiseLogo}
  imageCaption={"Transferwise Logo"}
  imageAltText={"Transferwise Logo"}
  tags={"travel, costs, card, currency-exchange"}
  date={"April 10, 2019"}
  href={"/travel/transferwise"}
  excerpt={`
    🇧🇷 Transferwise é uma fintech do reino unido que veio para facilitar as operações de câmbio,
    de forma fácil, transparente e mais barata. Compartilho minha experiência e faço um comparativo
    com a solução que eu usava anteriormente, o BB Americas.
  `}
/>

<ArticleItem
  title={"Time Zones From A Developer's Perspective"}
  image={timezones}
  imageCaption={"Daliiiii"}
  imageAltText={"The Persistence of Memory Painting by Salvador Dali"}
  tags={"postgresql, rails, javascript, date-fns"}
  date={"January 19, 2019"}
  href={"/web/timezones-from-a-developers-perspective"}
  excerpt={`
    Let's talk in this article about timezones and how it applies to a web system.
    There are 3 main layers where is necessary to pay attention when working with date and times:<br />
    <ul>
      <li>- Database</li>
      <li>- Rails</li>
      <li>- JavaScript</li>
    </ul>
  `}
/>

<ArticleItem
  title={"Using Blade (JavaScript) Runner on Rails App"}
  image={cover_blade}
  imageCaption={"Blade (JavaScript) Runner"}
  imageAltText={"Blade Runner Movie Image"}
  tags={"rails, blade, javascript, testing"}
  date={"June 13, 2016"}
  href={"/rails/using-blade-javascript-runner-on-rails"}
  excerpt={`
    Looking for a javascript test runner for Rails, I found some options,
    so I decided to choose Blade, as this is not a comparison (I’m not even experienced to do this),
    and in this article I share my experience testing javascript and running tests with Blade.
  `}
/>

<ArticleItem
  title={"Hacking on Crystal Language"}
  image={cover_crystal}
  imageCaption={"hacking, the crystalized way"}
  imageAltText={"Crystal Language Logo"}
  tags={"crystal, hacking, compiler, opensource"}
  date={"June 01, 2016"}
  href={"/crystal/hacking-on-crystal-language"}
  excerpt={`
    <a class="underline" href="/crystal/hacking-na-linguagem-crystal">You can also read this article in pt-BR 🇧🇷<a/><br />
    Yesterday I started to looking on how to help the Crystal Programming Language,
    so I'd like to share my experience, as well serve as future reference.<br />
  `}
/>

<ArticleItem
  title={"Using jekyll on pow"}
  image={cover_jekyll}
  imageCaption={"Mr. Hyde would be proud of"}
  imageAltText={"Jekyll Logo"}
  tags={"ruby, jekyll, rack, pow"}
  date={"Feb 02, 2015"}
  href={"/tips/using-jekyll-on-pow"}
  excerpt={`
    The best way to run Jekyll on pow, is make it works as a Rack application. How do it?<br />
    Check here in this article
  `}
/>