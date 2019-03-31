<template>
  <div class="example-frame-wrapper">
    <iframe
      :src="$route.meta.codesanbox"
      class="example-frame"
      sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
    />
  </div>
</template>
