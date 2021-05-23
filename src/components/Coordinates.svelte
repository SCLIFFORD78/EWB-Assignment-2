<script>
  export let latitude= 0.0;
  export let longtitude= 0.0;
</script>

<form class="uk-grid-small" uk-grid>
  <div class="uk-width-1-2@s ">
    <label class="uk-form-label ">Latitude</label>
    <input class="uk-input " type="number" bind:value={latitude} disabled>
  </div>
  <div class="uk-width-1-2@s">
    <label class="uk-form-label">Longitude</label>
    <input class="uk-input " type="number" bind:value={longtitude} disabled>
  </div>
</form>
