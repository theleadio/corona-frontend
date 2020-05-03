<template>
  <div v-if="loading">
    <slot name="loading">
      <div class="loading-container">
        <!-- Placeholder Content -->
        <div class="placeholder-content">
          <div class="placeholder-content_item" />
          <div class="placeholder-content_item" />
          <div class="placeholder-content_item" />
          <div class="placeholder-content_item" />
          <div class="placeholder-content_item" />
          <div class="placeholder-content_item" />
          <div class="placeholder-content_item" />
          <div class="placeholder-content_item" />
          <div class="placeholder-content_item" />
        </div>
      </div>
    </slot>
  </div>
  <div v-else>
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    ajax: {
      default: null
    }
  },
  data() {
    return {
      loading: false
    }
  },
  watch: {
    ajax: {
      handler() {
        this.startLoading()
      }
    }
  },
  mounted() {
    this.startLoading()
  },
  methods: {
    startLoading() {
      if (!this.ajax) {
        return
      }

      this.loading = true

      this.ajax.then(() => {
        setTimeout(() => {
          this.loading = false
        }, 100)
      })
    }
  }
}
</script>
<style scoped>
.loading-container {
  padding: 25px 0;
  margin: auto 0;
}

.placeholder-content {
  height: 205px;
  overflow: hidden;
  background: #000;
  position: relative;
  -webkit-animation-duration: 1.7s;
  animation-duration: 1.7s;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-animation-name: placeholderAnimate;
  animation-name: placeholderAnimate;
  background: #f6f7f8;
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(2%, #eee),
    color-stop(18%, #ddd),
    color-stop(33%, #eee)
  );
  background: linear-gradient(to right, #eee 2%, #ddd 18%, #eee 33%);
  background-size: 1300px;
}

.placeholder-content_item {
  width: 100%;
  height: 20px;
  position: absolute;
  background: #fff;
  z-index: 2;
}

.placeholder-content_item:after,
.placeholder-content_item:before {
  width: inherit;
  height: inherit;
  content: "";
  position: absolute;
}

.placeholder-content_item:nth-child(1) {
  top: 0;
  left: 0;
}

.placeholder-content_item:nth-child(2) {
  top: 20px;
  width: 20px;
  left: 26%;
  height: 90px;
}

.placeholder-content_item:nth-child(3) {
  top: 40px;
  left: 26%;
  height: 12px;
}

.placeholder-content_item:nth-child(4) {
  top: 75px;
  left: 26%;
  height: 12px;
}

.placeholder-content_item:nth-child(5) {
  top: 20px;
  right: 0;
  width: 23%;
  height: 20px;
}

.placeholder-content_item:nth-child(6) {
  top: 110px;
  height: 17px;
  left: 0;
}

.placeholder-content_item:nth-child(7) {
  top: 149px;
  height: 12px;
  left: 0;
}

.placeholder-content_item:nth-child(8) {
  top: 183px;
  left: 0;
  height: 25px;
}

@-webkit-keyframes placeholderAnimate {
  0% {
    background-position: -650px 0;
  }
  100% {
    background-position: 650px 0;
  }
}

@keyframes placeholderAnimate {
  0% {
    background-position: -650px 0;
  }
  100% {
    background-position: 650px 0;
  }
}
</style>
