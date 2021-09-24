<script>
import { getNotificationsContext } from 'svelte-notifications';
const { addNotification } = getNotificationsContext();
import * as notifier from "$lib/notifier"
import { post } from '$lib/utils.js';

let firstName = '';
let lastName = '';
let email = '';
let message = '';

async function submit(event) {
  await post(`contact`, { contact: { firstName, lastName, email, message } });
  notifier.success(addNotification, {title: "Thank you", message: "I do appreciate you sending me a message!"})
  firstName = ''
  lastName = ''
  email = ''
  message = ''
}
</script>

<div class="w-full mb-10 sm:mt-0">
  <div class="text-center">
    <form class="" on:submit|preventDefault={submit}>
      <!-- first name -->
      <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
        <label for="first-name" class="md:text-right block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
          First name
        </label>
        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <input bind:value={firstName} required type="text" name="first-name" id="first-name" autocomplete="given-name" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-md sm:text-sm border-gray-300 rounded-md">
        </div>
      </div>

      <!-- first name -->
      <div class="mt-3 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
        <label for="first-name" class="md:text-right block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
          Last name
        </label>
        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <input bind:value={lastName} required type="text" name="last-name" id="last-name" autocomplete="family-name" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-md sm:text-sm border-gray-300 rounded-md">
        </div>
      </div>

      <!-- email -->
      <div class="mt-3 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
        <label for="email" class="md:text-right block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
          Email address
        </label>
        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <input bind:value={email} required id="email" name="email" type="email" autocomplete="email" class="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-md sm:text-sm border-gray-300 rounded-md">
        </div>
      </div>

      <!-- message -->
      <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
        <label for="about" class="md:text-right block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
          Message
        </label>
        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <textarea bind:value={message} id="message" name="message" rows="6" class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-md sm:text-sm border border-gray-300 rounded-md"></textarea>
          <p class="mt-2 text-sm text-gray-500 sm:max-w-md">Go ahead and share anything you want 😄</p>
        </div>
      </div>

      <!-- subscribe -->
      <button type="submit" class="mt-4 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Send
      </button>
    </form>
  </div>
</div>
