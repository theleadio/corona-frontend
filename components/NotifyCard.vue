<template>
  <Card title="Get Notify">
    <div class="py-6 px-2">
      <p class="text-center text-lg">
        CoronaTracker will keep you update with latest news
      </p>
      <img :src="smartphoneImage" class="block mx-auto my-3" />

      <div class="flex items-center">
        <input
          type="text"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200  py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
          placeholder="Your mobile phone"
        />
        <button class="bg-primary h-10 w-12 flex items-center justify-center">
          <svg
            class="text-white"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.2987 23.6773C16.1298 23.6773 15.9752 23.58 15.9027 23.4262L12.214 15.5862L4.53518 12.0567C4.37462 11.9829 4.27421 11.8198 4.28056 11.643C4.28712 11.4663 4.39934 11.3109 4.56493 11.2493L22.7894 4.4446C22.9489 4.38531 23.1289 4.4236 23.2499 4.54347C23.3713 4.66335 23.4116 4.84294 23.3538 5.00328L16.7102 23.3886C16.6502 23.555 16.4958 23.6686 16.319 23.6769C16.312 23.6771 16.3052 23.6773 16.2987 23.6773ZM5.85643 11.701L12.7243 14.858C12.8182 14.9011 12.8936 14.9759 12.9376 15.0691L16.2455 22.0995L22.2095 5.59522L5.85643 11.701Z"
              fill="white"
            />
            <path
              d="M12.5419 15.6926C12.4299 15.6926 12.3182 15.65 12.2326 15.5644C12.0618 15.3938 12.0618 15.1167 12.2326 14.9458L22.6331 4.54513C22.8039 4.37428 23.0809 4.37428 23.2517 4.54513C23.4226 4.71597 23.4226 4.99291 23.2517 5.16375L12.8513 15.5644C12.7657 15.65 12.6539 15.6926 12.5419 15.6926Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  </Card>
</template>

<script>
import Card from "./Card"

import smartphoneImage from "../assets/image/smartphone.png"
export default {
  name: "NotifyCard",
  components: {
    Card
  },
  data: () => ({
    smartphoneImage
  })
}
</script>

<style scoped></style>
